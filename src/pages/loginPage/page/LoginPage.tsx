/* global Kakao */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoPath } from '../../../shared'; // 로고 경로 가져오기
import '../ui/loginPageStyle.css';

const KakaoLoginButton: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init('YOUR_KAKAO_APP_KEY'); // 카카오 앱 키를 여기에 입력
      }
    };
    document.head.appendChild(script);

    // Clean-up: 컴포넌트가 언마운트될 때 스크립트 제거
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      console.error('Kakao SDK가 초기화되지 않았습니다.');
      return;
    }

    window.Kakao.Auth.login({
      success: (authObj: { access_token: string }) => {
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
      fail: (error: any) => {
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

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("로그인 성공!");
        navigate("/");
      } else {
        alert("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  return (
    <div className="auth-container">
      <img src={logoPath} alt="ComMars Logo" className="logo" />
      <h1>ComMars</h1>
      <div className="auth-box">
        <input
          type="text"
          placeholder="아이디 (이메일)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="options">
          <div className="left-options">
          </div>
          <div className="links">
            <Link to="/find-id">아이디 찾기</Link>
            <br />
            <Link to="/find-password">비밀번호 찾기</Link>
          </div>
        </div>
        <button className="login-btn" onClick={handleLogin}>
          로그인
        </button>
        <button
          className="signup-btn"
          onClick={() => navigate('/signup')}
        >
          회원가입
        </button>
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
};

export default LoginPage;
