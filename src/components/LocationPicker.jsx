import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// Газрын зурагт хэрэгтэй тохиргоонууд
const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "400px",
};
const defaultCenter = {
    lat: 47.918873, // УБ төв цэг
    lng: 106.917077,
};

export default function LocationPicker({
    onLocationSelect,
    markerPosition,
    setMarkerPosition,
    disabled = false,
    className,
}) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, // .env файлд тохируулах
        libraries,
    });

    const handleMapClick = (e) => {
        if (disabled) return;
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setMarkerPosition({ lat, lng });
            onLocationSelect({ lat, lng });
        }
    };

    console.log(markerPosition);

    if (loadError) return <div>Газрын зураг ачаалагдсангүй...</div>;
    if (!isLoaded) return <div>Ачааллаж байна...</div>;

    return (
        <div
            className={`rounded-md overflow-hidden border border-gray-300 ${className}`}
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={markerPosition}
                onClick={handleMapClick}
            >
                {markerPosition && <Marker position={markerPosition} />}
            </GoogleMap>
        </div>
    );
}
