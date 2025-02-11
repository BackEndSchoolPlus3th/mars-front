import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiClient, User, SocialState, LoginPayload } from '../../../api';
import { login } from '../../../utils';

const AuthKakaoCallback = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = useCallback(
        (loginPayload: LoginPayload) => {
            dispatch(login(loginPayload));
            navigate('/');
        },
        [dispatch, navigate],
    );

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            const getKakaoToken = async () => {
                try {
                    const response = await apiClient.post(
                        '/api/auth/login/kakao',
                        { code },
                    );
                    console.log('Kakao Login Response:', response.data);

                    const user: User = {
                        id: response.data.authUser.id,
                        name: response.data.authUser.name,
                        email: response.data.authUser.email,
                        profileImageUrl: response.data.authUser.profileImageUrl,
                        isLoggedIn: true,
                    };

                    const social: SocialState = {
                        type: 'kakao',
                        accessToken: response.data.accessToken,
                    };

                    const loginPayload: LoginPayload = {
                        user,
                        accessToken: response.data.accessToken,
                        social,
                    };

                    handleLogin(loginPayload);
                } catch (error) {
                    console.error('Kakao Login failed:', error);
                }
            };

            getKakaoToken();
        }
    }, [handleLogin]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">
                    카카오 로그인 처리 중...
                </h1>
                <div className="flex justify-center">
                    <svg
                        className="animate-spin h-8 w-8 text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AuthKakaoCallback;
