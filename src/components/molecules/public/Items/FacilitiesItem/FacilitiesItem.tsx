"use client";

import React from "react";
import { TFacility } from "@/types/public/facilityTypes";
import ImageAvatar from "@/components/atoms/public/Avatars/ImageAvatar/ImageAvatar";
import { Hash, MapPin, Text } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CompactRatingFrame from "@/components/molecules/public/Frames/CompactRatingFrame/CompactRatingFrame";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";
import {
  getFullNameDuration,
  getFormattedText,
  getTitle,
} from "@/utils/helpers/text.helpers";
import SelectFavoriteOnItemButton from "@/components/atoms/private/user/Buttons/SelectFavoriteOnItemButton/SelectFavoriteOnItemButton";
import { clsx } from "clsx";

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
    currentUserIsFavorite,
    avgPrice,
    minBookingTime,
    coveringType,
    isWorking,
  } = facility;

  return (
    <li
      className={clsx(
        "flex justify-between gap-x-4 p-4 overflow-hidden shadow-md h-[280px] w-[1000px] border border-border rounded-xl cursor-pointer",
        {
          "bg-border": !isWorking,
        },
      )}
      onClick={() => push(`${routes.FACILITY}/${id}`)}
    >
      <div className="relative">
        <ImageAvatar
          image={images.length > 0 ? images[0].image : null}
          imageName={name}
          className="w-[260px] h-full rounded-xl"
        />
        <div className="absolute top-0 left-0 p-2 flex flex-col justify-between w-full h-full">
          <div className="flex items-start justify-end gap-x-1">
            <SelectFavoriteOnItemButton
              facilityId={id}
              currentUserIsFavorite={currentUserIsFavorite}
            />
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
      <div className="grow flex flex-col py-2 gap-y-1">
        <div className="flex items-center justify-between gap-x-6">
          <div className="flex gap-x-1">
            <p className="truncate text-xl">{name} </p>
            {!isWorking && (
              <p className="text-xl italic text-muted-foreground">
                (Temporarily not working)
              </p>
            )}
          </div>
          <CompactRatingFrame avgRating={avgRating} ratingCount={ratingCount} />
        </div>
        <div className="mt-1 flex flex-col gap-y-2">
          <div className="flex items-start gap-x-1">
            <Badge variant="outline" Icon={MapPin}>
              {address}
            </Badge>
            <Badge variant="outline">{district.name}</Badge>
          </div>
          <Badge
            variant="outline"
            textClassname="text-ellipsis line-clamp-2"
            Icon={Text}
          >
            {description}
          </Badge>
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
      </div>
    </li>
  );
};

export default FacilitiesItem;
