import React, { useEffect, useState } from "react";
import { logoPath } from "../../../shared";
import { useAuth } from "../component/AuthContext"; // AuthContext import
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavigationBar: React.FC = () => {
  const { isLoggedIn, email, login, logout } = useAuth(); // AuthContext에서 상태 가져오기
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로그인 상태 확인 및 업데이트
    fetch("http://localhost:8080/api/users/current-user", { credentials: "include" })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("로그인된 사용자가 없습니다.");
      })
      .then((data) => {
        login(data.email); // 로그인 상태 업데이트
        setLoading(false);
      })
      .catch(() => {
        setLoading(false); // 에러 발생 시 로딩 해제
      });
  }, [login]);

  const handleLogout = () => {
    // 로그아웃 요청
    fetch("http://localhost:8080/api/users/logout", { method: "POST", credentials: "include" })
      .then((response) => {
        if (response.ok) {
          logout(); // 상태 업데이트: 로그아웃
        } else {
          throw new Error("로그아웃 실패");
        }
      })
      .catch(() => {
        alert("로그아웃 중 오류가 발생했습니다.");
      });
  };

  if (loading) return <div>Loading...</div>; // 로딩 중에는 Loading 표시

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar navbar-light">
      <Container>
        <Navbar.Brand href="/">
          <img alt="" src={logoPath} width="30" height="30" className="d-inline-block align-top" />
          {" "}
          Commars
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/recommendation">오늘뭐먹지?</Nav.Link>
            <Nav.Link href="/ranking">인기리뷰어</Nav.Link>
            <Nav.Link href="/community">커뮤니티</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <NavDropdown title={`${email}님`} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/mypage">마이페이지</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#!" onClick={handleLogout}>
                  로그아웃
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link href="/login">로그인</Nav.Link>
                <Nav.Link href="/signup">회원가입</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
