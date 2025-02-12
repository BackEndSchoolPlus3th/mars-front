import React, { useEffect, useState } from 'react';
import favoriteService from '../../../../../api/services/favoriteService';
import { FavoriteList } from '../../sideBarDetail/favorites/entity/prop/FavoriteProps';
import { X } from 'lucide-react';

interface MainAddFavoriteProps {
    restaurantId: number;
    showAddFavorite: (show: boolean) => void;
}

const MainAddFavorite: React.FC<MainAddFavoriteProps> = ({
    restaurantId,
    showAddFavorite,
}) => {
    const [favorites, setFavorites] = useState<FavoriteList[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setIsLoading(true);
                const data = await favoriteService.getFavorites();
                setFavorites(data || []);
                console.log('찜 리스트:', data);
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

    const handleClose = () => {
        showAddFavorite(false);
    };

    return (
        <div className="flex flex-col w-full p-2 ring-1 ring-orange-500 rounded-lg">
            <div className="flex justify-end">
                <button
                    onClick={() => handleClose()}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors m-1"
                >
                    <X size={20} className="text-gray-500" />
                </button>
            </div>
            {favorites.length !== 0 ? (
                favorites.map((favorite) => (
                    <div
                        className="p-2 border rounded-lg mb-4"
                        key={favorite.id}
                        onClick={() => fetchAddFavorite(favorite.id)}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-lg font-semibold">
                                {favorite.name}
                            </h4>
                            <p>{favorite.restaurantLists.length}개 저장됨</p>
                        </div>
                    </div>
                ))
            ) : (
                <></>
            )}
            <input
                type="text"
                placeholder="새로운 찜 리스트 추가"
                className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        fetchCreateFavorite(e.currentTarget.value);
                        e.currentTarget.value = '';
                    }
                }}
            />
        </div>
    );
};

export default MainAddFavorite;
