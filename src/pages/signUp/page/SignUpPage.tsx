import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoPath } from "../../../shared";
import "../ui/SignUpPageStyle.css";

const SignupPage: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        alert("회원가입 실패: " + (await response.text()));
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  return (
    <div className="auth-container">
      <img src={logoPath} alt="ComMars Logo" className="logo" />
      <h1>회원가입</h1>
      <div className="auth-box">
        <input type="email" name="email" placeholder="이메일" onChange={handleChange} />
        <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="비밀번호 확인" onChange={handleChange} />
        <input type="text" name="name" placeholder="이름" onChange={handleChange} />
        <input type="text" name="gender" placeholder="성별" onChange={handleChange} />
        <button className="signup-btn" onClick={handleSignup}>회원가입</button>
        <p>이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
      </div>
    </div>
  );
};

export default SignupPage;
