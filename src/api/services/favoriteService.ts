import apiClient from "../apiClient";
import {
  FavoriteList,
  FavoriteResponse,
} from "../../components/layout/main/sideBarDetail/favorites/entity/prop/FavoriteProps";

export const favoriteService = {
  // Get the count of favorite lists for a user
  getFavoriteCount: async (email: string): Promise<number> => {
    const response = await apiClient.get<{ count: number }>(`/api/v1/favorite/count?email=${email}`);
    return response.data.count;
  },

  // Get details of a specific favorite list
  getFavorite: async (favoriteId: number): Promise<FavoriteResponse> => {
    const response = await apiClient.get(`/api/v1/favorite/${favoriteId}`);
    return response.data.data;
  },

  // Get all favorite lists for the user (새로 추가된 메소드)
  getFavorites: async (): Promise<FavoriteList[]> => {
    const response = await apiClient.get(`/api/v1/favorite`);  // API 경로 수정
    return response.data.data;  // 응답 데이터를 리스트 형식으로 반환
  },

  // Add a restaurant to a specific favorite list
  addRestaurantToFavorite: async (favoriteId: number, restaurantId: number): Promise<void> => {
    const requestBody = { restaurantId: Number(restaurantId) };  // ✅ 숫자로 변환하여 전송
    await apiClient.post(`/api/v1/favorite/${favoriteId}/restaurant`, requestBody);
},



  // Create a new favorite list
  createFavoriteList: async (name: string, isPublic: boolean): Promise<void> => {
    await apiClient.post("/api/v1/favorite/create", {
      name,
      isPublic,
    });
  },

  // Check if a restaurant is in the user's favorite list
  isFavorite: async (restaurantId: number): Promise<boolean> => {
    const response = await apiClient.get<{ isFavorite: boolean }>(
      `/api/v1/favorite/isFavorite?restaurantId=${restaurantId}`
    );
    return response.data.isFavorite;
  },

  // Delete a favorite list
  deleteFavorite: async (favoriteId: number): Promise<void> => {
    await apiClient.delete(`/api/v1/favorite/${favoriteId}`);
  },

  
};

export default favoriteService;
