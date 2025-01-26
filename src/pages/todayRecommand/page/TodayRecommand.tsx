/*global kakao*/
import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import "../ui/TodayRandom.css";

// 맛집 데이터 타입 정의
interface Restaurant {
  id: number;
  image: string;
  place_name: string;
  rating: number;
  keywords: string;
  reviewSummary: string;
  address_name: string;
  phone: string;
}

function TodayRecommand() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]); // 맛집 데이터 배열
  const [headerText, setHeaderText] = useState<string>("XX님의 방문한 맛집/찜한 리스트를 바탕으로 추천한 결과입니다.");
  const [myLocation, setMyLocation] = useState<kakao.maps.LatLng | null>(null); // 위치 정보
  const navigate = useNavigate();

  useEffect(() => {
    const loadKakaoMap = () => {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=카카오api키&libraries=services`; 
      script.async = true;
      script.onload = () => {
        kakao.maps.load(initKakaoMap);
      };
      script.onerror = () => {
        console.error("Kakao Maps API 로드 실패");
      };
      document.head.appendChild(script);
    };

    const initKakaoMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const userLatLng = new kakao.maps.LatLng(latitude, longitude);
            setMyLocation(userLatLng);

            if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
              const ps = new kakao.maps.services.Places();

              ps.categorySearch(
                "FD6",
                (data, status) => {
                  if (status === kakao.maps.services.Status.OK) {
                    setRestaurants(data);
                  } else {
                    console.error("식당 검색 실패");
                  }
                },
                {
                  location: userLatLng,
                  radius: 1000,
                  sort: kakao.maps.services.SortBy.DISTANCE,
                }
              );
            } else {
              console.error("Kakao Maps API가 정상적으로 로드되지 않았습니다.");
            }
          },
          (error) => {
            console.error("Error fetching location:", error);
          }
        );
      } else {
        console.error("Geolocation을 지원하지 않는 브라우저입니다.");
      }
    };

    loadKakaoMap();
  }, []);

  useEffect(() => {
    if (myLocation) {
      fetchRestaurants("optimal");
    }
  }, [myLocation]);

  const fetchRestaurants = (endpoint: string, isInitialLoad = false) => {
    if (!myLocation) return;

    fetch(`http://localhost:8080/api/${endpoint}?lat=${myLocation.lat}&lng=${myLocation.lng}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRestaurants(data);
        if (!isInitialLoad) {
          setHeaderText(
            endpoint === "favorites"
              ? "XX님을 위한 새로운 찜한 맛집을 추천한 결과입니다."
              : "XX님을 위한 새로운 맛집을 추천한 결과입니다."
          );
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleImageClick = (id: number) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="TodayRandom">
      <h1>
        <p>{headerText}</p>
      </h1>
      <div className="restaurant-list">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="restaurant-card">
            <img
              src={restaurant.image}
              alt="식당 이미지"
              onClick={() => handleImageClick(restaurant.id)}
              onError={(e) => console.error("Image load error:", e.target.src)}
              style={{ cursor: "pointer" }}
            />
            <h3>{restaurant.place_name}</h3>
            <p>⭐ {restaurant.rating} / 5.0</p>
            <p>특징: {restaurant.keywords}</p>
            <p>리뷰 요약: {restaurant.reviewSummary}</p>
            <p>주소: {restaurant.address_name}</p>
            <p>전화번호: {restaurant.phone}</p>
          </div>
        ))}
      </div>
      <div className="action-group">
        <div className="action-item">
          <input type="checkbox" />
          <button onClick={() => fetchRestaurants("optimal")}>최적의 식당찾기</button>
        </div>
        <div className="action-item">
          <input type="checkbox" />
          <button onClick={() => fetchRestaurants("random")}>새로운 맛집 볼래요! 랜덤 섞기</button>
        </div>
      </div>
      <div className="random-btn-container" onClick={() => navigate('/wheel', { state: { restaurants } })}>
        돌림판 만들기
      </div>
    </div>
  );
}

export default TodayRecommand;

