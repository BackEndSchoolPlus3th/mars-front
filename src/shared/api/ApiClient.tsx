import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_CORE_API_BASE_URL, // 기본 경로 설정
    withCredentials: true, // 쿠키 자동 전송 설정
});

apiClient.interceptors.request.use(
    (config) => {
        // 로그인 필요한 경로는 Access Token 포함
        const requiresAuth = !config.url?.startsWith('/api/public');
        if (requiresAuth) {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// 응답 인터셉터 설정 (Access Token 갱신 시도)
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('Access Token 만료: Refresh Token으로 갱신 시도');
            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
                error.config.headers[
                    'Authorization'
                ] = `Bearer ${newAccessToken}`;
                return apiClient.request(error.config); // 새 토큰으로 다시 요청
            } else {
                console.error('Refresh Token도 만료됨, 로그아웃 필요');
                handleLogout();
            }
        }
        return Promise.reject(error);
    },
);

const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const response = await axios.post(
            '/api/auth/refresh',
            {},
            { withCredentials: true },
        );
        if (response.status === 200) {
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            console.log('Access Token 갱신 성공');
            return accessToken;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Access Token 갱신 중 오류:', error);
        return null;
    }
};

const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
};

export { apiClient, refreshAccessToken };
