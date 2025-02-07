import axios from "axios";

// 환경변수 로깅 추가
console.log("API 설정 초기화:", {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  environment: import.meta.env.MODE,
});

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터에 로깅 추가
apiClient.interceptors.request.use(
  (config) => {
    console.log("요청 전송:", {
      url: `${config.baseURL}${config.url}`,
      method: config.method,
      headers: config.headers,
    });

    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("인증 토큰 추가됨");
    } else {
      console.log("인증 토큰 없음");
    }
    return config;
  },
  (error) => {
    console.error("요청 인터셉터 에러:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터에 로깅 추가
apiClient.interceptors.response.use(
  (response) => {
    console.log("응답 성공:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  async (error) => {
    console.error("응답 에러:", {
      config: error.config,
      status: error.response?.status,
      data: error.response?.data,
    });

    const originalRequest = error.config;

    // 401 에러이고 refreshToken이 존재할 경우 토큰 재발급 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("토큰 재발급 시도 시작");

      try {
        const response = await apiClient.post("/api/auth/refresh");
        const { accessToken } = response.data;
        console.log("토큰 재발급 성공");

        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("토큰 재발급 실패:", refreshError);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API 요청 성공/실패 모니터링
apiClient.interceptors.response.use(
  (response) => {
    const requestTime = new Date().toISOString();
    console.log(`API 요청 성공 [${requestTime}]:`, {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
    });
    return response;
  },
  (error) => {
    const requestTime = new Date().toISOString();
    console.error(`API 요청 실패 [${requestTime}]:`, {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export default apiClient;
