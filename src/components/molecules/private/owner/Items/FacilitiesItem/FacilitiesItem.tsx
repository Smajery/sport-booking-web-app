"use client";

import React from "react";
import { TFacility } from "@/types/private/owner/facilityTypes";
import ImageAvatar from "@/components/atoms/public/Avatars/ImageAvatar/ImageAvatar";
import { Hash, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";
import { clsx } from "clsx";
import CompactRatingFrame from "@/components/molecules/public/Frames/CompactRatingFrame/CompactRatingFrame";
import { MIN_PER_SLOT } from "@/utils/constants/titles.constants";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";
import SelectFavoriteOnItemButton from "@/components/atoms/private/user/Buttons/SelectFavoriteOnItemButton/SelectFavoriteOnItemButton";
import FavoritesRatingFrame from "@/components/molecules/public/Frames/FavoritesRatingFrame/FavoritesRatingFrame";

interface IFacilitiesItem {
  facility: TFacility;
}

const FacilitiesItem: React.FC<IFacilitiesItem> = ({ facility }) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const { push } = useRouter();
  const {
    id,
    name,
    images,
    address,
    avgPrice,
    isWorking,
    avgRating,
    ratingCount,
    district,
  } = facility;

  return (
    <div
      className={clsx(
        "w-[560px] flex flex-col gap-y-4 p-4 overflow-hidden shadow-md border border-border rounded-xl cursor-pointer",
        {
          "bg-black/10": !isWorking,
        },
      )}
      onClick={() => push(`${routes.OWNER_FACILITIES}/${id}`)}
    >
      <div className="flex justify-between gap-x-7">
        <ImageAvatar
          image={images.length > 0 ? images[0].image : null}
          imageName={name}
          className="w-[260px] h-[246px] rounded-xl shrink-0"
        />
        <div className="grow flex flex-col pt-2 gap-y-1 min-w-0">
          <p className="truncate text-xl">{name}</p>
          <div className="mt-1 flex flex-col gap-y-2">
            <Badge variant="outline">{tTtl(district.name)}</Badge>
            <Badge variant="outline" Icon={MapPin}>
              {address}
            </Badge>
          </div>
          <p className="text-2xl mx-auto my-auto">
            {avgPrice
              ? `${avgPrice} ₴/${MIN_PER_SLOT} ${tTtl("min")}`
              : tTtl("noSchedule")}
          </p>
        </div>
      </div>
      <FavoritesRatingFrame
        avgRating={avgRating}
        ratingCount={ratingCount}
        className="mx-auto"
      />
    </div>
  );
};

export default FacilitiesItem;
