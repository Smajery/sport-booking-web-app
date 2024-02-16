"use client";

import React from "react";
import { TFacility } from "@/types/public/facilityTypes";
import DefaultImageAvatar from "@/components/atoms/common/Avatars/DefaultImageAvatar/DefaultImageAvatar";
import { Hash, Heart, Home, Map, Text, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import AvgRatingFrame from "@/components/molecules/common/Frames/AvgRatingFrame/AvgRatingFrame";

interface IFacilitiesItem {
  facility: TFacility;
}

const FacilitiesItem: React.FC<IFacilitiesItem> = ({ facility }) => {
  const {
    name,
    images,
    description,
    address,
    avgRating,
    ratingCount,
    sportType,
    district,
  } = facility;

  const [isFavoriteHovered, setIsFavoriteHovered] =
    React.useState<boolean>(false);

  return (
    <li className="relative flex justify-between gap-x-unit-4 p-unit-4 overflow-hidden shadow-md h-[260px] w-[1000px] primary-gradient-225 rounded-xl ">
      <div className="relative">
        <DefaultImageAvatar
          image={images.length > 0 ? images[0].image : null}
          imageName={name}
          className="w-[260px] h-full rounded-xl shrink-0"
        />
        <div className="absolute top-0 left-0 p-unit-2 flex flex-col justify-between w-full h-full">
          <div className="flex justify-end gap-x-unit-1">
            <Button
              variant="none"
              size="none"
              asChild
              className="cursor-pointer"
              onMouseEnter={() => setIsFavoriteHovered(true)}
              onMouseLeave={() => setIsFavoriteHovered(false)}
            >
              {isFavoriteHovered ? (
                <Image
                  width="24"
                  height="24"
                  src="/icons/favorite.svg"
                  alt="Favotire"
                />
              ) : (
                <Image
                  width="24"
                  height="24"
                  src="/icons/not_favorite.svg"
                  alt="Not favotire"
                />
              )}
            </Button>
          </div>
          <div className="flex justify-start gap-x-unit-1">
            <Badge variant="background">200 hr/hour</Badge>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-x-unit-4 w-full">
        <div className="flex flex-col py-unit-2 gap-y-unit-1">
          <Badge variant="background" className="gap-x-unit-6">
            <p className="truncate text-xl font-semibold">{name}</p>
            <AvgRatingFrame avgRating={avgRating} ratingCount={ratingCount} />
          </Badge>
          <div className="mt-unit-1 flex flex-col gap-y-unit-1">
            <div className="flex items-start gap-x-unit-1">
              <Badge className="gap-x-unit-2">
                <Home className="mt-unit-1 w-unit-4 h-unit-4" color="#FFFFFF" />
                <p className="text-ellipsis line-clamp-2">{address}</p>
              </Badge>
              <Badge>{district}</Badge>
            </div>
            <Badge variant="accent" className="gap-x-unit-2">
              <Text className="mt-unit-1 w-unit-4 h-unit-4" color="#FFFFFF" />
              <p className="text-ellipsis line-clamp-2">{description}</p>
            </Badge>
            <Badge variant="secondary" className="gap-x-unit-2">
              <Hash
                className="mt-[2px] w-unit-4 h-unit-4 shrink-0"
                color="#FFFFFF"
              />
              <p className="truncate">{sportType}</p>
            </Badge>
          </div>
        </div>
        <div className="flex flex-col gap-y-unit-1">
          <div className="flex flex-col items-end gap-y-unit-1">
            <Button variant="none" size="none" className="gap-x-unit-1">
              View
              <View className="w-unit-6 h-unit-6" color="#040C11" />
            </Button>
            <Button variant="none" size="none" className="gap-x-unit-1">
              Map
              <Map className="w-unit-6 h-unit-6" color="#040C11" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default FacilitiesItem;
