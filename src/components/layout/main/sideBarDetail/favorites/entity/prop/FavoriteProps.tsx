export interface RestaurantList {
    id: number;
    name: string;
    details: string;
    averageRate: number;
    imageUrl: string;
    contact: string;
    address: string;
    lat: number;
    lng: number;
    runningState: boolean;
    summarizedReview: string;
    categoryId: number;
}

export interface FavoriteList {
    id: number;
    name: string;
    isPublic: boolean;
    restaurantLists: RestaurantList[];
}

export interface FavoriteResponse {
    resultCode: string;
    msg: string;
    data: {
        id: number;
        name: string;
        favoriteLists: FavoriteList[];
    };
}