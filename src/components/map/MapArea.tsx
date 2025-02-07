import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const MapArea: React.FC = () => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const defaultCenter = {
    lat: 37.5665,
    lng: 126.978,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY as string,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="h-full w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
      >
        {/* 마커를 중심 좌표에 표시 */}
        <Marker position={defaultCenter} />
      </GoogleMap>
    </div>
  );
};

export default MapArea;
