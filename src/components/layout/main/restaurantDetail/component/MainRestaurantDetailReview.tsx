import React from 'react';
import { useRestaurantReviews } from '../../../../../api/services/restaurantService';
import { Search } from 'lucide-react';
import ReviewCard from '../card/ReviewCard';
import { apiClient } from '../../../../../api';

interface MainRestaurantDetailReviewProps {
    restaurantId: number;
}

const MainRestaurantDetailReview: React.FC<MainRestaurantDetailReviewProps> = ({
    restaurantId,
}) => {
    const [reviewList, setReviewList] = React.useState([]);

    React.useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await apiClient.get(
                    `/api/v1/review/showAllReviews`,
                    {
                        params: { restaurant_id: restaurantId },
                    },
                );
                console.log('api reviews', response.data.data.reviews);
                setReviewList(response.data.data.reviews);
                console.log('reviewList: ', reviewList);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [restaurantId]);

    console.log('reviewList: ', reviewList);

    return (
        <div className="space-y-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="리뷰 검색"
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm"
                />
                <Search
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={16}
                />
            </div>
            <div className="space-y-2">
                {reviewList && reviewList.length > 0 ? (
                    reviewList.map((review) => (
                        <ReviewCard review={review} key={review.id} />
                    ))
                ) : (
                    <div>리뷰 정보가 없습니다.</div>
                )}
            </div>
        </div>
    );
};

export default MainRestaurantDetailReview;
