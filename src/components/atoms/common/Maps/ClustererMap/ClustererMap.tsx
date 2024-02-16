"use client";

import MarkerClusterer from "@google/markerclustererplus";
import {
  GoogleMap as ReactAllLocationsMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { TFacility } from "@/types/public/facilityTypes";

interface IClustererMap {
  facilities: TFacility[];
  isFetchLoading: boolean;
  selectedLocationId: string | null;
  setSelectedLocationId: (value: string) => void;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const zoom = 3;

const options = {
  disableDefaultUI: true,
  minZoom: 3,
};

const center = { lat: 0, lng: 0 };

const ClustererMap: React.FC<IClustererMap> = ({
  facilities,
  isFetchLoading,
  selectedLocationId,
  setSelectedLocationId,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const mapRef = React.useRef<google.maps.Map | null>(null);
  const [markerCluster, setMarkerCluster] =
    React.useState<MarkerClusterer | null>(null);

  const newMarkers = React.useMemo(() => {
    if (!isLoaded || isFetchLoading) return [];

    return facilities.map((facility) => {
      const [lat, lng] = facility.location.split(", ").map(Number);
      const isActive = facility.id === selectedLocationId;
      const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
      });

      marker.addListener("click", () => {
        setSelectedLocationId(facility.id);
      });

      return marker;
    });
  }, [facilities, selectedLocationId, isLoaded, isFetchLoading]);

  const onLoad = React.useCallback(
    function callback(map: google.maps.Map) {
      mapRef.current = map;

      const clusterer = new MarkerClusterer(map, newMarkers, {
        imagePath:
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      });
      setMarkerCluster(clusterer);
    },
    [newMarkers],
  );

  React.useEffect(() => {
    if (!isLoaded || loadError || isFetchLoading || !markerCluster) return;

    markerCluster.clearMarkers();

    markerCluster.addMarkers(newMarkers);

    return () => {
      markerCluster.clearMarkers();
    };
  }, [newMarkers, facilities, markerCluster]);

  if (loadError || !isLoaded || isFetchLoading)
    return <Skeleton className="w-full h-full" />;

  return (
    <ReactAllLocationsMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      options={options}
      onLoad={onLoad}
    />
  );
};

export default ClustererMap;
