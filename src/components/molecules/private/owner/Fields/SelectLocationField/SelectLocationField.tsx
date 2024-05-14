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

    const initialCenter = { lat: 50.4501, lng: 30.5234 };
    const mapOptions: google.maps.MapOptions = {
      disableDefaultUI: true,
      zoom: 13,
      center: initialCenter,
    };

    const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
    const marker = new Marker({
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
    ></FormField>
  );
};

export default SelectLocationField;
