import React, { useState } from "react";
import { Star, MapPin, Phone, Clock, X, Search } from "lucide-react";
import { RootState } from "../../../../../utils";
import { useSelector } from "react-redux";
import { useRestaurantDetail } from "../../../../../api/services/restaurantService";
import MainRestaurantDetailMenu from "../component/MainRestaurantDetailMenu";
import MainRestaurantDetailReview from "../component/MainRestaurantDetailReview";

interface RestaurantDetailContainerProps {
  restaurantId: number;
}

const RestaurantDetailContainer: React.FC<RestaurantDetailContainerProps> = ({
  restaurantId,
}) => {
  //   const restaurantId = useSelector(
  //     (state: RootState) => state.restaurant.restaurantId
  //   );
  const {
    data: restaurant,
    isLoading,
    error,
  } = useRestaurantDetail(restaurantId);
  const [showList, setShowList] = useState(true);
  const [activeTab, setActiveTab] = useState<"menu" | "reviews">("menu");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;
  if (!restaurant) return <div>Restaurant not found</div>;

  if (!showList) {
    return null;
  }

  const handleClose = () => {
    setShowList(false);
    return null;
  };

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="flex flex-col w-[360px] bg-white border-r border-gray-200 rounded-lg shadow-lg h-full">
      <div className="relative h-64">
        <div className="flex justify-end">
          <button
            onClick={() => handleClose()}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors m-3"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span className="flex items-center text-orange-500">
              <Star size={16} className="mr-1" />
              {restaurant.rating}
            </span>
            <span className="mx-2">•</span>
            <span>리뷰 {restaurant.reviewCount}</span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <MapPin size={16} className="mr-2 mt-0.5 text-gray-400" />
              <span>{restaurant.address}</span>
            </div>
            <div className="flex items-start">
              <Phone size={16} className="mr-2 mt-0.5 text-gray-400" />
              <span>{restaurant.phone}</span>
            </div>
            <div className="flex items-start">
              <Clock size={16} className="mr-2 mt-0.5 text-gray-400" />
              <div>
                <p>
                  {restaurant.businessHours.open} -{" "}
                  {restaurant.businessHours.close}
                </p>
                {restaurant.businessHours.breakTime && (
                  <p className="text-orange-500">
                    브레이크타임: {restaurant.businessHours.breakTime.start} -{" "}
                    {restaurant.businessHours.breakTime.end}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("menu")}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "menu"
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-gray-500"
                }`}
              >
                메뉴
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "reviews"
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-gray-500"
                }`}
              >
                리뷰
              </button>
            </div>

            <div className="p-4">
              {activeTab === "menu" ? (
                <MainRestaurantDetailMenu />
              ) : (
                <MainRestaurantDetailReview />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailContainer;
