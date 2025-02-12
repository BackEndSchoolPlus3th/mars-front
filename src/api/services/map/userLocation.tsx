import apiClient from '../../apiClient';

export const userLocationService = {
    async getUserLocation() {
        const response = await apiClient.get('/api/v1/location/current');
        return response.data;
    },
};
