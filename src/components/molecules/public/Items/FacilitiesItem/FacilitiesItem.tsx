"use client";

import React from "react";
import { TFacilityItem } from "@/types/public/facilityTypes";
import ImageAvatar from "@/components/atoms/public/Avatars/ImageAvatar/ImageAvatar";
import { Hash, MapPin, Text } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CompactRatingFrame from "@/components/molecules/public/Frames/CompactRatingFrame/CompactRatingFrame";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";
import SelectFavoriteOnItemButton from "@/components/atoms/private/user/Buttons/SelectFavoriteOnItemButton/SelectFavoriteOnItemButton";
import { clsx } from "clsx";
import { MIN_PER_SLOT } from "@/utils/constants/titles.constants";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IFacilitiesItem {
  facility: TFacilityItem;
}

const FacilitiesItem: React.FC<IFacilitiesItem> = ({ facility }) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

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
    coveringType,
    facilityType,
    isWorking,
  } = facility;

  return (
    <div
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
                ? `${Math.ceil(avgPrice)} ₴/${MIN_PER_SLOT} ${tTtl("min")}`
                : tTtl("noSchedule")}
            </Badge>
          </div>
        </div>
      </div>
      <div className="grow flex flex-col py-2 gap-y-1 min-w-0">
        <div className="flex items-center justify-between gap-x-6">
          <div className="flex gap-x-1 min-w-0">
            <p className="truncate text-xl">{name}</p>
            {!isWorking && (
              <p className="text-xl italic text-muted-foreground">
                ({tTtl("temporarilyNotWorking")})
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
            <Badge variant="outline">{tTtl(district.name)}</Badge>
          </div>
          <Badge
            variant="outline"
            textClassname="text-ellipsis line-clamp-2 break-words"
            Icon={Text}
          >
            {description}
          </Badge>
          <div className="flex gap-x-1">
            {sportType.map((sport) => (
              <div key={sport}>
                <Badge variant="primary" Icon={Hash}>
                  {tTtl(sport)}
                </Badge>
              </div>
            ))}
          </div>
          <div className="flex gap-x-1">
            <Badge variant="accent" Icon={Hash}>
              {tTtl(facilityType)}
            </Badge>
            <Badge variant="accent" Icon={Hash}>
              {tTtl(coveringType)}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesItem;
