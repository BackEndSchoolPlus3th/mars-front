import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ui/TodayRandom.css";
import { useAuth } from '../../../widgets/navigationBar/component/AuthContext';

interface Restaurant {
  id: number;
  name: string;
  rating: number;
  keywords: string;
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

function TodayRecommand() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantDetails | null>(null); // 세부사항
  const { email } = useAuth();
  const navigate = useNavigate();

  // 랜덤 추천 식당 API 호출
  const fetchRestaurants = () => {
    fetch(`http://localhost:8080/api/restaurants/random?lat=37.5665&lng=126.9780&email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRestaurants(data.map((name: string, index: number) => ({
          id: index + 1, // 고유 ID 생성
          name,
          review: "사용자의 위치와 찜기반의 랜덤 추천 식당입니다.",
        })));
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  // 식당 세부정보 API 호출
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

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="TodayRandom">
      <h1>{email}님을 위한 추천 식당</h1>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <div
              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
              onClick={() => fetchRestaurantDetails(restaurant.name)}
            >
              <h3>{restaurant.name}</h3>
            </div>
            <p>{restaurant.review}</p>
          </div>
        ))}
      </div>

      {/* 세부사항 */}
      {selectedRestaurant && (
        <div className="restaurant-details">
          <h2>세부정보</h2>
          <h3><strong>이름:</strong> {selectedRestaurant.name}</h3>
          <p><strong>평점:</strong> ⭐ {selectedRestaurant.rating} / 5.0</p>
          <p><strong>리뷰:</strong> {selectedRestaurant.review}</p>
          <p><strong>카테고리:</strong> {selectedRestaurant.category}</p>
          <p><strong>키워드:</strong> {selectedRestaurant.keywords}</p>
          <p><strong>리뷰어:</strong> {selectedRestaurant.reviewer}</p>
          
          <button onClick={() => setSelectedRestaurant(null)}>닫기</button>
        </div>
      )}

      <br>
      </br>

      <button onClick={fetchRestaurants}>새로운 랜덤맛집 보기</button>
      <div
        className="random-btn-container"
        onClick={() => navigate('/wheel', { state: { restaurants } })}
      >
        돌림판 만들기
      </div>
    </div>
  );
}

export default TodayRecommand;
