"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { clsx } from "clsx";
import { UseFormReturn } from "react-hook-form";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { TLocale } from "@/navigation";
import { Loader } from "@googlemaps/js-api-loader";
import { Input } from "@/components/ui/input";

interface ISearchAndSelectLocationField {
  form: any;
  name: string;
  labelText?: string;
  noValidate?: boolean;
  className?: string;
}

const SelectLocationField: React.FC<ISearchAndSelectLocationField> = ({
  form,
  name,
  labelText,
  noValidate = false,
  className = "",
}) => {
  const {
    control,
    formState: { isSubmitted },
    setValue,
    watch,
  } = form as UseFormReturn;

  const location = watch(name);

  const locale = useLocale() as TLocale;
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<google.maps.Map>();
  const markerInstance = React.useRef<google.maps.Marker>();

  const onMapClick = React.useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const clickedLatitude = event.latLng.lat();
        const clickedLongitude = event.latLng.lng();

        setValue(name, `${clickedLatitude}, ${clickedLongitude}`);
      }
    },
    [setValue],
  );

  const initMap = React.useCallback(async () => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
      language: locale,
    });

    const { Map } = await loader.importLibrary("maps");
    const { Marker } = await loader.importLibrary("marker");

    // const odessaBounds = {
    //   north: 46.605,
    //   south: 46.358,
    //   west: 30.627,
    //   east: 30.824,
    // };
    // const kyivBounds = {
    //   north: 50.590798,
    //   south: 50.213273,
    //   west: 30.23944,
    //   east: 30.825941,
    // };

    let initialCenter;

    if (location) {
      const [lat, lng] = location.split(", ").map(Number);
      initialCenter = new google.maps.LatLng(lat, lng);
    } else {
      initialCenter = new google.maps.LatLng(50.4501, 30.5234);
    }
    const mapOptions: google.maps.MapOptions = {
      zoom: 13,
      minZoom: 3,
      center: initialCenter,
      mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string,
    };

    const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
    // const bounds = new google.maps.LatLngBounds(
    //   new google.maps.LatLng(odessaBounds.south, odessaBounds.west),
    //   new google.maps.LatLng(odessaBounds.north, odessaBounds.east),
    // );
    //
    // map.fitBounds(bounds);
    const marker = new Marker({
      position: location ? initialCenter : undefined,
      map,
    });

    map.addListener("click", onMapClick);
    marker.addListener("click", () => {
      map.setCenter(marker.getPosition() as google.maps.LatLng);
      map.setZoom(20);
    });

    mapInstance.current = map;
    markerInstance.current = marker;
  }, [locale, onMapClick]);

  React.useEffect(() => {
    if (!mapInstance.current) {
      initMap();
    }
  }, [initMap]);

  React.useEffect(() => {
    if (location && mapInstance.current && markerInstance.current) {
      const [lat, lng] = location.split(", ").map(Number);
      const newCenter = new google.maps.LatLng(lat, lng);
      mapInstance.current.setCenter(newCenter);
      markerInstance.current.setPosition(newCenter);
    }
  }, [location]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { invalid } }) => (
        <FormItem className="space-y-1">
          <div className="flex pr-[50px]">
            {labelText && (
              <FormLabel
                className={clsx("text-lg font-light", {
                  "text-success": !invalid && isSubmitted && !noValidate,
                  "text-destructive": invalid && isSubmitted && !noValidate,
                })}
              >
                {labelText}
              </FormLabel>
            )}
          </div>
          <div className="flex gap-x-5">
            <FormControl>
              <div className={cn("w-full h-full", className)} ref={mapRef} />
            </FormControl>
            <div
              className={clsx(
                "ml-auto shrink-0 flex items-center justify-center text-white w-[30px] h-[30px] rounded-[5px]",
                {
                  "bg-success": field.value,
                  "bg-danger": !field.value,
                },
              )}
            >
              {field.value ? <Check /> : <X />}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectLocationField;
