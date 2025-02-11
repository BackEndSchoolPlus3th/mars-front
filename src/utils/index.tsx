// src/utils/index.ts

// 가격 포맷팅
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
    }).format(price);
};

// 날짜 포맷팅
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
};

// 평점을 별점으로 변환
export const ratingToStars = (rating: number): string => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return '⭐'.repeat(fullStars) + (hasHalfStar ? '½' : '');
};

// 이미지 URL 생성
export const getImageUrl = (path: string): string => {
    return `${import.meta.env.VITE_API_URL}/images/${path}`;
};

// 에러 메시지 처리
export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    return '알 수 없는 에러가 발생했습니다.';
};

export type { RootState, AppDispatch } from './store/Store';
export { login, logout } from './slice/UserSlice';
