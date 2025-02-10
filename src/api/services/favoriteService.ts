import apiClient from "../apiClient";
import { FavoriteList, FavoriteResponse } from "../../components/layout/main/sideBarDetail/favorites/entity/prop/FavoriteProps";

export const favoriteService = {
    getFavorites: async (): Promise<FavoriteList[]> => {
        const response = await apiClient.get<FavoriteResponse>('/api/users/favorites');
        return response.data.data.favoriteLists;
    }
};

export default favoriteService;