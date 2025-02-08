import apiClient from "../apiClient";
import type { ApiResponse } from "../types";
import type { RestaurantSummaryDTO } from "../types";

export const recommendedRestaurantsService = {
  // 랜덤 5개 식당 조회: GET /api/v1/today-random/random
  async getRandomRestaurants(lat: number, lng: number, id: number): Promise<ApiResponse<{ restaurants: RestaurantSummaryDTO[] }>> {
    return apiClient.get(`/api/v1/today-random/random`, {
      params: { lat, lng, id },
    });
  },

  // 선택한 1개 식당 상세 조회: GET /api/v1/today-random/selected
  async getSelectedRestaurant(restaurantId: number): Promise<ApiResponse<RestaurantSummaryDTO>> {
    return apiClient.get(`/api/v1/today-random/selected`, {
      params: { restaurantId },
    });
  },
};
