import React from "react";
import RestaurantProps from "../prop/RestaurantProps";
import { Heart, HeartOff } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../utils";

const RestaurantCard: React.FC<RestaurantProps> = ({
  id,
  name,
  details,
  averageRate,
  setSelectedRestaurant,
  showRestaurantDetail,
}) => {
  const user = useSelector((state: RootState) => state.user);
  const [isLiked, setIsLiked] = React.useState(false);

  const handleClick = (id: number) => {
    setSelectedRestaurant(id);
    showRestaurantDetail(true);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const fetchFavorite = () => {};

  return (
    <div
      className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
      onClick={() => handleClick(id)}
    >
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 mb-1">{name}</h4>
        <p className="text-gray-500 text-sm mb-2">{details}</p>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-orange-500">⭐ {averageRate.toFixed(1)}</span>
        </div>
      </div>
      {user.isLoggedIn ? (
        <button onClick={fetchFavorite}>
          <Heart color="red" fill="none" />
        </button>
      ) : (
        <HeartOff color="gray" fill="none" />
      )}
    </div>
  );
};

export default RestaurantCard;
