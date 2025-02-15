import { useQuery, useMutation, useQueryClient } from 'react-query';
import apiClient from '../apiClient';
import type {
    Restaurant,
    RestaurantDetail,
    Review,
    ApiResponse,
} from '../types';

export interface RestaurantResponse {
    id: number;
    name: string;
    details: string;
    averageRate: number;
}

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
export const useRecommendedRestaurants = async (): Promise<RestaurantResponse[]> => {
    try {
        const response = await apiClient.get<RestaurantResponse[]>(
            `${RESTAURANTS_DOC_API}/sort/rate`,
        );
        // 응답 데이터의 평균 평점 필드를 일관되게 매핑
        const mappedData = response.data.map(restaurant => ({
            ...restaurant,
            averageRate: restaurant.averageRate || (restaurant as any).average_rate || 0
        }));
        console.log('추천 식당 데이터 조회:', mappedData);
        return mappedData;
    } catch (error) {
        console.error('추천 식당 데이터 조회 실패:', error);
        throw error;
    }
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
                return handleApiError(error as AxiosError);
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
                return handleApiError(error as AxiosError);
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
    return useQuery<Review[], Error>(
        ['restaurantReviews', restaurantId],
        async () => {
            try {
                const response = await apiClient.get<ApiResponse<Review[]>>(
                    `api/v1/review/showAllReviews`,
                    { params: { restaurant_id: restaurantId } },
                );
                console.log('리뷰 목록 로드:', response.data.data);
                return response.data.data;
            } catch (error) {
                return handleApiError(error as AxiosError);
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
