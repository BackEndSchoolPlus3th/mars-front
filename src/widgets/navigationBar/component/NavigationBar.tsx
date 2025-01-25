import { useState } from 'react';
import { logoPath, userPath, pathItemMap } from '../../../shared';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../ui/NavigationBar.module.css';

const NavigationBar: React.FC = () => {
    // 로그인 상태와 사용자 이름 관리
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    const handleLogin = () => {
        setIsLoggedIn(true);
        setUserName('abcdefg');
    };

    // 로그아웃 핸들러
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
    };

    // 유저명 길이 제한
    const formatUserName = (name: string) => {
        const maxLength = 4; // 최대 길이
        return name.length > maxLength
            ? `${name.slice(0, maxLength)}...`
            : name;
    };

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar navbar-expand-lg navbar-light fixed-top" style={{ zIndex: 1050 }}>
            <Container>
                <Navbar.Brand href={pathItemMap['home'].path}>
                    <img
                        alt=""
                        src={logoPath}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
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
                                <img
                                    alt=""
                                    src={userPath}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />
                                <NavDropdown
                                    title={`${formatUserName(userName)}님`}
                                    id="collapsible-nav-dropdown"
                                >
                                    <NavDropdown.Item
                                        href={pathItemMap['myPage'].path}
                                    >
                                        마이페이지
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        href="#action/3.4"
                                        onClick={handleLogout}
                                    >
                                        로그아웃
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        ) : (
                            <Nav className="ms-auto">
                                <a onClick={handleLogin}>로그인</a>
                                <Nav.Link href={pathItemMap['login'].path}>
                                    {pathItemMap['login'].label}
                                </Nav.Link>
                                <Nav.Link href={pathItemMap['signUp'].path}>
                                    {pathItemMap['signUp'].label}
                                </Nav.Link>
                            </Nav>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
