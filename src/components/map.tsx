"use client";
import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { fetchMarkers } from "@/actions/fetchMarkers";
import type { MetadataWithPhotos } from "@/data/map";
import L from "leaflet";
import Loading from "@/app/loading";

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
  const [metadata, setMetadata] = useState<MetadataWithPhotos[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });

    fetchMarkers().then((data) => {
      setMetadata(data);
    });
  }, []);

  if (center) {
    return (
      <MapContainer className="h-screen">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {metadata
          ? metadata.map((marker) =>
              marker.longitude && marker.latitude
                ? CustomMarker(
                    { latitude: marker.latitude, longitude: marker.longitude },
                    marker.photo.path,
                    marker.photo.title
                  )
                : null
            )
          : null}
        <ChangeView coords={center} />
      </MapContainer>
    );
  } else {
    return <>Loading</>;
  }
}

function CustomMarker(
  position: coordinates,
  path: string,
  title: string | null
) {
  let icon = L.icon({
    iconUrl: path,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
  });

  return (
    <Marker
      position={[position.latitude, position.longitude]}
      icon={icon}
      alt={title ?? "no title"}
      key={position.latitude + position.longitude}
    />
  );
}
