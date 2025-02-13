import { useCallback, useEffect, useRef, useState } from 'react';
import {
    APIProvider,
    type MapCameraChangedEvent,
    Map,
} from '@vis.gl/react-google-maps';
import { userLocationService } from '../../api/services/map/userLocation';
import { RestaurantDetail } from '../../api/types';
import { apiClient } from '../../api';
import Markers from './marker/Markers';
import { nearRestaurant } from '../../api/services/map/nearRestaurant';

interface MapAreaProps {
    setSelectedRestaurant: (id: number) => void;
    onShowRestaurantDetail: (show: boolean) => void;
}

interface MarkerDetail {
    id: number;
    name: string;
    detail: string;
    location: string;
    averageRating: number;
    lat: number;
    lng: number;
}

const MapArea: React.FC<MapAreaProps> = ({
    setSelectedRestaurant,
    onShowRestaurantDetail,
}) => {
    const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

    const [restaurants, setRestaurants] = useState<MarkerDetail[] | null>(null);
    const [currentCenter, setCurrentCenter] = useState({
        lat: 37.5665,
        lng: 126.978,
    });
    const prevCenterRef = useRef(currentCenter);

    const fetchNearRestaurants = async () => {
        const { lat, lng } = prevCenterRef.current;
        const response = await nearRestaurant(lat, lng, 2);
        console.log('주변 식당 데이터 조회:', response);
        setRestaurants(response);
    };

    const calculateDistance = (
        lat1: number,
        lng1: number,
        lat2: number,
        lng2: number,
    ) => {
        const R = 6371e3; // 지구 반지름 (미터)
        const rad = Math.PI / 180;
        const dLat = (lat2 - lat1) * rad;
        const dLng = (lng2 - lng1) * rad;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * rad) *
                Math.cos(lat2 * rad) *
                Math.sin(dLng / 2) *
                Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // 거리 (미터 단위)
    };

    const handleCenterChanged = useCallback((event: MapCameraChangedEvent) => {
        const newCenter = event.detail.center;
        const prevCenter = prevCenterRef.current;

        // 거리 계산 (500m 이상 이동 시 데이터 갱신)
        if (
            calculateDistance(
                prevCenter.lat,
                prevCenter.lng,
                newCenter.lat,
                newCenter.lng,
            ) > 500
        ) {
            console.log('500m 이상 이동하여 데이터 갱신');
            fetchNearRestaurants();
            prevCenterRef.current = newCenter; // 이전 좌표 업데이트
        }

        setCurrentCenter(newCenter);
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
        fetchNearRestaurants();
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
