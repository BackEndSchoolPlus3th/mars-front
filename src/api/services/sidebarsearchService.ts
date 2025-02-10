import apiClient from "../apiClient";

export interface RestaurantResponse {
  id: string;
  name: string;
  details: string;
  averageRate: number;
}

export const fetchRestaurants = async (): Promise<RestaurantResponse[]> => {
  try {
    const response = await apiClient.get<RestaurantResponse[]>(
      "/api/v1/restaurantsDoc/sort/rate"
    );
    return response.data;
  } catch (error) {
    console.error("식당 데이터 조회 실패:", error);
    throw error;
  }
};

export const searchRestaurants = async (
  query: string
): Promise<RestaurantResponse[]> => {
  try {
    const response = await apiClient.get<RestaurantResponse[]>(
      `/api/v1/restaurantsDoc/search?query=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error("식당 검색 실패:", error);
    throw error;
  }
};
