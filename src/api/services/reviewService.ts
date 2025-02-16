import apiClient from "../apiClient";
import type { ApiResponse } from "../types";
import type { Review } from "../types";

export const reviewService = {
  async getByRestaurant(restaurantId: number): Promise<ApiResponse<Review[]>> {
    return apiClient.get(`/api/v1/restaurant/${restaurantId}/review`);
  },

  async create(
    restaurantId: number,
    data: FormData
  ): Promise<ApiResponse<Review>> {
    return apiClient.post(`/api/v1/restaurant/${restaurantId}/review`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async delete(reviewId: number): Promise<ApiResponse<void>> {
    return apiClient.delete(`/api/v1/review/${reviewId}`);
  },

  async update(reviewId: number, data: FormData): Promise<ApiResponse<Review>> {
    return apiClient.patch(`/api/v1/review/${reviewId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export const searchReviews = async (keyword: string): Promise<Review[]> => {
  try {
    const response = await apiClient.get(`/api/v1/reviewsDocs/search`, {
      params: { keyword }
    });
    // 응답 데이터 구조 확인을 위한 로깅
    console.log('Search response:', response);
    // response.data가 배열이 아닐 경우 처리
    return Array.isArray(response.data) ? response.data : response.data.data || [];
  } catch (error) {
    console.error('Error searching reviews:', error);
    throw error;
  }
};