import React, { useEffect, useState } from 'react';
import RestaurantCard from '../../search/entity/card/RestaurantCard';

interface SidebarTrendingProps {
    setSelectedRestaurant: (id: number) => void;
    onShowRestaurantDetail: (show: boolean) => void;
}

const SidebarTrending: React.FC<SidebarTrendingProps> = ({
    setSelectedRestaurant,
    onShowRestaurantDetail,
}) => {
    const [restaurantCards, setRestaurantCards] = useState([
        {
            id: 0,
            name: 'test',
            details: 'https://via.placeholder.com/300',
            averageRate: 4.5,
        },
    ]);

    useEffect(() => {
        setRestaurantCards([
            {
                id: 1,
                name: '롯데리아',
                details: '롯데리아의 맛있는 햄버거',
                averageRate: 4.5,
            },
            {
                id: 2,
                name: '맥도날드',
                details: '맥도날드의 맛있는 햄버거',
                averageRate: 4.5,
            },
            {
                id: 3,
                name: '버거킹',
                details: '버거킹의 맛있는 햄버거',
                averageRate: 4.5,
            },
            {
                id: 4,
                name: 'KFC',
                details: 'KFC의 맛있는 치킨',
                averageRate: 4.5,
            },
            {
                id: 5,
                name: '파파존스',
                details: '파파존스의 맛있는 피자',
                averageRate: 4.5,
            },
            {
                id: 6,
                name: '도미노피자',
                details: '도미노피자의 맛있는 피자',
                averageRate: 4.5,
            },
        ]);
    }, []);

    return (
        <div className="flex flex-col w-full h-full max-h-full">
            <div className="divide-y divide-gray-100 overflow-y-auto max-h-190">
                {restaurantCards?.map((restaurantCard) => (
                    <RestaurantCard
                        key={restaurantCard.id}
                        name={restaurantCard.name}
                        id={restaurantCard.id}
                        details={restaurantCard.details}
                        averageRate={restaurantCard.averageRate}
                        setSelectedRestaurant={setSelectedRestaurant}
                        showRestaurantDetail={onShowRestaurantDetail}
                    />
                ))}
            </div>
        </div>
    );
};

export default SidebarTrending;
