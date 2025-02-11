import apiClient from '../../apiClient';

export const userLocationService = {
    async getUserLocation() {
        apiClient.get('/api/v1/user/location').then((response) => {
            return response.data.data.locationInfo.loc;
        });
    },
};
