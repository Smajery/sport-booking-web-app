"use client";

import React from "react";
import { TFacilityItem } from "@/types/public/facilityTypes";
import ImageAvatar from "@/components/atoms/public/Avatars/ImageAvatar/ImageAvatar";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";
import SelectFavoriteOnItemButton from "@/components/atoms/private/user/Buttons/SelectFavoriteOnItemButton/SelectFavoriteOnItemButton";
import { clsx } from "clsx";
import { MIN_PER_SLOT } from "@/utils/constants/titles.constants";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";
import RatingFrame from "@/components/molecules/public/Frames/RatingFrame/RatingFrame";

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
    district,
    currentUserIsFavorite,
    avgPrice,
    isWorking,
  } = facility;

  return (
    <div
      className={clsx(
        "flex justify-between gap-x-7 p-4 overflow-hidden shadow-md h-[280px] w-[1000px] border border-border rounded-xl cursor-pointer",
        {
          "bg-black/10": !isWorking,
        },
      )}
      onClick={() => push(`${routes.FACILITY}/${id}`)}
    >
      <ImageAvatar
        image={images.length > 0 ? images[0].image : null}
        imageName={name}
        className="w-[260px] h-full rounded-xl shrink-0"
      />
      <div className="grow flex flex-col py-2 gap-y-1 min-w-0">
        <div className="flex items-center justify-between gap-x-6 min-w-0">
          <div className="flex gap-x-1 min-w-0">
            <p className="truncate text-xl min-w-0">{name}</p>
            {!isWorking && (
              <p className="text-xl italic text-muted-foreground">
                ({tTtl("temporarilyNotWorking")})
              </p>
            )}
          </div>
          <SelectFavoriteOnItemButton
            facilityId={id}
            currentUserIsFavorite={currentUserIsFavorite}
          />
        </div>
        <div className="mt-1 flex flex-col gap-y-6">
          <div className="flex items-start gap-x-1">
            <Badge variant="outline">{tTtl(district.name)}</Badge>
            <Badge variant="outline" Icon={MapPin}>
              {address}
            </Badge>
          </div>
          <div className="text-ellipsis line-clamp-2 break-words">
            {description}
          </div>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-xl">
            {avgPrice
              ? `${avgPrice} ₴/${MIN_PER_SLOT} ${tTtl("min")}`
              : tTtl("noSchedule")}
          </p>
          <RatingFrame avgRating={avgRating} ratingCount={ratingCount} />
        </div>
      </div>
    </div>
  );
};

export default FacilitiesItem;
