import { apiClient } from '../../..';

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;

export const AuthNaver = () => {
    const getNaverState = async () => {
        try {
            const response = await apiClient.get('/api/auth/login/naver/state');
            console.log('네이버 state:', response.data);
            return response.data;
        } catch (error) {
            console.error('네이버 state 가져오기 실패:', error);
            return null;
        }
    };

    const handleLogin = async () => {
        try {
            const state = await getNaverState();

            if (!state) {
                window.alert('네이버 state 값을 가져오는 데 실패했습니다.');
                return;
            }

            const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}`;

            window.location.href = naverAuthUrl;
        } catch (error) {
            console.error('네이버 로그인 처리 중 오류 발생:', error);
        }
    };

    return handleLogin;
};