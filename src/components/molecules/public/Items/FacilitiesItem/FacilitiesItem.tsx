"use client";

import React from "react";
import { TFacility } from "@/types/public/facilityTypes";
import ImageAvatar from "@/components/atoms/common/Avatars/ImageAvatar/ImageAvatar";
import { Hash, Map, MapPin, Text, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import AvgRatingFrame from "@/components/molecules/common/Frames/AvgRatingFrame/AvgRatingFrame";
import { useRouter } from "next/navigation";
import { ROUTE_FACILITY } from "@/utils/constants/routes.constants";
import { getTitle } from "@/utils/helpers/text.helpers";

interface IFacilitiesItem {
  facility: TFacility;
}

const FacilitiesItem: React.FC<IFacilitiesItem> = ({ facility }) => {
  const { push } = useRouter();
  const {
    id,
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
    <li className="relative flex justify-between gap-x-unit-4 p-unit-4 overflow-hidden shadow-md h-[260px] w-[1000px] border-1 border-border rounded-xl">
      <div className="relative">
        <ImageAvatar
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
            <Badge variant="background">200 ₴/hour</Badge>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-x-unit-4 w-full">
        <div className="flex flex-col py-unit-2 gap-y-unit-1">
          <div className="flex items-center gap-x-unit-6">
            <p className="truncate text-xl">{name}</p>
            <AvgRatingFrame avgRating={avgRating} ratingCount={ratingCount} />
          </div>
          <div className="mt-unit-1 flex flex-col gap-y-unit-1">
            <div className="flex items-start gap-x-unit-1">
              <Badge className="gap-x-unit-2">
                <MapPin
                  className="mt-unit-1 w-unit-4 h-unit-4"
                  color="#FFFFFF"
                />
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
              <p className="truncate">{getTitle(sportType)}</p>
            </Badge>
          </div>
        </div>
        <div className="flex flex-col gap-y-unit-1">
          <div className="flex flex-col items-end gap-y-unit-1">
            <Button
              variant="none"
              size="none"
              className="gap-x-unit-1"
              onClick={() => push(`${ROUTE_FACILITY}/${id}`)}
            >
              View
              <View className="w-unit-6 h-unit-6" color="#040C11" />
            </Button>
            <Button
              variant="none"
              size="none"
              className="gap-x-unit-1"
              disabled
            >
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
