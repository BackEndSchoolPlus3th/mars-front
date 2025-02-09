import { Review } from "../../../../../api/types";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div key={review.id} className="flex items-center space-x-4">
      <div>
        <h3 className="text-lg font-semibold">{review.name}</h3>
        <p className="text-sm text-gray-500">{review.body}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
