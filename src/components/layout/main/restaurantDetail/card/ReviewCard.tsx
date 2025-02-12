import { Star } from 'lucide-react';

interface ReviewCardProps {
    reivew: {
        id: number;
        body: string;
        rate: number;
        name: string;
        userName: string;
    };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ reivew }) => {
    return (
        <div
            key={reivew.id}
            className="flex items-center space-x-4 w-full pb-2"
        >
            <div className="w-full">
                <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{reivew.name}</h3>
                    <span className="flex items-center text-orange-500">
                        <Star size={16} className="mr-1" />
                        {reivew.rate.toFixed(1)}
                    </span>
                </div>
                <p className="text-sm text-gray-500">{reivew.body}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
