"use client";

import React from "react";
import { TFacility } from "@/types/public/facilityTypes";
import ImageAvatar from "@/components/atoms/public/Avatars/ImageAvatar/ImageAvatar";
import { Hash, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";
import { getFormattedText, getTitle } from "@/utils/helpers/text.helpers";
import { clsx } from "clsx";
import CompactRatingFrame from "@/components/molecules/public/Frames/CompactRatingFrame/CompactRatingFrame";
import { MIN_PER_SLOT } from "@/utils/constants/titles.constants";

interface IFavoriteFacilitiesItem {
  facility: TFacility;
}

const FavoriteFacilitiesItem: React.FC<IFavoriteFacilitiesItem> = ({
  facility,
}) => {
  const { push } = useRouter();
  const {
    id,
    name,
    images,
    address,
    sportType,
    avgPrice,
    coveringType,
    isWorking,
    avgRating,
    ratingCount,
    district,
    facilityType,
  } = facility;

  return (
    <div
      className={clsx(
        "p-2 rounded-xl w-[340px] flex flex-col gap-y-4 cursor-pointer",
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
          className="w-full h-[280px] rounded-xl"
        />
        <div className="absolute top-0 left-0 p-2 flex flex-col justify-between w-full h-full">
          <div className="flex items-center justify-between">
            <Badge variant="background" className="text-xl">
              {name}
            </Badge>
            <div className="bg-background rounded-lg px-2 py-1 border border-transparent">
              <CompactRatingFrame
                avgRating={avgRating}
                ratingCount={ratingCount}
              />
            </div>
          </div>
          <div className="flex gap-x-1">
            <Badge variant="background">
              {avgPrice ? `${avgPrice} ₴/${MIN_PER_SLOT} min` : "No schedule"}
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
        <div className="flex gap-x-1">
          {sportType.map((sport) => (
            <div key={sport}>
              <Badge variant="primary" Icon={Hash}>
                {getTitle(sport)}
              </Badge>
            </div>
          ))}
        </div>
        <div className="flex gap-x-1">
          <Badge variant="accent" Icon={Hash}>
            {getFormattedText(facilityType)}
          </Badge>
          <Badge variant="accent" Icon={Hash}>
            {getFormattedText(coveringType)}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default FavoriteFacilitiesItem;
