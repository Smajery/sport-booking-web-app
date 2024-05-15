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
import CompactRatingFrame from "@/components/molecules/public/Frames/CompactRatingFrame/CompactRatingFrame";

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
    district,
  } = facility;

  return (
    <li
      className={clsx(
        "p-2 rounded-xl w-[340px] flex flex-col gap-y-4 cursor-pointer",
        {
          "bg-border": !isWorking,
        },
      )}
      onClick={() => push(`${routes.USER_FACILITIES}/${id}`)}
    >
      <div className="relative">
        <ImageAvatar
          image={images.length > 0 ? images[0].image : null}
          imageName={name}
          className="w-full h-[280px] rounded-xl"
        />
        <div className="absolute top-0 left-0 p-2 flex flex-col justify-between w-full h-full">
          <div className="flex items-center justify-between">
            <Badge variant="background" className="truncate text-xl">
              {name}
            </Badge>
            <div className="bg-background rounded-lg px-2 py-1 border border-transparent">
              <CompactRatingFrame
                avgRating={avgRating}
                ratingCount={ratingCount}
              />
            </div>
          </div>
          <div className="flex justify-start gap-x-1">
            <Badge variant="background">
              {avgPrice
                ? `${avgPrice} ₴/${getFullNameDuration(minBookingTime)}`
                : "No schedule"}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-start gap-x-1">
          <Badge variant="outline" Icon={MapPin}>
            {address}
          </Badge>
          <Badge variant="outline">{district.name}</Badge>
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
