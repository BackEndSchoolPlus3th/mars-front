import apiClient from "../apiClient";
import type { ApiResponse } from "../types";
import type { RestaurantSummaryDTO } from "../types";
import type { RestaurantReviewAnalysisDTO } from "../types";

export const recommendedRestaurantsService = {
  // 랜덤 5개 식당 조회: GET /api/v1/today-random/random
  async getRandomRestaurants(lat: number, lng: number): Promise<ApiResponse<{ restaurants: RestaurantSummaryDTO[] }>> {
    return apiClient.get(`/api/v1/today-random/random`, {
      params: { lat, lng},
    });
  },

  // 선택한 1개 식당 상세 조회: GET /api/v1/today-random/selected
  async getSelectedRestaurant(restaurantId: number): Promise<ApiResponse<RestaurantSummaryDTO>> {
    return apiClient.get(`/api/v1/today-random/selected`, {
      params: { restaurantId },
    });
  },

  // 유저 아닐 때: 랜덤 5개 식당 조회 (id 없이 요청)
  async getNotUserRandomRestaurants(lat: number, lng: number): Promise<ApiResponse<{ restaurants: RestaurantSummaryDTO[] }>> {
    return apiClient.get(`/api/v1/today-random/notuser/random`, {
      params: { lat, lng },
    });
  },

  // 특정 레스토랑 리뷰 분석 조회
  async getRestaurantReviewAnalysis(restaurantId: number): Promise<ApiResponse<RestaurantReviewAnalysisDTO>> {
    return apiClient.get(`/api/v1/today-random/review-analysis/${restaurantId}`);
  },

  // 전체 레스토랑 리뷰 분석 순위 조회
  async getAllRestaurantReviewAnalysis(): Promise<ApiResponse<RestaurantReviewAnalysisDTO[]>> {
    return apiClient.get(`/api/v1/today-random/review-analysis`);
  },
};
