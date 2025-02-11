import {
    APIProvider,
    type MapCameraChangedEvent,
    Marker,
    Map as ReactGoogleMaps,
} from '@vis.gl/react-google-maps';
import { useCallback, useState } from 'react';
import { useGeolocation } from '../../../hooks/location/useGeolocation';
import './MapArea.css';

const MapArea: React.FC = () => {
    const { currentLocation, isNotSupportedGeolocation, isNotHasPermission } =
        useGeolocation();
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

    if (!isNotSupportedGeolocation && !isNotHasPermission) {
        setCurrentCenter({
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
        });
    }

    return (
        <div className="h-full w-full">
            <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
                <ReactGoogleMaps
                    style={containerStyle}
                    defaultCenter={currentCenter}
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
