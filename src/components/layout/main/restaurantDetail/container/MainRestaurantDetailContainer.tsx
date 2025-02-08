import React, { useState } from 'react';
import MainResaturantDetail from '../component/MainRestaurantDetail';
import { X } from 'lucide-react';

const RestaurantDetailContainer: React.FC = () => {
    const [showList, setShowList] = useState(true);

    if (!showList) {
        return null;
    }

    const handleClose = () => {
        setShowList(false);
        return null;
    };

    return (
        <div className="flex flex-col w-[360px] bg-white border-r border-gray-200 rounded-lg shadow-lg h-full">
            <h3 className="font-medium text-lg">{restaurantName}</h3>
            <button
                onClick={() => handleClose()}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
                <X size={20} className="text-gray-500" />
            </button>
            <MainResaturantDetail restaurantId={restaurantId} />
        </div>
    );
};

export default RestaurantDetailContainer;
