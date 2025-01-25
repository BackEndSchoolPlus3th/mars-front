import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 인가코드 가져오기
    const code = new URL(window.location.href).searchParams.get('code');

    const sendCodeToBackend = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/kakao/login', {
          code: code,
        });

        console.log('백엔드 응답:', response.data);

        // 백엔드에서 받은 사용자 정보 로컬 스토리지 저장
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);

        // 로그인 성공 후 이동할 페이지로 리디렉션
        navigate('/home');
      } catch (error) {
        console.error('로그인 처리 중 오류 발생:', error);
        navigate('/login');
      }
    };

    if (code) {
      sendCodeToBackend();
    }
  }, [navigate]);

  return (
    <div className="LoginHandler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoginHandler;
