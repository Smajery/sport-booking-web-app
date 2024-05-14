"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import React from "react";
import { TFacility } from "@/types/public/facilityTypes";
import { cn } from "@/lib/utils";

interface IClustererMap {
  facilities: TFacility[];
  selectedLocationId: number | null;
  setSelectedLocationId: (value: number) => void;
  className?: string;
}

const ClustererMap: React.FC<IClustererMap> = ({
  facilities,
  selectedLocationId,
  setSelectedLocationId,
  className = "",
}) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const markersRef = React.useRef<Array<google.maps.Marker>>([]);

  const updateMarkers = () => {
    markersRef.current.forEach((marker) => {
      const markerData = marker.get("data");
      const isActive = markerData.uuid === selectedLocationId;
      marker.setAnimation(isActive ? google.maps.Animation.BOUNCE : null);
    });
  };

  React.useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const mapOptions: google.maps.MapOptions = {
        disableDefaultUI: true,
        minZoom: 3,
        center: {
          lat: 0,
          lng: 0,
        },
        zoom: 3,
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      markersRef.current = facilities.map((facility) => {
        const [lat, lng] = facility.location.split(", ").map(Number);
        const position = {
          lat,
          lng,
        };
        const marker = new google.maps.Marker({
          position,
        });

        marker.addListener("click", () => {
          setSelectedLocationId(facility.id);
          map.setCenter(new google.maps.LatLng(lat, lng));
          map.setZoom(10);
        });

        marker.set("data", { lat, lng });

        return marker;
      });

      if (markersRef.current.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markersRef.current.forEach((marker) =>
          bounds.extend(marker.getPosition()),
        );
        map.fitBounds(bounds);
      }

      new MarkerClusterer({ markers: markersRef.current, map });
    };

    initMap();
  }, [facilities]);

  React.useEffect(() => {
    updateMarkers();
  }, [selectedLocationId]);

  return <div className={cn("w-full h-full", className)} ref={mapRef} />;
};

export default ClustererMap;
