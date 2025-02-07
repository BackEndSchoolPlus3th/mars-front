import { useState } from "react";
import Sidebar from "../../layout/Sidebar";
import MapArea from "../../map/MapArea";
import RestaurantDetail from "../restaurantDetail/RestaurantDetail";
import RecommendedRestaurants from "../recommendedRestaurants/RecommendedRestaurantsPage";

const MainPage = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <div className="flex h-full">
      <Sidebar />
      <MapArea />
      {/* <div className="flex-1 overflow-y-auto">
                <RecommendedRestaurants />
            </div> */}
      {selectedRestaurant && (
        <div className="fixed right-0 top-[73px] h-full">
          <RestaurantDetail
            restaurant={selectedRestaurant}
            onClose={() => setSelectedRestaurant(null)}
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;
