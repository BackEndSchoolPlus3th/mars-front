// types/index.ts

// 기존 타입들 유지
export interface ApiResponse<T = unknown> {
    status: number;
    message: string;
    data: T;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
    name: string;
}

export interface Restaurant {
    id: number;
    name: string;
    details: string;
    address: string;
    averageRate: number;
    imageUrl: string;
    categoryId: string;
    lat: number;
    lon: number;
    runningState: string;
}

export interface RestaurantDetail extends Restaurant {
    contact: string;
    businessHours: BusinessHours[];
    restaurantMenus: Menu[];
    reviews: Review[];
    summarizedReview: string;
}

export interface BusinessHours {
    open: string;
    close: string;
    breakTime?: {
        start: string;
        end: string;
    };
}

export interface Menu {
    id: number;
    restaurantId: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    category?: string;
    isAvailable: boolean;
}

export interface Review {
    id: number;
    userId: number;
    restaurantId: number;
    name: string;
    body: string;
    rate: number;
}

export interface RecommendedRestaurant {
    id: number;
    name: string;
    imageUrl: string;
    address: string;
    rating: number;
    reviewCount: number;
}

export interface Reviewer {
    id: number;
    rank?: number;
    name: string;
    score: number;
    image: string;
    reviewCount: number;
}

// Sidebar 관련 추가 타입
export type ListType = 'search' | 'favorites' | 'trending';

export interface SidebarButtonProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

export interface RestaurantCardProps {
    restaurant: Restaurant;
    onClick: (id: number) => void;
}

export interface SearchPanelProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    restaurants: Restaurant[];
    onRestaurantClick: (id: number) => void;
}

export interface RestaurantListProps {
    restaurants: Restaurant[];
    onRestaurantClick: (id: number) => void;
}

// ✅ Board (게시글) 타입 추가
export interface Board {
    id: number; // 기존 id 필드 유지
    boardId?: number; // 백엔드에서 넘어오는 boardId를 추가
    title: string;
    content: string;
    user: {
        id: number;
        name: string;
        profileImage?: string;
    };
    hashTags: string[];
    viewCnt: number;
    createdAt: string;
    updatedAt: string;
    comments: Comment[];
}

// ✅ Comment (댓글) 타입 추가
// ✅ Comment (댓글) 타입 수정
export interface Comment {
    commentId: number; // <-- id → commentId 변경
    content: string;
    user: {
        userId: number; // <-- id → userId 변경
        name: string;
        profileImage?: string;
    };
    createdAt: string;
    replies?: Reply[]; // ✅ 대댓글 배열 추가
}

export interface Reply {
    replyId: number;
    content: string;
    userId: number;
    username: string;
    createdAt: string;
}

// ✅ 추가된 타입 (RestaurantSummaryDTO 타입 확장)
export interface RestaurantSummaryDTO {
    id: number;
    name: string;
    contact: string;
    details: string;
    averageRate: number;
    summarizedReview: string;
    imageUrl: string;
    categoryName: string;
    menus: MenuDTO[];
    businessHours: BusinessHourDTO[];
}

export interface MenuDTO {
    name: string;
    price: number;
    imageUrl: string;
}

export interface BusinessHourDTO {
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
}

// ✅ 리뷰어 API 응답 타입
export interface ReviewerResponse {
    top: Reviewer[]; // 상위 3명의 리뷰어
    others: Reviewer[]; // 나머지 리뷰어 목록
}

// ✅ RestaurantReviewAnalysisDTO 타입 추가
export interface RestaurantReviewAnalysisDTO {
    restaurantId: number;
    restaurantName: string;
    reviewCount: number;
    averageRating: number;
    weightedScore: number;
    rank: number;
    reviews: ReviewSummary[];
}

// ✅ ReviewSummary 타입 추가 (리뷰 내용 요약)
export interface ReviewSummary {
    name: string;
    body: string;
    rate: number;
}
