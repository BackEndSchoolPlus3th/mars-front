import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../ui/WheelOfFortune.css";

// 식당 데이터 타입 정의
interface Restaurant {
  id: number;
  name: string;
  rating: number;
  review: string;
}

interface RestaurantDetails {
  id: number;
  email: string;
  name: string;
  rating: number;
  review: string;
  category: string;
  latitude: number;
  longitude: number;
  keywords: string;
  reviewer: string;
}

const WheelOfFortune: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [restaurants] = useState<Restaurant[]>(location.state?.restaurants || []);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantDetails | null>(null); // 세부사항 상태
  const [spinning, setSpinning] = useState(false);

  // 세부사항 가져오기
  const fetchRestaurantDetails = (name: string) => {
    fetch(`http://localhost:8080/api/restaurants/detail?name=${encodeURIComponent(name)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant details");
        }
        return response.json();
      })
      .then((data) => {
        setSelectedRestaurant(data); // 세부사항 상태 업데이트
      })
      .catch((error) => console.error("Error fetching restaurant details:", error));
  };

  // 돌림판 회전
  const handleSpin = () => {
    if (!spinning && restaurants.length > 0) {
      setSpinning(true);
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      const rotation = 360 * 5 + (360 / restaurants.length) * randomIndex;

      (document.querySelector(".wheel") as HTMLElement).style.transform = `rotate(${rotation}deg)`;

      setTimeout(() => {
        const randomRestaurant = restaurants[randomIndex];
        fetchRestaurantDetails(randomRestaurant.name); // 세부사항 가져오기
        setSpinning(false);
      }, 2000);
    }
  };

  const fixedColors = ["red", "orange", "green", "blue", "purple"];

  return (
    <div className="WheelOfFortune">
      <h1>오늘의 맛집 돌림판</h1>
      <div className="wheel-container">
        <div className="wheel">
          {restaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className="wheel-segment"
              style={{
                transform: `rotate(${(360 / restaurants.length) * index}deg)`,
                backgroundColor: fixedColors[index % fixedColors.length],
              }}
            >
              {/* 식당 이름 클릭 시 세부정보 가져오기 */}
              <span
                style={{ cursor: "pointer", color: "white", textDecoration: "underline" }}
                onClick={() => fetchRestaurantDetails(restaurant.name)}
              >
                {restaurant.name}
              </span>
            </div>
          ))}
          <div className="wheel-center"></div>
        </div>
      </div>
      <div className="action-group">
        <button onClick={handleSpin} disabled={spinning}>돌림판 돌리기</button>
      </div>

      {/* 선택된 식당 세부정보 */}
      {selectedRestaurant && (
        <div className="selected-restaurant">
          <h2>세부정보</h2>
          <h3><strong>이름:</strong> {selectedRestaurant.name}</h3>
          <p><strong>평점:</strong> ⭐ {selectedRestaurant.rating} / 5.0</p>
          <p><strong>리뷰:</strong> {selectedRestaurant.review}</p>
          <p><strong>카테고리:</strong> {selectedRestaurant.category}</p>
          <p><strong>키워드:</strong> {selectedRestaurant.keywords}</p>
          <p><strong>리뷰어:</strong> {selectedRestaurant.reviewer}</p>
          <p><strong>위치:</strong> 위도 {selectedRestaurant.latitude}, 경도 {selectedRestaurant.longitude}</p>
          <button onClick={() => setSelectedRestaurant(null)}>닫기</button>
        </div>
      )}

      <br>
      </br>

      <button onClick={() => navigate(-1)}>뒤로 가기</button>
    </div>
  );
};

export default WheelOfFortune;
