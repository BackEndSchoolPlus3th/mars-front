export interface User {
    id: number | null; // ✅ null 허용
    name: string;
    email: string;
    profileImageUrl: string;
    isLoggedIn: boolean;
}

export interface SocialState {
    type: string;
    accessToken: string;
    refreshToken?: string;
}

export interface LoginPayload {
    user: User;
    accessToken: string;
    social: SocialState;
}
