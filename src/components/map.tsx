"use client";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useCurrentUser } from "@/hooks/use-current-user";

type coordinates = {
  latitude: number;
  longitude: number;
};

export function ChangeView({ coords }: { coords: coordinates }) {
  const map = useMap();
  map.setView([coords.latitude, coords.longitude], 15);
  return null;
}

export default function Map() {
  const [center, setCenter] = useState<coordinates>();

  const user = useCurrentUser();

  useEffect(() => {
    navigator.geolocation.watchPosition(
      function (position) {
        setCenter(position.coords);
      },
      function (error) {
        if (error.code == error.PERMISSION_DENIED) {
          let coords = { latitude: 49.728, longitude: 16.068 };
          setCenter(coords);
        }
      }
    );
  }, []);

  if (center) {
    return (
      <MapContainer style={{ height: "100vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ChangeView coords={center} />
      </MapContainer>
    );
  }
}
