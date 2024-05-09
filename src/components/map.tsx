"use client";
import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { fetchMarkers } from "@/actions/fetchMarkers";
import type { MetadataWithPhotos } from "@/data/map";
import L from "leaflet";
import Loading from "@/app/loading";
import Link from "next/link";
import MarkerClusterGroup from "react-leaflet-cluster";

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
        <MarkerClusterGroup>
          {metadata
            ? metadata.map((marker) =>
                marker.longitude && marker.latitude
                  ? CustomMarker(
                      {
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                      },
                      marker.photo.path,
                      marker.photo.title,
                      marker.photo.id
                    )
                  : null
              )
            : null}
        </MarkerClusterGroup>
        <ChangeView coords={center} />
      </MapContainer>
    );
  } else {
    return <Loading />;
  }
}

function CustomMarker(
  position: coordinates,
  path: string,
  title: string | null,
  pid: string
) {
  let icon = L.icon({
    iconUrl: path,
    iconRetinaUrl: path,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
  });

  return (
    <Link href={`/photo?id=${pid}`} className="z-50">
      <Marker
        position={[position.latitude, position.longitude]}
        icon={icon}
        alt={title ?? "no title"}
        key={position.latitude + position.longitude}
        eventHandlers={{
          click: (e) => {
            window.location.href = `/photo?id=${pid}`;
          },
        }}
      />
    </Link>
  );
}
