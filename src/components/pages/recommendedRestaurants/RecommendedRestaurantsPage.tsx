import { useState, useEffect } from "react";
import { recommendedRestaurantsService } from "../../../api/services/recommendedRestaurantsService";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../utils/store/Store";
import { useSelector } from "react-redux";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import Sidebar from "../../../components/pages/recommendedRestaurants/Sidebar";

const LoadingState = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-pulse text-gray-600">로딩 중...</div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <Alert variant="destructive" className="m-4">
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

const RecommendedRestaurantsPage = () => {
  const [randomRestaurants, setRandomRestaurants] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any | null>(null);
  const navigate = useNavigate();

  // ✅ 로그인한 유저 정보 가져오기
  const user = useSelector((state: RootState) => state.user);
  const isLoggedIn = user.isLoggedIn && (user.id ?? 0) > 0;


  // ✅ 유저 상태에 따라 API 분기 처리
  const getRandomRestaurantsHandler = async () => {
    try {
      let response;
      if (isLoggedIn) {
        // 로그인한 유저
        response = await recommendedRestaurantsService.getRandomRestaurants(
          37.571731,
          127.011069,
          user.id ?? 0 // ✅ 로그인한 유저는 id 포함
        );
      } else {
        // 비로그인 유저
        response = await recommendedRestaurantsService.getNotUserRandomRestaurants(
          37.571731,
          127.011069
        );
      }

      console.log("Response:", response);

      if (response && response.data && Array.isArray(response.data)) {
        setRandomRestaurants(response.data);// ✅ 응답 구조 반영
      } else {
        throw new Error("식당 정보를 불러올 수 없습니다.");
      }
    } catch (err) {
      console.error("Error:", err);
      setRandomRestaurants([]);
    }
  };

  // 랜덤 식당 선택 (돌림판 기능)
  const handleSpin = () => {
    if (randomRestaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * randomRestaurants.length);
      setSelectedRestaurant(randomRestaurants[randomIndex]);
    }
  };

  useEffect(() => {
    console.log("✅ 로그인 상태 변경됨, user:", user); // ✅ 디버깅용 로그 추가
    getRandomRestaurantsHandler();
  }, [user]); // ✅ userId 변경될 때 다시 불러오기

  if (!randomRestaurants || randomRestaurants.length === 0)
    return <ErrorState message="추천 맛집을 찾을 수 없습니다." />;

  return (
    <div className="flex">
      {/* 왼쪽: 추천 맛집 목록 */}
      <div className="w-3/4 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">추천 맛집</h1>
          <p className="text-gray-600">{isLoggedIn
      ? `${user.name}님의 찜 및 거리 기반 추천 맛집 목록입니다.`
      : "비회원은 거리 기반 추천 맛집 목록을 확인할 수 있습니다."}</p>
        </div>

        <div className="mb-4 flex space-x-4">
          <button
            onClick={getRandomRestaurantsHandler}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            다른 랜덤 맛집 볼래요
          </button>
          <button
            onClick={handleSpin}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            돌림판 🎡
          </button>
          <p>현재 로그인한 유저 ID: {user?.id || "비회원"}</p> {/* ✅ 유저 ID 없을 경우 "비회원" 표시 */}

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {randomRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => setSelectedRestaurant(restaurant)}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img
                src={restaurant.imageUrl}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>
                <p className="text-gray-600 mb-2">{restaurant.contact}</p>
                <div className="flex items-center mb-2">
                  <Star className="text-orange-500" size={16} />
                  <span className="ml-1 text-sm">{restaurant.averageRate.toFixed(1)}</span>
                </div>
                <p className="text-sm text-gray-500 italic">{restaurant.summarizedReview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 오른쪽: 사이드바 (선택한 식당 상세) */}
      <Sidebar selectedRestaurant={selectedRestaurant} />
    </div>
  );
};

export default RecommendedRestaurantsPage;
