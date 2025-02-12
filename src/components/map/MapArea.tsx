import {
    APIProvider,
    type MapCameraChangedEvent,
    Marker,
    Map as ReactGoogleMaps,
} from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useState } from 'react';
import { userLocationService } from '../../api/services/map/userLocation';

const MapArea: React.FC = () => {
    const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

    const [currentCenter, setCurrentCenter] = useState({
        lat: 37.5665,
        lng: 126.978,
    });

    const containerStyle = {
        width: '100%',
        height: '100%',
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
    }, []);

    return (
        <div className="h-full w-full">
            <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
                <ReactGoogleMaps
                    style={containerStyle}
                    center={currentCenter}
                    defaultZoom={15}
                    reuseMaps
                    disableDefaultUI
                    onCameraChanged={handleCenterChanged}
                >
                    <Marker
                        key="marker"
                        position={currentCenter}
                        clickable={false}
                    />
                </ReactGoogleMaps>
            </APIProvider>
        </div>
    );
};

export default MapArea;
