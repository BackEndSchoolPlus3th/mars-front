import { useState, useEffect } from "react";
import { recommendedRestaurantsService } from "../../../api/services/recommendedRestaurantsService";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"; //npm install recharts, npm install react-chartjs-2 반드시설치해주세요!!

import { ReviewSummary, RestaurantReviewAnalysisDTO } from "../../../api/types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend); 

const ReviewAnalysisPage = () => {
  const [analysisData, setAnalysisData] = useState<RestaurantReviewAnalysisDTO[]>([]);
  const [selectedReviews, setSelectedReviews] = useState<ReviewSummary[]>([]);

  // ✅ 리뷰 분석 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await recommendedRestaurantsService.getAllRestaurantReviewAnalysis();
        setAnalysisData(response.data);
      } catch (error) {
        console.error("Error fetching review analysis:", error);
      }
    };
    fetchData();
  }, []);

  // ✅ 데이터 시각화 (Bar Chart)
  const chartData = {
    labels: analysisData.map((res) => res.restaurantName),
    datasets: [
      {
        label: "가중 점수",
        data: analysisData.map((res) => res.weightedScore),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const handleRestaurantClick = (restaurantId: number) => {
    const selected = analysisData.find((res) => res.restaurantId === restaurantId);
    if (selected) setSelectedReviews(selected.reviews);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">리뷰 분석 순위</h1>
      <Bar data={chartData} />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">📍 리뷰 상세 보기</h2>
        <div className="space-y-2">
          {analysisData.map((res) => (
            <div
              key={res.restaurantId}
              onClick={() => handleRestaurantClick(res.restaurantId)}
              className="cursor-pointer bg-gray-100 p-2 rounded hover:bg-gray-200"
            >
              {res.rank}. {res.restaurantName}
            </div>
          ))}
        </div>
      </div>

      {selectedReviews.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">📢 리뷰 목록</h2>
          {selectedReviews.map((review, index) => (
            <div key={index} className="border p-2 rounded-md mb-2">
              <p className="font-bold">{review.name}</p>
              <p className="text-gray-600">{review.body}</p>
              <p className="text-sm text-yellow-600">⭐ {review.rate}/5</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewAnalysisPage;
