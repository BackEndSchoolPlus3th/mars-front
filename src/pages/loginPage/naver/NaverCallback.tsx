import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../shared';
import { login } from '../../../features';
import { User, SocialState, LoginPayload } from '../../../shared';

const NaverCallback = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (loginPayload: LoginPayload) => {
        dispatch(login(loginPayload));
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (code) {
            const getNaverToken = async () => {
                try {
                    const response = await apiClient.post(
                        '/api/auth/login/naver',
                        {
                            code,
                            state,
                        },
                    );

                    console.log('Naver Login Response:', response.data);

                    const user: User = {
                        name: response.data.authUser.name,
                        email: response.data.authUser.email,
                        profileImageUrl: response.data.authUser.profileImageUrl,
                        isLoggedIn: true,
                    };

                    const social: SocialState = {
                        type: 'naver',
                        accessToken: response.data.accessToken,
                    };

                    const loginPayload: LoginPayload = {
                        user,
                        accessToken: response.data.accessToken,
                        social,
                    };

                    handleLogin(loginPayload);

                    navigate('/');
                } catch (error) {
                    console.error('Naver Login failed:', error);
                }
            };

            getNaverToken();
        }
    }, [navigate]);

    return null;
};

export default NaverCallback;
