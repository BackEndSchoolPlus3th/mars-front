import React, { useCallback, useState } from 'react';
import { RestaurantDetail } from '../../../api/types';
import {
    useAdvancedMarkerRef,
    AdvancedMarker,
    InfoWindow,
} from '@vis.gl/react-google-maps';

interface MarkerProps {
    restaurant: RestaurantDetail;
}

const Markers: React.FC<MarkerProps> = ({ restaurant }) => {
    const [markerRef, setMarkerRef] = useAdvancedMarkerRef();
    const [showWindow, setShowWindow] = useState<boolean>(false);

    const handleMarkerMouseOver = useCallback(() => setShowWindow(true), []);
    const handleMarkerMouseOut = useCallback(() => setShowWindow(false), []);

    return (
        <div>
            <AdvancedMarker
                key={restaurant.id}
                position={{ lat: restaurant.lat, lng: restaurant.lng }}
                ref={markerRef}
                onMouseEnter={handleMarkerMouseOver}
                onMouseLeave={handleMarkerMouseOut}
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
                            <p>{restaurant.details}</p>
                        </div>
                    }
                ></InfoWindow>
            )}
        </div>
    );
};

export default Markers;
