import React, { useEffect, useState } from 'react';
import favoriteService from '../../../../../api/services/favoriteService';
import { FavoriteList } from '../../sideBarDetail/favorites/entity/prop/FavoriteProps';

interface MainAddFavoriteProps {
    restaurantId: number;
}

const MainAddFavorite: React.FC<MainAddFavoriteProps> = ({ restaurantId }) => {
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const fetchCreateFavorite = async (name: string) => {
        try {
            await favoriteService.createFavorite(name);
            const data = await favoriteService.getFavorites();
            setFavorites(data || []);
        } catch (error) {
            console.error('Failed to create favorite:', error);
        }
    };

    const fetchAddFavorite = async (favoriteId: number) => {
        try {
            await favoriteService.addFavorite(favoriteId, restaurantId);
        } catch (error) {
            console.error('Failed to add favorite:', error);
        }
    };

    return (
        <div className="flex flex-col w-full p-4">
            {favorites.length !== 0 ? (
                favorites.map((favorite) => (
                    <div
                        className="p-4 border rounded-lg mb-4"
                        key={favorite.id}
                        onClick={() => fetchAddFavorite(favorite.id)}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold">
                                {favorite.name}
                            </h3>
                            <p>{favorite.restaurantLists.length}개 저장됨</p>
                        </div>
                    </div>
                ))
            ) : (
                <></>
            )}
            <div className="p-4 border rounded-lg mb-4">
                <input
                    type="text"
                    placeholder="새로운 찜 리스트 추가"
                    className="w-full p-2 border rounded-lg"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            fetchCreateFavorite(e.currentTarget.value);
                            e.currentTarget.value = '';
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default MainAddFavorite;
