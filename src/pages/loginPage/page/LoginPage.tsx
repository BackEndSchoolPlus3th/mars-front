/*global Kakao*/
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoPath } from '../../../shared';
import '../ui/loginPageStyle.css';

const KakaoLoginButton = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init('39851524d209502191c1f4ab7da1885c');
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_token: authObj.access_token,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('백엔드 로그인 성공', data);
          })
          .catch((error) => {
            console.error('로그인 오류', error);
          });
      },
      fail: function (error) {
        console.error('카카오 로그인 실패', error);
      },
    });
  };

  return (
    <img
      src="https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBcX6wYOjOFZaAfhmaS_qZ1FVPHfdui.5HuBGyop8__579sxOqlLvEujryqUaobxN2G1sE09XJfKAZwtAwOvv8Nc-&format=source"
      alt="Kakao Login"
      onClick={handleKakaoLogin}
      className="social-login-icon"
    />
  );
};

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className={'auth-container'}>
      <img src={logoPath} alt="ComMars Logo" className="logo" />
      <h1>ComMars</h1>
      <div className="auth-box">
        <p>소셜 계정으로 로그인</p>
        <div className="social-login">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            alt="Naver Login"
            className="social-login-icon"
          />
          <img
            src="https://play-lh.googleusercontent.com/jYtnK__ibJh9emODIgTyjZdbKym1iAj4RfoVhQZcfbG-DuTSHR5moHVx9CQnqg1yoco9"
            alt="Google Login"
            className="social-login-icon"
          />
          <KakaoLoginButton />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;