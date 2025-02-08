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
  address: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  price: string;
  category: string;
  priceRange: string;
}

export interface RestaurantDetail extends Restaurant {
  description: string;
  phone: string;
  businessHours: BusinessHours;
  menu: Menu[];
  reviews: Review[];
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
  restaurantId: number;
  content: string;
  rating: number;
  images?: string[];
  author: Author;
  createdAt: string;
}

export interface Author {
  id: number;
  name: string;
  profileImage?: string;
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
export type ListType = "search" | "favorites" | "trending";

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
    commentId: number;  // <-- id → commentId 변경
    content: string;
    user: {
      userId: number;   // <-- id → userId 변경
      name: string;
      profileImage?: string;
    };
    createdAt: string;
    replies?: Reply[];  // ✅ 대댓글 배열 추가
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