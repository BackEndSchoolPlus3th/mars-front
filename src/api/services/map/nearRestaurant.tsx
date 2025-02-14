import apiClient from '../../apiClient';

export const nearRestaurant = async (
    lat: number,
    lng: number,
    distance: number,
) => {
    try {
        const response = await apiClient.get('/api/v1/restaurantsDoc/nearby', {
            params: {
                lat,
                lng,
                distance,
            },
        });
        return response.data;
    } catch (error) {
        console.error('식당 데이터 조회 실패:', error);
    }
};
