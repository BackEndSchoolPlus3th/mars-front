import { useState } from 'react';
import { Star, MapPin, Phone, Clock, X, Search } from 'lucide-react';
import type { RestaurantDetail } from '../../../api/types';
import { useRestaurantDetail } from '../../../api/services/restaurantService';

interface RestaurantDetailProps {
    restaurantId: number;
    // onClose: () => void;
}

const RestaurantDetail = ({ restaurantId }: RestaurantDetailProps) => {
    const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');
    const {
        data: restaurant,
        isLoading,
        error,
    } = useRestaurantDetail(restaurantId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred: {error.message}</div>;
    if (!restaurant) return <div>Restaurant not found</div>;

    return (
        <div className="w-[360px] bg-white border-l border-gray-200 overflow-hidden flex flex-col h-full">
            <div className="relative h-64">
                <img
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                />
                <button
                    // onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-60 transition-colors"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">
                        {restaurant.name}
                    </h2>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                        <span className="flex items-center text-orange-500">
                            <Star size={16} className="mr-1" />
                            {restaurant.rating}
                        </span>
                        <span className="mx-2">•</span>
                        <span>리뷰 {restaurant.reviewCount}</span>
                    </div>

                    <div className="space-y-3 text-sm">
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
                            <span>{restaurant.phone}</span>
                        </div>
                        <div className="flex items-start">
                            <Clock
                                size={16}
                                className="mr-2 mt-0.5 text-gray-400"
                            />
                            <div>
                                <p>
                                    {restaurant.businessHours.open} -{' '}
                                    {restaurant.businessHours.close}
                                </p>
                                {restaurant.businessHours.breakTime && (
                                    <p className="text-orange-500">
                                        브레이크타임:{' '}
                                        {
                                            restaurant.businessHours.breakTime
                                                .start
                                        }{' '}
                                        -{' '}
                                        {restaurant.businessHours.breakTime.end}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('info')}
                            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === 'info'
                                    ? 'border-orange-500 text-orange-500'
                                    : 'border-transparent text-gray-500'
                            }`}
                        >
                            정보
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
                        {activeTab === 'info' ? (
                            <div className="space-y-4">
                                <h3 className="font-medium">메뉴</h3>
                                <div className="space-y-2">
                                    {restaurant.menu &&
                                    restaurant.menu.length > 0 ? (
                                        restaurant.menu.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex justify-between"
                                            >
                                                <span>{item.name}</span>
                                                <span className="text-orange-500">
                                                    ₩
                                                    {item.price.toLocaleString()}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div>메뉴 정보가 없습니다.</div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="리뷰 검색"
                                        className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm"
                                    />
                                    <Search
                                        className="absolute left-3 top-2.5 text-gray-400"
                                        size={16}
                                    />
                                </div>
                                {/* 리뷰 목록은 별도 컴포넌트로 분리하여 구현 */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetail;
