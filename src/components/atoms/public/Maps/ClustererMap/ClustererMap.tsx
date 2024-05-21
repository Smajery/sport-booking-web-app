"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import React from "react";
import { TFacility } from "@/types/public/facilityTypes";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { TLocale } from "@/navigation";

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
  const locale = useLocale() as TLocale;

  const mapRef = React.useRef<HTMLDivElement>(null);
  const markersRef = React.useRef<Array<google.maps.Marker>>([]);
  const mapInstance = React.useRef<google.maps.Map>();

  const initMap = React.useCallback(async () => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
      language: locale,
    });

    const { Map } = await loader.importLibrary("maps");
    const { Marker } = await loader.importLibrary("marker");

    const mapOptions: google.maps.MapOptions = {
      zoom: 3,
      minZoom: 3,
      center: new google.maps.LatLng(0, 0),
      mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string,
    };

    const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
    mapInstance.current = map;

    const bounds = new google.maps.LatLngBounds();

    markersRef.current = facilities.map((facility) => {
      const [lat, lng] = facility.location.split(", ").map(Number);
      const position = new google.maps.LatLng(lat, lng);
      const marker = new Marker({
        position,
        map,
        title: facility.name,
      });

      marker.set("data", {
        id: facility.id,
      });

      marker.addListener("click", () => {
        setSelectedLocationId(facility.id);
        map.setCenter(marker.getPosition() as google.maps.LatLng);
        map.setZoom(15);
      });

      bounds.extend(position);
      return marker;
    });

    map.fitBounds(bounds);

    new MarkerClusterer({ markers: markersRef.current, map });
  }, [facilities, setSelectedLocationId]);

  React.useEffect(() => {
    if (!mapInstance.current) {
      initMap();
    }
  }, [initMap]);

  return <div className={cn("w-full h-full", className)} ref={mapRef} />;
};

export default ClustererMap;
