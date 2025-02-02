import axios from "axios";
import TokenService from "./TokenService";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CORE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - 모든 요청에 AccessToken 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - AccessToken 만료 시 RefreshToken으로 갱신
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 에러 처리 (토큰 만료)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = TokenService.getRefreshToken();
        if (!refreshToken) {
          throw new Error("Refresh token not found.");
        }

        // RefreshToken으로 새로운 AccessToken 요청
        const { data } = await axios.post("/api/auth/refresh", {
          refreshToken,
        });

        // 새로운 AccessToken 저장
        TokenService.setAccessToken(data.accessToken);

        // 갱신된 토큰으로 이전 요청 다시 시도
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        TokenService.clearTokens(); // 만료된 토큰 삭제
        window.location.href = "/login"; // 로그인 페이지로 리디렉션
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/me");
    return response.data; // 사용자 정보 반환
  } catch (error) {
    console.error("Failed to fetch user information:", error);
    throw error;
  }
};

export default axiosInstance;
