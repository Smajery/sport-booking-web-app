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
  getDuration,
  getFormattedText,
  getTitle,
} from "@/utils/helpers/text.helpers";
import SelectFavoriteButton from "@/components/atoms/private/user/Buttons/SelectFavoriteButton/SelectFavoriteButton";
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
  } = facility;

  return (
    <li
      className={clsx(
        "relative flex justify-between gap-x-4 p-4 overflow-hidden shadow-md h-[280px] w-[1000px] border-1 border-border rounded-xl cursor-pointer",
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
          <div className="flex justify-end gap-x-1">
            <SelectFavoriteButton
              facilityId={id}
              currentUserIsFavorite={currentUserIsFavorite}
            />
          </div>
          <div className="flex justify-start gap-x-1">
            <Badge variant="background">
              {avgPrice
                ? `~${avgPrice} ₴/${getDuration(minBookingTime)}`
                : "No schedule"}
            </Badge>
          </div>
        </div>
      </div>
      <div className="grow flex flex-col py-2 gap-y-1">
        <div className="flex items-center justify-between gap-x-6">
          <p className="truncate text-xl">{name}</p>
          <CompactRatingFrame avgRating={avgRating} ratingCount={ratingCount} />
        </div>
        <div className="mt-1 flex flex-col gap-y-2">
          <div className="flex items-start gap-x-1">
            <Badge variant="outline" className="gap-x-2">
              <MapPin className="mt-1 w-4 h-4" />
              <p className="text-ellipsis line-clamp-2">{address}</p>
            </Badge>
            <Badge variant="outline">{district.name}</Badge>
          </div>
          <Badge variant="outline" className="gap-x-2">
            <Text className="mt-1 w-4 h-4" />
            <p className="text-ellipsis line-clamp-2">{description}</p>
          </Badge>
          <ul className="flex gap-x-1">
            {sportType.map((sport) => (
              <li key={sport}>
                <Badge variant="primary" className="gap-x-2">
                  <Hash className="mt-[2px] w-4 h-4 shrink-0" color="#FFFFFF" />
                  <p className="truncate">{getTitle(sport)}</p>
                </Badge>
              </li>
            ))}
          </ul>
          <Badge variant="accent" className="gap-x-2">
            <Text className="mt-1 w-4 h-4" />
            <p className="text-ellipsis line-clamp-2">
              {getFormattedText(coveringType)}
            </p>
          </Badge>
        </div>
      </div>
    </li>
  );
};

export default FacilitiesItem;
