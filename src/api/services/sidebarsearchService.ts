import apiClient from '../apiClient';

export interface RestaurantResponse {
    id: number;
    name: string;
    details: string;
    averageRate: number;
}

export const fetchRestaurants = async (): Promise<RestaurantResponse[]> => {
    try {
        const response = await apiClient.get<RestaurantResponse[]>(
            '/api/v1/restaurantsDoc/sort/rate',
        );
        console.log('식당 데이터 조회:', response.data);
        return response.data;
    } catch (error) {
        console.error('식당 데이터 조회 실패:', error);
        throw error;
    }
};

export const searchRestaurants = async (
    query: string,
    lat: number,
    lon: number,
): Promise<RestaurantResponse[]> => {
    try {
        const response = await apiClient.get<RestaurantResponse[]>(
            `/api/v1/restaurantsDoc/search?keyword=${encodeURIComponent(
                query,
            )}&lat=${lat}&lon=${lon}`,
        );
        return response.data;
    } catch (error) {
        console.error('식당 검색 실패:', error);
        throw error;
    }
};
