import '../ui/MainPageStyle.css';
import React, { useState } from 'react';
import { SideBar, SideContainer } from '../../../widgets';
import { apiClient } from '../../../shared';

const MainPage: React.FC = () => {
    const [selectedMenu, setSelectedMenu] = useState('search');

    const fetchRefreshToken = async () => {
        try {
            const response = await apiClient.get('/api/jwt/refresh');
            console.log('Refresh Token 요청 결과:', response.data);
        } catch (error) {
            console.error('Refresh Token 요청 오류:', error);
        }
    };

    React.useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            fetchRefreshToken();
        }
    }, []);

    return (
        <div className="main-page-container w-full h-full">
            <div className="main-content-container flex h-full">
                <div className="side-bar-container">
                    <SideBar onMenuSelect={setSelectedMenu} />
                </div>
                <div className="mt-4 ml-4 mb-4">
                    <SideContainer selectedMenu={selectedMenu} />
                </div>
                <div className="space-container"></div>
            </div>
            <div className="map-container"></div>
        </div>
    );
};

export default MainPage;
