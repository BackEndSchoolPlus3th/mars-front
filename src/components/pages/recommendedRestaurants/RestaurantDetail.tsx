import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { recommendedRestaurantsService } from "../../../api/services/recommendedRestaurantsService";
import { Star } from "lucide-react";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<any | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await recommendedRestaurantsService.getSelectedRestaurant(restaurant.id);
        setRestaurant(response.data);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (!restaurant) return <div>로딩 중...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{restaurant.name}</h1>
      <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-64 object-cover mt-4" />
      <p className="mt-4">{restaurant.details}</p>

      <div className="mt-2">
        <p className="font-semibold">연락처:</p>
        <p>{restaurant.contact}</p>
      </div>

      <div className="flex items-center mt-2">
        <Star className="text-orange-500" size={16} />
        <span className="ml-1 text-sm">{restaurant.averageRate.toFixed(1)}</span>
      </div>
      <p className="mt-2 text-sm text-gray-500 italic">{restaurant.summarizedReview}</p>

      <h3 className="text-lg font-semibold mt-4">카테고리</h3>
      <p>{restaurant.categoryName}</p>

      <h3 className="text-lg font-semibold mt-4">메뉴</h3>
      <ul>
        {restaurant.menus.map((menu: any) => (
          <li key={menu.name} className="flex items-center mt-2">
            <img src={menu.imageUrl} alt={menu.name} className="w-10 h-10 object-cover rounded-md mr-2" />
            {menu.name} - {menu.price.toLocaleString()}원
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mt-4">영업 시간</h3>
      <ul>
        {restaurant.businessHours.map((hour: any) => (
          <li key={hour.dayOfWeek}>
            {`요일 ${hour.dayOfWeek}: ${hour.openTime} - ${hour.closeTime}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantDetail;
