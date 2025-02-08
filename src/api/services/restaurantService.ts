import { useQuery, useMutation, useQueryClient } from 'react-query';
import apiClient from '../apiClient';
import type {
    Restaurant,
    RestaurantDetail,
    Review,
    ApiResponse,
} from '../types';

// API 엔드포인트 상수
const RESTAURANT_API = '/api/v1/restaurant';
const RESTAURANTS_DOC_API = '/api/v1/restaurantsDoc';

// 에러 핸들링 유틸리티
import { AxiosError } from 'axios';

const handleApiError = (error: AxiosError) => {
    if (error.response) {
        throw new Error(
            (error.response?.data as { message: string }).message ||
                '서버 에러가 발생했습니다.',
        );
    }
    throw new Error('네트워크 에러가 발생했습니다.');
};

// 추천 맛집 훅 수정
export const useRecommendedRestaurants = () => {
    return useQuery<Restaurant[], Error>(
        ['recommendedRestaurants'],
        async () => {
            const response = await apiClient.get<ApiResponse<Restaurant[]>>(
                `${RESTAURANTS_DOC_API}/sort/rate`,
            );
            return response.data.data;
        },
    );
};

// 식당 상세 정보
export const useRestaurantDetail = (id: number) => {
    return useQuery<RestaurantDetail, Error>(
        ['restaurantDetail', id],
        async () => {
            const response = await apiClient.get<ApiResponse<RestaurantDetail>>(
                `${RESTAURANT_API}/${id}`,
            );
            console.log('식당 상세 정보 로드:', response.data.data);
            return response.data.data;
        },
        {
            enabled: !!id,
        },
    );
};

// 식당 검색
export const useRestaurantSearch = (query: string) => {
    return useQuery<Restaurant[], Error>(
        ['restaurantSearch', query],
        async () => {
            const response = await apiClient.get<ApiResponse<Restaurant[]>>(
                `${RESTAURANTS_DOC_API}/search`,
                { params: { query } },
            );
            return response.data.data;
        },
        {
            enabled: !!query,
        },
    );
};

// 즐겨찾기 맛집 조회
export const useFavoriteRestaurants = () => {
    return useQuery<Restaurant[], Error>(['favoriteRestaurants'], async () => {
        const response = await apiClient.get<ApiResponse<Restaurant[]>>(
            `${RESTAURANT_API}/favorites`,
        );
        return response.data.data;
    });
};

// 즐겨찾기 토글
export const useToggleFavorite = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>(
        async (id) => {
            try {
                await apiClient.post(`${RESTAURANT_API}/${id}/favorite`);
            } catch (error) {
                return handleApiError(error);
            }
        },
        {
            onSuccess: () => {
                // 관련된 쿼리 무효화
                queryClient.invalidateQueries('favoriteRestaurants');
                queryClient.invalidateQueries('restaurantDetail');
            },
        },
    );
};

// 리뷰 작성
export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation<
        ApiResponse<Review>,
        Error,
        { restaurantId: number; data: FormData }
    >(
        async ({ restaurantId, data }) => {
            try {
                const response = await apiClient.post(
                    `${RESTAURANT_API}/${restaurantId}/review`,
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );
                return response.data;
            } catch (error) {
                return handleApiError(error);
            }
        },
        {
            onSuccess: (_, { restaurantId }) => {
                queryClient.invalidateQueries([
                    'restaurantReviews',
                    restaurantId,
                ]);
                queryClient.invalidateQueries([
                    'restaurantDetail',
                    restaurantId,
                ]);
            },
        },
    );
};

// 리뷰 목록 조회
export const useRestaurantReviews = (restaurantId: number) => {
    return useQuery<ApiResponse<Review[]>, Error>(
        ['restaurantReviews', restaurantId],
        async () => {
            try {
                const response = await apiClient.get(
                    `${RESTAURANT_API}/${restaurantId}/review`,
                );
                return response.data;
            } catch (error) {
                return handleApiError(error);
            }
        },
        {
            enabled: !!restaurantId,
        },
    );
};

// 간단 호출용 서비스 객체
export const restaurantService = {
    async getById(id: number) {
        const response = await apiClient.get<ApiResponse<RestaurantDetail>>(
            `${RESTAURANT_API}/${id}`,
        );
        return response.data.data;
    },

    async getRecommended() {
        const response = await apiClient.get<ApiResponse<Restaurant[]>>(
            `${RESTAURANTS_DOC_API}/sort/rate`,
        );
        return response.data.data;
    },
};
