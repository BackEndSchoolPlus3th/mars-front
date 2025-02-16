import React, { useEffect, useState } from 'react';
import { Star, MapPin, Phone, Clock, X, Heart, HeartOff } from 'lucide-react';
import { useRestaurantDetail } from '../../../../../api/services/restaurantService';
import MainRestaurantDetailMenu from '../component/MainRestaurantDetailMenu';
import MainRestaurantDetailReview from '../component/MainRestaurantDetailReview';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../utils';
import MainAddFavorite from '../component/MainAddFavorite';
import favoriteService from '../../../../../api/services/favoriteService';
import MainAddReview from '../component/MainAddReview';
import { apiClient } from '../../../../../api';

interface RestaurantDetailContainerProps {
    restaurantId: number;
    showRestaurantDetail: (show: boolean) => void;
}

const RestaurantDetailContainer: React.FC<RestaurantDetailContainerProps> = ({
    restaurantId,
    showRestaurantDetail,
}) => {
    const user = useSelector((state: RootState) => state.user);
    const [favoriteId, setFavoriteID] = useState<number | null>(null);
    const [showAddFavorite, setShowAddFavorite] = useState(false);
    const [showAddReview, setShowAddReview] = useState(false);

    const {
        data: restaurant,
        isLoading,
        error,
    } = useRestaurantDetail(restaurantId);
    const [activeTab, setActiveTab] = useState<'menu' | 'reviews'>('menu');

    const fetchFavoriteCheck = async () => {
        try {
            const response = await apiClient.get('/api/v1/favorite/check', {
                params: { restaurantId },
            });
            console.log('Favorite check:', response.data);
            setFavoriteID(response.data.isFavorite);
        } catch (error) {
            console.error('Error checking favorite:', error);
        }
    };

    const fetchDeleteFavorite = async () => {
        try {
            await apiClient.post('/api/v1/favorite/delete/restaurant', {
                favoriteId,
                restaurantId,
            });
            setFavoriteID(null);
        } catch (error) {
            console.error('Error canceling favorite:', error);
        }
    };

    useEffect(() => {
        if (user.isLoggedIn) fetchFavoriteCheck();
    }, [restaurantId]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred: {error.message}</div>;
    if (!restaurant) return <div>Restaurant not found</div>;

    const handleClose = () => {
        showRestaurantDetail(false);
    };

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user.isLoggedIn && favoriteId == null) {
            setShowAddFavorite(true);
        }
    };

    const handleFavoriteCancel = (e: React.MouseEvent) => {
        fetchDeleteFavorite();

        e.stopPropagation();
        setShowAddFavorite(false);
    };

    return (
        <div className="flex flex-col w-[360px] bg-white border-r border-gray-200 rounded-lg shadow-lg h-full">
            <div className="relative h-64">
                <img
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="absolute w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute flex justify-end w-full">
                    <button
                        onClick={() => handleClose()}
                        className="p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors m-3"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">
                        {restaurant.name}
                    </h2>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                        <span className="flex items-center text-orange-500">
                            <Star size={16} className="mr-1" />
                            {restaurant.averageRate.toFixed(1)}
                        </span>
                        <span className="mx-2">•</span>
                        <span>리뷰 {restaurant.reviews.length}</span>
                    </div>

                    <div className="space-y-3 text-sm pb-2">
                        <div className="flex items-start">
                            <MapPin
                                size={16}
                                className="mr-2 mt-0.5 text-gray-400"
                            />
                            <span>{restaurant.address}</span>
                        </div>
                        <div className="flex items-start">
                            <Phone
                                size={16}
                                className="mr-2 mt-0.5 text-gray-400"
                            />
                            <span>{restaurant.contact}</span>
                        </div>
                        <div className="flex items-start">
                            <Clock
                                size={16}
                                className="mr-2 mt-0.5 text-gray-400"
                            />
                            <div>
                                {restaurant.businessHours && restaurant.businessHours.length > 0 ? (
                                    <>
                                        <p>
                                            {restaurant.businessHours[0].open} -{' '}
                                            {restaurant.businessHours[0].close}
                                        </p>
                                        {restaurant.businessHours[0].breakTime && (
                                            <p className="text-orange-500">
                                                브레이크타임:{' '}
                                                {restaurant.businessHours[0].breakTime.start}{' '}
                                                -{' '}
                                                {restaurant.businessHours[0].breakTime.end}
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <p>영업시간 정보가 없습니다.</p>
                                )}
                                {restaurant.runningState ? (
                                    <p className="text-green-500">영업중</p>
                                ) : (
                                    <p className="text-red-500">영업종료</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-start">
                            {user.isLoggedIn ? (
                                favoriteId != null ? (
                                    <button onClick={handleFavoriteCancel}>
                                        <Heart color="red" fill="red" />
                                    </button>
                                ) : (
                                    <button onClick={handleLikeClick}>
                                        <Heart color="red" fill="none" />
                                    </button>
                                )
                            ) : (
                                <>
                                    <HeartOff color="gray" fill="none" />
                                    <p className="text-orange-500">
                                        로그인이 필요한 서비스입니다.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="border-t border-gray-200">
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('menu')}
                                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === 'menu'
                                        ? 'border-orange-500 text-orange-500'
                                        : 'border-transparent text-gray-500'
                                }`}
                            >
                                메뉴
                            </button>
                            <button
                                onClick={() => setActiveTab('reviews')}
                                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === 'reviews'
                                        ? 'border-orange-500 text-orange-500'
                                        : 'border-transparent text-gray-500'
                                }`}
                            >
                                리뷰
                            </button>
                        </div>

                        <div className="p-4">
                            {activeTab === 'menu' ? (
                                <MainRestaurantDetailMenu
                                    restaurantMenus={restaurant.restaurantMenus}
                                />
                            ) : (
                                <MainRestaurantDetailReview
                                    restaurantReviews={restaurant.reviews}
                                    showAddReview={setShowAddReview}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showAddFavorite && (
                <div className="absolute bottom-4 right-4 bg-white p-2 border-r border-gray-200 lounded-lg w-[360px]">
                    <MainAddFavorite
                        restaurantId={restaurantId}
                        showAddFavorite={setShowAddFavorite}
                    />
                </div>
            )}
            {showAddReview && (
                <div className="absolute bottom-4 right-4 bg-white p-2 border-r border-gray-200 lounded-lg w-[360px]">
                    <MainAddReview
                        restaurantId={restaurantId}
                        showAddReview={setShowAddReview}
                    />
                </div>
            )}
        </div>
    );
};

export default RestaurantDetailContainer;
