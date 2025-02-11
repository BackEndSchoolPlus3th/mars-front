import { useState, useEffect } from 'react';
import MapArea from '../../map/MapArea';
// import RestaurantDetail from '../restaurantDetail/RestaurantDetail';
// import RecommendedRestaurants from '../recommendedRestaurants/RecommendedRestaurantsPage';
// import SideBar from '../../layout/main/sidebar/Sidebar';
import { apiClient } from '../../../api';
import Sidebar from '../../layout/main/sidebar/Sidebar';
import SidebarDetail from '../../layout/main/sideBarDetail/container/SidebarDetailContainer';

const MainPage = () => {
    const [selectedSideMenu, setSelectedSideMenu] = useState('search');
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const fetchRefreshToken = async () => {
        try {
            const response = await apiClient.get('/api/jwt/refresh');
            console.log('Refresh Token 요청 결과:', response.data);
        } catch (error) {
            console.error('Refresh Token 요청 오류:', error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            fetchRefreshToken();
        }
    }, []);

    return (
        <div className="flex h-full relative">
            <div className="flex flex-raw w-full h-full">
                <div className="sidebar-container h-full">
                    <Sidebar onMenuSelect={setSelectedSideMenu} />
                </div>
                <div className="main-map-container max-w-full max-h-full w-full h-full relative">
                    <div className="absolute h-full z-10">
                        <div className="flex h-full w-full z-10  p-4">
                            <SidebarDetail selectedMenu={selectedSideMenu} />
                        </div>
                    </div>
                    <div className="absolute w-full h-full z-0">
                        <MapArea />
                    </div>
                </div>
            </div>
            {/* <div className="flex-1 overflow-y-auto">
                <RecommendedRestaurants />
            </div> */}
            {/* {selectedRestaurant && (
                <div className="fixed right-0 top-[73px] h-full">
                    <RestaurantDetail
                        restaurant={selectedRestaurant}
                        onClose={() => setSelectedRestaurant(null)}
                    />
                </div>
            )} */}
        </div>
    );
};

export default MainPage;
