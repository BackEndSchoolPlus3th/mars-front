import { useParams } from 'react-router-dom';
import { useRestaurantDetail } from '../../../api/services/restaurantService';

export default function RestaurantDetailPage() {
    const { restaurant_id } = useParams();
    const {
        data: restaurant,
        isLoading,
        error,
    } = useRestaurantDetail(Number(restaurant_id));

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div className="text-red-500">{error.message}</div>;
    if (!restaurant) return <div>식당 정보를 찾을 수 없습니다.</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
            <img
                src={restaurant.imageUrl}
                alt={restaurant.name}
                className="w-full h-64 object-cover mb-4 rounded-lg shadow-md"
            />
            <p className="mb-2 text-gray-700">{restaurant.description}</p>
            <p className="mb-2">
                <strong>주소:</strong> {restaurant.address}
            </p>
            <p className="mb-2">
                <strong>전화번호:</strong> {restaurant.phone}
            </p>
            {restaurant.businessHours && (
                <div className="mb-2">
                    <p>
                        <strong>영업시간:</strong>{' '}
                        {restaurant.businessHours.open} ~{' '}
                        {restaurant.businessHours.close}
                    </p>
                    {restaurant.businessHours.breakTime && (
                        <p>
                            <strong>휴식시간:</strong>{' '}
                            {restaurant.businessHours.breakTime.start} ~{' '}
                            {restaurant.businessHours.breakTime.end}
                        </p>
                    )}
                </div>
            )}
            {restaurant.menu && restaurant.menu.length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold mb-2">메뉴</h2>
                    <ul className="list-disc pl-5">
                        {restaurant.menu.map((menu) => (
                            <li key={menu.id}>
                                {menu.name} - {menu.price}원
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
