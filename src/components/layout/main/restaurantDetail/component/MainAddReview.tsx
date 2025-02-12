import { useState } from 'react';
import { Star, X } from 'lucide-react';

interface MainAddReviewProps {
    restaurantId: number;
    showAddReview: (show: boolean) => void;
}

const MainAddReview: React.FC<MainAddReviewProps> = ({
    restaurantId,
    showAddReview,
}) => {
    const [name, setName] = useState('');
    const [rate, setRate] = useState(5);
    const [body, setBody] = useState('');

    const handleClose = () => {
        showAddReview(false);
    };

    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (value.startsWith('0') && value.length > 1) {
            value = value.slice(1);
            setRate(parseFloat(value));
        }

        if (value.startsWith('.')) {
            value = '0' + value;
        }

        let num = parseFloat(value);
        num = Math.round(num * 2) / 2;
        if (num < 0) num = 0;
        if (num > 5) num = 5;
        setRate(num);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            // 리뷰 저장 API 호출

            showAddReview(false);
        } catch (error) {
            console.error('Failed to create review:', error);
        }
    };

    const handleCancel = () => {
        showAddReview(false);
    };

    return (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-96 p-4 rounded-lg">
                <div className="flex justify-between">
                    <h2 className="text-lg font-semibold">리뷰 작성</h2>
                    <button onClick={handleClose}>
                        <X size={24} />
                    </button>
                </div>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="제목"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full pl-3 pr-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm hover:bg-white"
                    />
                </div>
                <div className="mt-4">
                    <span className="flex flex-row items-center">
                        <Star size={19} className="mr-1 text-orange-500" />
                        <input
                            type="number"
                            placeholder="평점"
                            value={rate}
                            onChange={handleRateChange}
                            step="0.5"
                            min="0"
                            max="5"
                            className="w-full pl-3 pr-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm hover:bg-white"
                        />
                    </span>
                </div>
                <div className="mt-4">
                    <textarea
                        placeholder="리뷰 내용"
                        value={body}
                        onChange={handleBodyChange}
                        className="w-full pl-3 pr-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm hover:bg-white"
                    />
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="flex items-center space-x-2 px-4 py-2 rounded-md border border-orange-500 text-orange-500 hover:bg-orange-50 font-medium transition-colors"
                    >
                        작성
                    </button>
                    <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 px-4 py-2 ml-2 rounded-md border border-orange-500 text-orange-500 hover:bg-orange-50 font-medium transition-colors"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainAddReview;
