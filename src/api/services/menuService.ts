import { useQuery } from "react-query";
import apiClient from "../apiClient";
import type { Menu, ApiResponse } from "../types";

export const useRestaurantMenu = (restaurantId: number) => {
  return useQuery<Menu[], Error>(
    ["restaurantMenu", restaurantId],
    async () => {
      const response = await apiClient.get<ApiResponse<Menu[]>>(
        `/api/v1/menu/showAllMenus`,
        { params: { restaurant_id: restaurantId } }
      );
      console.log("restaurantMenu", response.data.data);
      return response.data.data;
    },
    {
      enabled: !!restaurantId,
    }
  );
};

export const menuService = {
  async getMenu(restaurantId: number): Promise<Menu[]> {
    const response = await apiClient.get<ApiResponse<Menu[]>>(
      `/api/v1/restaurant/${restaurantId}/menu`
    );
    return response.data.data;
  },

  async createMenu(restaurantId: number, data: Menu): Promise<Menu> {
    const response = await apiClient.post<ApiResponse<Menu>>(
      `/api/v1/restaurant/${restaurantId}/menu`,
      data
    );
    return response.data.data;
  },

  async updateMenu(menuId: number, data: Partial<Menu>): Promise<Menu> {
    const response = await apiClient.patch<ApiResponse<Menu>>(
      `/api/v1/menu/${menuId}`,
      data
    );
    return response.data.data;
  },

  async deleteMenu(menuId: number): Promise<void> {
    await apiClient.delete(`/api/v1/menu/${menuId}`);
  },
};
