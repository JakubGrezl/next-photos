"use client";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

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

  useEffect(() => {
    // if ("geolocation" in navigator) {
    //   try {
    //     navigator.geolocation.getCurrentPosition(({ coords }) => {
    //       setCenter(coords);
    //     });
    //   } catch (e) {
    //     console.log(e);
    //     let coords = { latitude: 49.728, longitude: 16.068 };
    //     setCenter(coords);
    //   }
    // } else {
    //   let coords = { latitude: 49.728, longitude: 16.068 };
    //   setCenter(coords);
    // }

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
