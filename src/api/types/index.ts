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
  rate: number;
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
