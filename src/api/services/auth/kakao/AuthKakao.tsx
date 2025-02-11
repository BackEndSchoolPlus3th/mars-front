import apiClient from '../../../apiClient'

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
/**
 * 카카오 로그인 함수
 * 카카오 로그인은 별도의 state 값 없이 인증 URL로 바로 리다이렉트
 */
export const AuthKakao = () => {
  const handleLogin = async () => {
    try {
      // 카카오 OAuth 인증 URL 생성 (state 파라미터 없이)
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;
      // 생성된 URL로 리다이렉트합니다.
      window.location.href = kakaoAuthUrl;
      
    } catch (error) {
      console.error('카카오 로그인 처리 중 오류 발생:', error);
    }
  };

  return handleLogin;
};

