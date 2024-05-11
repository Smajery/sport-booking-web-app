"use client";

import React from "react";
import { TFacility } from "@/types/private/owner/facilityTypes";
import ImageAvatar from "@/components/atoms/public/Avatars/ImageAvatar/ImageAvatar";
import { Hash, MapPin, Text } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";
import {
  getFullNameDuration,
  getFormattedText,
  getTitle,
} from "@/utils/helpers/text.helpers";
import { clsx } from "clsx";
import CompactRatingFrame from "@/components/molecules/private/owner/Frames/CompactRatingFrame/CompactRatingFrame";

interface IFacilitiesItem {
  facility: TFacility;
}

const FacilitiesItem: React.FC<IFacilitiesItem> = ({ facility }) => {
  const { push } = useRouter();
  const {
    id,
    name,
    images,
    address,
    sportType,
    avgPrice,
    minBookingTime,
    coveringType,
    isWorking,
    avgRating,
    ratingCount,
  } = facility;

  return (
    <li
      className={clsx("w-[340px] flex flex-col gap-y-4 cursor-pointer")}
      onClick={() => push(`${routes.USER_FACILITIES}/${id}`)}
    >
      <div className="relative">
        <ImageAvatar
          image={images.length > 0 ? images[0].image : null}
          imageName={name}
          className="w-full h-[280px] rounded-xl"
        />
        <div className="absolute top-0 left-0 p-2 flex flex-col justify-between w-full h-full">
          <CompactRatingFrame
            avgRating={avgRating}
            ratingCount={ratingCount}
            className="ml-auto"
          />
          <div className="flex justify-start gap-x-1">
            {isWorking ? (
              <Badge variant="background">
                {avgPrice
                  ? `${avgPrice} ₴/${getFullNameDuration(minBookingTime)}`
                  : "No schedule"}
              </Badge>
            ) : (
              <Badge variant="background">Not working now</Badge>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-1">
          <Badge variant="outline" textClassname="font-medium">
            {name}
          </Badge>
          <Badge variant="outline" Icon={MapPin}>
            {address}
          </Badge>
        </div>
        <ul className="flex gap-x-1">
          {sportType.map((sport) => (
            <li key={sport}>
              <Badge variant="primary" Icon={Hash}>
                {getTitle(sport)}
              </Badge>
            </li>
          ))}
        </ul>
        <Badge variant="accent" Icon={Text}>
          {getFormattedText(coveringType)}
        </Badge>
      </div>
    </li>
  );
};

export default FacilitiesItem;
