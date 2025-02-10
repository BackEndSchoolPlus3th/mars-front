import React, { useEffect, useState } from 'react';
import FavoriteCard from '../entity/card/FavoriteCard';
import favoriteService from '../../../../../../api/services/favoriteService';
import { FavoriteList } from '../entity/prop/FavoriteProps';

const SidebarFavorites: React.FC = () => {
    const [favorites, setFavorites] = useState<FavoriteList[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
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
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (!favorites || favorites.length === 0) return <div>No favorites found</div>;

    return (
        <div className="flex flex-col w-full h-full p-4">
            <h1 className="text-xl font-bold mb-4">찜 리스트</h1>
            <div className="flex flex-col space-y-4 overflow-y-auto">
                {favorites.map((favorite) => (
                    <FavoriteCard
                        key={favorite.id}
                        name={favorite.name}
                        isPublic={favorite.isPublic}
                        restaurants={favorite.restaurantLists}
                    />
                ))}
            </div>
        </div>
    );
};

export default SidebarFavorites;