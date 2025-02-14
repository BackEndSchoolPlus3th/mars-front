import React, { useEffect } from 'react';
import { Search } from 'lucide-react';
import ReviewCard from '../card/ReviewCard';
import MainAddReview from "./MainAddReview";

interface ReviewData {
    body: string;
    rate: number;
    reviewName: string;
    userName: string;
    id: number;
}

interface MainRestaurantDetailReviewProps {
    restaurantReviews: {
        body: string;
        rate: number;
        reviewName: string;
        userName: string;
    }[];
    showAddReview: (show: boolean) => void;
}

const MainRestaurantDetailReview: React.FC<MainRestaurantDetailReviewProps> = ({
    restaurantReviews,
    showAddReview,
}) => {
    const [reviewList, setReviewList] = React.useState<
        MainRestaurantDetailReviewProps['restaurantReviews']
    >([]);

    useEffect(() => {
        setReviewList(restaurantReviews);
    }, [restaurantReviews]);

    return (
        <div className="space-y-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="리뷰 검색"
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm hover:bg-white"
                />
                <Search
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={16}
                />
            </div>
            <button
                onClick={() => showAddReview(true)}
                className="flex items-center justify-center space-x-2 px-4 py-2 rounded-md border border-orange-500 text-orange-500 hover:bg-orange-50 font-medium transition-colors w-full text-center"
            >
                리뷰 등록
            </button>
            <div className="space-y-2">
                {reviewList && reviewList.length > 0 ? (
                    reviewList.map((review) => (
                        <ReviewCard key={review.id} reivew={review} />
                    ))
                ) : (
                    <div>리뷰 정보가 없습니다.</div>
                )}
            </div>
        </div>
    );
};

export default MainRestaurantDetailReview;
