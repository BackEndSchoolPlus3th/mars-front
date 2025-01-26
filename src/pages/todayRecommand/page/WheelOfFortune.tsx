import React, { useState, useEffect } from "react";
import "../ui/WheelOfFortune.css";
import { useNavigate, useLocation } from "react-router-dom";

interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewSummary: string;
}

const WheelOfFortune: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>(
    location.state?.restaurants || []
  );
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [spinning, setSpinning] = useState<boolean>(false);

  useEffect(() => {
    if (restaurants.length === 0) {
      fetchRestaurants();
    }
  }, [restaurants]);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/random", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Restaurant[] = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSpin = () => {
    if (restaurants.length > 0 && !spinning) {
      setSpinning(true);
      const topRestaurants = restaurants.slice(0, 5);
      const randomIndex = Math.floor(Math.random() * topRestaurants.length);
      const rotation = 360 * 5 + (360 / topRestaurants.length) * randomIndex;
      (document.querySelector(".wheel") as HTMLElement)!.style.transform = `rotate(${rotation}deg)`;

      setTimeout(() => {
        setSelectedRestaurant(topRestaurants[randomIndex]);
        setSpinning(false);
      }, 2000);
    }
  };

  const handleImageClick = (id: number) => {
    navigate(`/restaurant/${id}`);
  };

  const fixedColors = ["red", "orange", "green", "blue", "purple"];
  const topRestaurants = restaurants.slice(0, 5);

  return (
    <div className="WheelOfFortune">
      <h1>오늘의 맛집 돌림판</h1>
      <div className={`wheel-container ${spinning ? "spinning" : ""}`}>
        <div className="wheel">
          {topRestaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className="wheel-segment"
              style={{
                transform: `rotate(${(360 / topRestaurants.length) * index}deg)`,
                backgroundColor: fixedColors[index % fixedColors.length],
              }}
            >
              <span>{restaurant.name}</span>
            </div>
          ))}
          <div className="wheel-center"></div>
        </div>
      </div>

      <div className="action-group">
        <button onClick={handleSpin} disabled={spinning}>돌림판 돌리기</button>
      </div>

      {selectedRestaurant && (
        <div className="selected-restaurant">
          <h3>선택된 맛집</h3>
          <img
            src={selectedRestaurant.image}
            alt="선택된 식당 이미지"
            onClick={() => handleImageClick(selectedRestaurant.id)}
            style={{ cursor: "pointer" }}
          />
          <h3>{selectedRestaurant.name}</h3>
          <p>⭐ {selectedRestaurant.rating} / 5.0</p>
          <p>{selectedRestaurant.reviewSummary}</p>
        </div>
      )}
    </div>
  );
};

export default WheelOfFortune;
