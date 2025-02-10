import React from "react";
import RestaurantProps from "../prop/RestaurantProps";

const RestaurantCard: React.FC<RestaurantProps> = ({
  id,
  name,
  details,
  averageRate,
}) => {
  return (
    <div className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 mb-1">{name}</h4>
        <p className="text-gray-500 text-sm mb-2">{details}</p>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-orange-500">⭐ {averageRate.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
