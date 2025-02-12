import { useCallback, useEffect, useState } from 'react';
import {
    APIProvider,
    type MapCameraChangedEvent,
    Map,
} from '@vis.gl/react-google-maps';
import { userLocationService } from '../../api/services/map/userLocation';
import { RestaurantDetail } from '../../api/types';
import { apiClient } from '../../api';
import Markers from './marker/Markers';

interface MapAreaProps {
    setSelectedRestaurant: (id: number) => void;
    onShowRestaurantDetail: (show: boolean) => void;
}

const MapArea: React.FC<MapAreaProps> = ({
    setSelectedRestaurant,
    onShowRestaurantDetail,
}) => {
    const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

    const [restaurants, setRestaurants] = useState<RestaurantDetail[] | null>(
        null,
    );
    const [currentCenter, setCurrentCenter] = useState({
        lat: 37.5665,
        lng: 126.978,
    });
    const fetchRestaurantsData = async () => {
        try {
            const response = await apiClient.get<RestaurantDetail[]>(
                '/api/v1/restaurant/',
            );
            console.log('맵 식당 데이터 조회:', response.data.data.restaurants);
            setRestaurants(response.data.data.restaurants);
        } catch (error) {
            console.error('식당 데이터 조회 실패:', error);
        }
    };

    const handleCenterChanged = useCallback((event: MapCameraChangedEvent) => {
        setCurrentCenter(event.detail.center);
    }, []);

    useEffect(() => {
        const fetchLocation = async () => {
            const location = await userLocationService.getUserLocation();
            setCurrentCenter({
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude),
            });
        };
        fetchLocation();
        fetchRestaurantsData();
    }, []);

    return (
        <div className="h-full w-full">
            <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
                <Map
                    mapId={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
                    style={{ width: '100%', height: '100%' }}
                    center={currentCenter}
                    defaultZoom={15}
                    reuseMaps
                    disableDefaultUI
                    onCameraChanged={handleCenterChanged}
                >
                    {restaurants?.map((restaurant) => {
                        return (
                            <Markers
                                key={restaurant.id}
                                restaurant={restaurant}
                                setSelectedRestaurant={setSelectedRestaurant}
                                onShowRestaurantDetail={onShowRestaurantDetail}
                            />
                        );
                    })}
                </Map>
            </APIProvider>
        </div>
    );
};

export default MapArea;
