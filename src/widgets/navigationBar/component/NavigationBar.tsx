import React, { useEffect, useState } from 'react';
import { logoPath, userPath, pathItemMap } from '../../../shared';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../ui/NavigationBar.module.css';

const NavigationBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // 현재 사용자 정보 가져오기
    fetch('http://localhost:8080/api/users/current-user', {
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('로그인된 사용자가 없습니다.');
        }
      })
      .then((data) => {
        setIsLoggedIn(true);
        setUserName(data.name);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUserName('');
      });
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        alert('로그아웃되었습니다.');
        setIsLoggedIn(false);
        setUserName('');
      }
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  const formatUserName = (name: string) => {
    const maxLength = 4;
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar navbar-light">
      <Container>
        <Navbar.Brand href={pathItemMap['home'].path}>
          <img alt="" src={logoPath} width="30" height="30" className="d-inline-block align-top" />{' '}
          Commars
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={pathItemMap['recommend'].path}>
              {pathItemMap['recommend'].label}
            </Nav.Link>
            <Nav.Link href={pathItemMap['ranking'].path}>
              {pathItemMap['ranking'].label}
            </Nav.Link>
            <Nav.Link href={pathItemMap['community'].path}>
              {pathItemMap['community'].label}
            </Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Nav className="ms-auto">
                <img alt="" src={userPath} width="30" height="30" className="d-inline-block align-top" />
                <NavDropdown title={`${formatUserName(userName)}님`} id="collasible-nav-dropdown">
                  <NavDropdown.Item href={pathItemMap['myPage'].path}>마이페이지</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#!" onClick={handleLogout}>
                    로그아웃
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <Nav.Link href={pathItemMap['login'].path}>로그인</Nav.Link>
                <Nav.Link href={pathItemMap['signUp'].path}>회원가입</Nav.Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
