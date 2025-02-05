import { apiClient } from '../../../shared';

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;

const NaverLoginButton = () => {
    console.log('NAVER_CLIENT_ID:', NAVER_CLIENT_ID);
    console.log('REDIRECT_URI:', REDIRECT_URI);

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

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={handleLogin}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded flex items-center"
            >
                <svg
                    className="w-6 h-6 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.991 4.388 10.937 10.125 11.854v-8.385H7.078v-3.47h3.047V9.413c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.953.926-1.953 1.874v2.243h3.328l-.532 3.47h-2.796v8.385C19.612 22.937 24 17.991 24 12 24 5.373 18.627 0 12 0z" />
                </svg>
                네이버 로그인
            </button>
        </div>
    );
};

export default NaverLoginButton;
