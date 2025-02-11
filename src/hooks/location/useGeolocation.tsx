import { useEffect, useState } from 'react';

type UseGeolocation = {
    currentLocation: {
        latitude: number;
        longitude: number;
    };
    isNotSupportedGeolocation: boolean;
    isNotHasPermission: boolean;
};

export const useGeolocation = (): UseGeolocation => {
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 37.5665,
        longitude: 126.978,
    });
    const [isNotSupportedGeolocation, setIsNotSupportedGeolocation] =
        useState(false);
    const [isNotHasPermission, setIsNotHasPermission] = useState(false);

    useEffect(() => {
        if (!navigator.geolocation) {
            setIsNotSupportedGeolocation(true);
            return;
        }

        let lastUpdateTime = 0;

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const currentTime = Date.now();
                if (currentTime - lastUpdateTime >= 10000) {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });
                    lastUpdateTime = currentTime;
                }
            },
            (error) => {
                console.error(error);
                setIsNotHasPermission(true);
            },
            {
                enableHighAccuracy: false,
                timeout: Number.POSITIVE_INFINITY,
                maximumAge: 1000 * 10,
            },
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return { currentLocation, isNotSupportedGeolocation, isNotHasPermission };
};
