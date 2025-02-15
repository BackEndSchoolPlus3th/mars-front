import React, { useEffect, useState } from 'react';
import { useRecommendedRestaurants, RestaurantResponse } from '../../../../../../api/services/restaurantService';
import RestaurantCard from '../../search/entity/card/RestaurantCard';

interface SidebarTrendingProps {
    setSelectedRestaurant: (id: number) => void;
    onShowRestaurantDetail: (show: boolean) => void;
}

const SidebarTrending: React.FC<SidebarTrendingProps> = ({
    setSelectedRestaurant,
    onShowRestaurantDetail,
}) => {
    const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setIsLoading(true);
                const data = await useRecommendedRestaurants();
                // 이미 매핑된 데이터를 그대로 사용
                console.log('Restaurants:', data);
                setRestaurants(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchRestaurants();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading restaurants: {error.message}</div>;
    if (!restaurants || restaurants.length === 0) {
        return <div>No restaurants found</div>;
    }

    return (
        <div className="space-y-4">
            {restaurants.map((restaurant) => (
                <RestaurantCard
                    key={restaurant.id}
                    id={restaurant.id}
                    name={restaurant.name}
                    details={restaurant.details}
                    averageRate={restaurant.averageRate}
                    setSelectedRestaurant={setSelectedRestaurant}
                    showRestaurantDetail={onShowRestaurantDetail}
                />
            ))}
        </div>
    );
};

export default SidebarTrending;