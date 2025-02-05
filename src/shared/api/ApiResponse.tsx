export interface ApiResponse<T = unknown> {
    status: number;
    message: string;
    data: T;
}

// Auth Types
export interface LoginRequest {
    accessToken: string;
    user: User;
}

export interface User {
    name: string;
    email: string;
    profileImageUrl?: string;
    phoneNumber?: string;
    birthdate?: string;
}

export interface RegisterRequest extends LoginRequest {
    name: string;
}

// Restaurant Types
export interface Restaurant {
    id: number;
    name: string;
    address: string;
    rating: number;
    reviews: number;
    image: string;
    price: string;
    category?: string;
    tags?: string[];
    similarKeywords?: string[];
    reviewSummary?: string;
}

export interface RestaurantDetail extends Restaurant {
    description: string;
    phone: string;
    businessHours: {
        open: string;
        close: string;
        breakTime?: {
            start: string;
            end: string;
        };
    };
    menu: MenuItem[];
}

// Menu Types
export interface MenuItem {
    id: number;
    name: string;
    price: number;
    description?: string;
}

// Review Types
export interface Review {
    id: number;
    content: string;
    rating: number;
    images?: string[];
    author: {
        id: number;
        name: string;
        profileImage?: string;
    };
    createdAt: string;
}

// 기타 사용 타입 (예: 지도 관련)
export interface Place {
    id: string;
    name: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}
