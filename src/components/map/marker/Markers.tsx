import React, { useCallback, useState } from 'react';
import { RestaurantDetail } from '../../../api/types';
import {
    useAdvancedMarkerRef,
    AdvancedMarker,
    InfoWindow,
} from '@vis.gl/react-google-maps';

interface MarkerDetail {
    id: number;
    name: string;
    detail: string;
    location: string;
    averageRating: number;
    lat: number;
    lng: number;
}

interface MarkerProps {
    restaurant: MarkerDetail;
    setSelectedRestaurant: (id: number) => void;
    onShowRestaurantDetail: (show: boolean) => void;
}

const Markers: React.FC<MarkerProps> = ({
    restaurant,
    setSelectedRestaurant,
    onShowRestaurantDetail,
}) => {
    const [markerRef, setMarkerRef] = useAdvancedMarkerRef();
    const [showWindow, setShowWindow] = useState<boolean>(false);

    const handleMarkerMouseOver = useCallback(() => setShowWindow(true), []);
    const handleMarkerMouseOut = useCallback(() => setShowWindow(false), []);
    const handleMarkerClick = useCallback(() => {
        setSelectedRestaurant(restaurant.id);
        onShowRestaurantDetail(true);
    }, []);

    return (
        <div>
            <AdvancedMarker
                key={restaurant.id}
                position={{ lat: restaurant.lat, lng: restaurant.lng }}
                ref={markerRef}
                onMouseEnter={handleMarkerMouseOver}
                onMouseLeave={handleMarkerMouseOut}
                onClick={handleMarkerClick}
            />
            {showWindow && (
                <InfoWindow
                    anchor={setMarkerRef}
                    position={{ lat: restaurant.lat, lng: restaurant.lng }}
                    onCloseClick={handleMarkerMouseOut}
                    disableAutoPan={true}
                    children={
                        <div>
                            <h1>{restaurant.name}</h1>
                            <p>{restaurant.detail}</p>
                            <p>{restaurant.averageRating}</p>
                        </div>
                    }
                ></InfoWindow>
            )}
        </div>
    );
};

export default Markers;
