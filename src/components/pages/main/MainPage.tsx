import { useState, useEffect } from 'react';
import MapArea from '../../map/MapArea';
import Sidebar from '../../layout/main/sidebar/Sidebar';
import SidebarDetail from '../../layout/main/sideBarDetail/container/SidebarDetailContainer';
import RestaurantDetailContainer from '../../layout/main/restaurantDetail/container/MainRestaurantDetailContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../utils';
import { apiClient } from '../../../api';

const MainPage = () => {
    const [selectedSideMenu, setSelectedSideMenu] = useState('search');
    const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(
        null,
    );
    const user = useSelector((state: RootState) => state.user);
    const [showRestaurantDetail, setshowRestaurantDetail] =
        useState<boolean>(false);
    const [showSidebarDetail, setShowSidebarDetail] = useState<boolean>(true);

    const fetchRefreshToken = async () => {
        try {
            const response = await apiClient.get('/api/jwt/refresh');
            console.log('Refresh Token 요청 결과:', response.data);
        } catch (error) {
            console.error('Refresh Token 요청 오류:', error);
        }
    };

    useEffect(() => {
        if (user.isLoggedIn) {
            fetchRefreshToken();
        }
    }, [user.isLoggedIn]);

    return (
        <div className="flex h-full relative">
            <div className="flex flex-raw w-full h-full">
                <div className="sidebar-container h-full">
                    <Sidebar
                        onMenuSelect={setSelectedSideMenu}
                        setShowSidebarDetail={setShowSidebarDetail}
                        showSidebarDetail={showSidebarDetail}
                    />
                </div>
                <div className="main-map-container max-w-full max-h-full w-full h-full relative">
                    <div className="absolute h-full z-10">
                        <div className="flex flex-raw h-full">
                            {showSidebarDetail && (
                                <div className="flex h-full w-full z-10 p-4">
                                    <SidebarDetail
                                        selectedMenu={selectedSideMenu}
                                        setSelectedRestaurant={
                                            setSelectedRestaurant
                                        }
                                        showRestaurantDetail={
                                            setshowRestaurantDetail
                                        }
                                        setShowSidebarDetail={
                                            setShowSidebarDetail
                                        }
                                    />
                                </div>
                            )}
                            {showRestaurantDetail && (
                                <div className="flex h-full w-full z-10 p-4">
                                    {selectedRestaurant && (
                                        <RestaurantDetailContainer
                                            restaurantId={selectedRestaurant}
                                            showRestaurantDetail={
                                                setshowRestaurantDetail
                                            }
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="absolute w-full h-full z-0">
                        <MapArea
                            setSelectedRestaurant={setSelectedRestaurant}
                            onShowRestaurantDetail={setshowRestaurantDetail}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
