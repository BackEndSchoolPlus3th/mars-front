import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../../api';
import type { User, LoginPayload } from '../../api/services/auth/types/types';

const initialState: User = {
    id: null,
    name: '',
    email: '',
    profileImageUrl: '',
    isLoggedIn: false,
};

const savedUser = localStorage.getItem('user');
const initialUserState = savedUser ? JSON.parse(savedUser) : initialState;

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        login: (state, action: PayloadAction<LoginPayload>) => {
            const { user, accessToken, social } = action.payload;
            console.log('로그인 정보:', user, accessToken, social);

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('social', JSON.stringify(social));
            return { ...user, isLoggedIn: true };
        },
        logout: async (state) => {
            const userConfirmed = window.confirm('로그아웃 하시겠습니까?');
            if (userConfirmed) {
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('social');
                try {
                    await apiClient.post('/api/auth/logout');
                } catch (error) {
                    console.error('로그아웃 오류:', error);
                }
                window.location.replace('/');
                return initialState;
            }
            return state;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
