// src/components/sidebar/SidebarSearch.tsx
import React, { useState, useEffect } from "react";
import RestaurantCard from "../../search/entity/card/RestaurantCard";
import { Search } from "lucide-react";
import {
  fetchRestaurants,
  searchRestaurants,
  RestaurantResponse,
} from "../../../../../../api/services/sidebarsearchService";

const SidebarSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error("식당 데이터 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // 검색 기능 추가
  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim()) {
        setIsLoading(true);
        try {
          const data = await searchRestaurants(searchQuery);
          setRestaurants(data);
        } catch (error) {
          console.error("검색 실패:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    // 디바운스 처리
    const timeoutId = setTimeout(handleSearch, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="flex flex-col w-full">
      <div className="search-container w-full p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="동네 맛집 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
        </div>
      </div>
      <div className="divide-y divide-gray-100 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center">로딩 중...</div>
        ) : restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              details={restaurant.details}
              averageRate={restaurant.averageRate}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarSearch;
