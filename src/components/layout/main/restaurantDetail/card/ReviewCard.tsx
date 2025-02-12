import { Review } from '../../../../../api/types';

interface ReviewCardProps {
    restaurantReviews: {
        body: string;
        rate: number;
        reviewName: string;
        userName: string;
    };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ restaurantReviews }) => {
    return (
        <div
            key={restaurantReviews.userName}
            className="flex items-center space-x-4"
        >
            <div>
                <h3 className="text-lg font-semibold">
                    {restaurantReviews.reviewName}
                </h3>
                <p className="text-sm text-gray-500">
                    {restaurantReviews.body}
                </p>
            </div>
        </div>
    );
};

export default ReviewCard;
