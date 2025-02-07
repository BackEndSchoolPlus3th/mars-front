import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, MapPin, Phone, Clock, Search } from "lucide-react";
import type { RestaurantDetail } from "../../api/types";
import { useRestaurantDetail } from "../../api/services/restaurantService";
import { Alert, AlertDescription } from "../../components/ui/alert";

// Separate tab content components for better organization
const InfoTab = ({ menu }: { menu: RestaurantDetail["menu"] }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold mb-2">메뉴</h2>
    <ul className="space-y-2">
      {menu.map((item) => (
        <li
          key={item.id}
          className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md"
        >
          <span className="font-medium">{item.name}</span>
          <span className="text-gray-600">{item.price.toLocaleString()}원</span>
        </li>
      ))}
    </ul>
  </div>
);

const ReviewsTab = () => (
  <div className="space-y-4">
    <div className="relative">
      <input
        type="text"
        placeholder="리뷰 검색"
        className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm"
      />
      <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
    </div>
    {/* Review list component would go here */}
  </div>
);

// Loading and error states as separate components
const LoadingState = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-pulse text-gray-600">로딩 중...</div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <Alert variant="destructive" className="m-4">
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export default function RestaurantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const restaurantId = parseInt(id ?? "0", 10);
  const {
    data: restaurant,
    isLoading,
    error,
  } = useRestaurantDetail(restaurantId);
  const [activeTab, setActiveTab] = useState<"info" | "reviews">("info");

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (!restaurant)
    return <ErrorState message="식당 정보를 찾을 수 없습니다." />;

  const TabButton = ({
    tab,
    label,
  }: {
    tab: typeof activeTab;
    label: string;
  }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
        activeTab === tab
          ? "border-orange-500 text-orange-500"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-6">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-72 object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <span className="flex items-center text-orange-500">
            <Star size={16} className="mr-1" />
            {restaurant.rate.toFixed(1)}
          </span>
          <span className="mx-2">•</span>
          <span>리뷰 {restaurant.reviewCount.toLocaleString()}</span>
        </div>

        <p className="mb-6 text-gray-700 leading-relaxed">
          {restaurant.description}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-start">
                <MapPin
                  size={16}
                  className="mr-3 mt-1 text-gray-400 flex-shrink-0"
                />
                <span className="text-gray-700">{restaurant.address}</span>
              </div>
              <div className="flex items-start">
                <Phone
                  size={16}
                  className="mr-3 mt-1 text-gray-400 flex-shrink-0"
                />
                <span className="text-gray-700">{restaurant.phone}</span>
              </div>
              <div className="flex items-start">
                <Clock
                  size={16}
                  className="mr-3 mt-1 text-gray-400 flex-shrink-0"
                />
                <div>
                  <p className="text-gray-700">
                    {restaurant.businessHours.open} -{" "}
                    {restaurant.businessHours.close}
                  </p>
                  {restaurant.businessHours.breakTime && (
                    <p className="text-orange-500 text-sm mt-1">
                      브레이크타임: {restaurant.businessHours.breakTime.start} -{" "}
                      {restaurant.businessHours.breakTime.end}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg">
            <div className="flex border-b border-gray-200">
              <TabButton tab="info" label="정보" />
              <TabButton tab="reviews" label="리뷰" />
            </div>
            <div className="mt-4">
              {activeTab === "info" ? (
                <InfoTab menu={restaurant.menu} />
              ) : (
                <ReviewsTab />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
