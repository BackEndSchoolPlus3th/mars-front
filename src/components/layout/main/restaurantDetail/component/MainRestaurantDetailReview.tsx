import { useSelector } from "react-redux";
import { RootState } from "../../../../../utils";
import { useRestaurantReviews } from "../../../../../api/services/restaurantService";
import { Search } from "lucide-react";
import ReviewCard from "../card/ReviewCard";

const MainRestaurantDetailReview = () => {
  const restaurantId = useSelector(
    (state: RootState) => state.restaurant.restaurantId
  );

  const {
    data: reviews,
    isLoading,
    error,
  } = useRestaurantReviews(restaurantId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;
  if (!reviews) return <div>menu not found</div>;

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="리뷰 검색"
          className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
      </div>
      <div className="space-y-2">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => <ReviewCard review={review} />)
        ) : (
          <div>리뷰 정보가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MainRestaurantDetailReview;
