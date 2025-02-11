import apiClient from "../apiClient";
import {
  FavoriteList,
  FavoriteResponse,
} from "../../components/layout/main/sideBarDetail/favorites/entity/prop/FavoriteProps";

export const favoriteService = {
  getFavorites: async (): Promise<FavoriteList[]> => {
    const response = await apiClient.get<FavoriteResponse>(
      "/api/users/favorites"
    );
    return response.data.data.favoriteLists;
  },
  addFavorite: async (
    favoriteId: number,
    restaurantId: number
  ): Promise<void> => {
    await apiClient.post("/api/v1/favorite/restaurant/add", {
      favoriteId,
      restaurantId,
    });
  },
  createFavorite: async (name: string): Promise<void> => {
    await apiClient.post("/api/v1/favorite/create", { name });
  },
  isFavorite: async (restaurantId: number): Promise<boolean> => {
    const response = await apiClient.get<boolean>(
      `/api/v1/favorite/isFavorite`
    );
    return response.data;
  },
};

export default favoriteService;
