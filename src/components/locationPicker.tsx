import React from "react";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

interface LocationMarkerProps {
  position: [number, number];
  setPosition: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const LocationMarker = ({ position, setPosition }: LocationMarkerProps) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return (
    <Marker position={position}>
      <Popup>You clicked here.</Popup>
    </Marker>
  );
};

const LocationPicker = () => {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const [zoom, setZoom] = useState<number>(13);

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker position={position} setPosition={setPosition} />
    </MapContainer>
  );
};

export default LocationPicker;
