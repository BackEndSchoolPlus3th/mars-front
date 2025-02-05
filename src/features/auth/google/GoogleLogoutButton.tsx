import { googleLogout } from '@react-oauth/google';

const GoogleLogoutButton = () => {
    const handleLogout = () => {
        googleLogout();
    };

    return <button onClick={handleLogout}>Google 로그아웃</button>;
};

export default GoogleLogoutButton;
