import React, { useEffect, useState } from 'react';
import FavoriteCard from '../entity/card/FavoriteCard';
import favoriteService from '../../../../../../api/services/favoriteService';
import { FavoriteList } from '../entity/prop/FavoriteProps';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../utils';

interface SidebarFavoritesProps {
    setSelectedRestaurant: (id: number) => void;
    onShowRestaurantDetail: (show: boolean) => void;
}

const SidebarFavorites: React.FC<SidebarFavoritesProps> = ({
    setSelectedRestaurant,
    onShowRestaurantDetail,
}) => {
    const user = useSelector((state: RootState) => state.user);

    const [favorites, setFavorites] = useState<FavoriteList[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!user.isLoggedIn) return;

        const fetchFavorites = async () => {
            try {
                setIsLoading(true);
                const data = await favoriteService.getFavorites();
                setFavorites(data || []);
            } catch (error) {
                console.error('Failed to fetch favorites:', error);
                setFavorites([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavorites();
    }, [user.isLoggedIn]);

    if (!user.isLoggedIn) return <div>로그인이 필요합니다</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!favorites || favorites.length === 0)
        return <div>No favorites found</div>;

    return (
        <div className="flex flex-col w-full h-full p-4">
            <div className="flex flex-col space-y-4 overflow-y-auto">
                {favorites.map((favorite) => (
                    <FavoriteCard
                        key={favorite.id}
                        name={favorite.name}
                        isPublic={favorite.isPublic}
                        restaurants={favorite.restaurantLists}
                        setSelectedRestaurant={setSelectedRestaurant}
                        showRestaurantDetail={onShowRestaurantDetail}
                    />
                ))}
            </div>
        </div>
    );
};

export default SidebarFavorites;
