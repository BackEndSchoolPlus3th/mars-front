import React from 'react';
import { RestaurantList } from '../prop/FavoriteProps';

interface FavoriteCardProps {
  name: string;
  isPublic: boolean;
  restaurants: RestaurantList[];
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ name, isPublic, restaurants }) => {
  const formatRating = (rating: number | undefined) => {
    if (rating === undefined || isNaN(rating)) return '0.0';
    return rating.toFixed(1);
  };

  return (
    <div className="p-4 border rounded-lg mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <span className={`px-2 py-1 rounded text-sm ${isPublic ? 'bg-green-100' : 'bg-gray-100'}`}>
          {isPublic ? '공개' : '비공개'}
        </span>
      </div>
      <div className="space-y-2">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="flex items-center space-x-2">
            <img src={restaurant.imageUrl} alt={restaurant.name} className="w-16 h-16 object-cover rounded" />
            <div>
              <p className="font-medium">{restaurant.name}</p>
              <p className="text-sm text-gray-600">{restaurant.address}</p>
              <p className="text-sm text-yellow-500">★ {formatRating(restaurant.averageRate)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCard;