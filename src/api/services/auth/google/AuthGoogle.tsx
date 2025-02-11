import { CredentialResponse } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { apiClient } from '../../..';
import { User, SocialState, LoginPayload } from '../types/types';
import { login } from '../../../../utils';

export const AuthGoogle = () => {
    const dispatch = useDispatch();

    const handleLogin = async (loginPayload: LoginPayload) => {
        dispatch(login(loginPayload));
    };

    const handleLoginSuccess = async (response: CredentialResponse) => {
        if (!response.credential) {
            console.error('No credential received');
            return;
        }

        console.log('Login Success:', response);
        const idToken = response.credential; // Google에서 받은 ID Token

        console.log('idToken', idToken);

        try {
            const res = await apiClient.post('/api/auth/login/google', {
                idToken,
            });

            console.log('Google Login Response:', res.data);

            const user: User = {
                name: res.data.authUser.name,
                email: res.data.authUser.email,
                profileImageUrl: res.data.authUser.profileImageUrl,
                isLoggedIn: true,
            };

            const social: SocialState = {
                type: 'google',
                accessToken: res.data.accessToken,
            };

            const loginPayload: LoginPayload = {
                user,
                accessToken: res.data.accessToken,
                social,
            };

            handleLogin(loginPayload);
        } catch (error) {
            console.error('Google Login failed:', error);
        }
    };

    return handleLoginSuccess;
};
