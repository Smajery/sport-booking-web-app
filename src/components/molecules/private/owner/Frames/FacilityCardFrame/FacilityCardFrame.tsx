"use client";

import React from "react";
import MultiImageAvatar from "@/components/atoms/public/Avatars/MultiImageAvatar/MultiImageAvatar";
import RatingFrame from "@/components/molecules/public/Frames/RatingFrame/RatingFrame";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TFacility } from "@/types/private/owner/facilityTypes";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";
import { MIN_PER_SLOT } from "@/utils/constants/titles.constants";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IFacilityCardFrame {
  facility: TFacility;
}

const FacilityCardFrame: React.FC<IFacilityCardFrame> = ({ facility }) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);
  const tLbl = useTranslations(namespaces.COMPONENTS_LABELS);

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
    sportType,
    facilityType,
    coveringType,
    avgPrice,
    inventoryPrice,
    inventoryName,
  } = facility;

  const isComma = (index: number, arrayLength: number) => {
    return index < arrayLength - 1;
  };

  return (
    <div className="flex flex-col gap-y-10">
      <MultiImageAvatar
        images={images}
        imagesName={name}
        className="h-[460px] rounded-2xl"
      />
      <div className="flex justify-between">
        <div className="w-[700px] flex flex-col gap-y-5">
          <div className="flex justify-between">
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center justify-between">
                <p className="text-3xl">{name}</p>
              </div>
              <p className="text-lg font-light">
                {address}, {tTtl(district.name)}
              </p>
            </div>
            <RatingFrame avgRating={avgRating} ratingCount={ratingCount} />
          </div>
          <Separator />
          <div className="flex justify-between gap-x-4">
            <div className="flex flex-col text-muted-foreground text-lg font-light">
              <p>{tLbl("sport")}:</p>
              <p>{tLbl("facility")}:</p>
              <p>{tLbl("covering")}:</p>
            </div>
            <div className="flex flex-col items-end text-lg">
              <div className="flex gap-x-1">
                {sportType.map((sport, index) => (
                  <div key={sport}>
                    <p>
                      {tTtl(sport)}
                      {isComma(index, sportType.length) && ","}
                    </p>
                  </div>
                ))}
              </div>
              <p>{tTtl(facilityType)}</p>
              <p>{tTtl(coveringType)}</p>
            </div>
          </div>
          {inventoryPrice && (
            <>
              <Separator />
              <div className="flex justify-between gap-x-4">
                <div className="flex flex-col text-muted-foreground text-lg font-light">
                  <p>{tLbl("inventoryPrice")}:</p>
                  <p>{tLbl("inventoryName")}:</p>
                </div>
                <div className="flex flex-col items-end text-lg">
                  <p>{inventoryPrice} ₴</p>
                  <p>{inventoryName}</p>
                </div>
              </div>
            </>
          )}
          <Separator />
          <p className="text-lg break-words">{description}</p>
        </div>
        <div className="flex items-end flex-col gap-y-2 shrink-0">
          {avgPrice ? (
            <div className="flex items-end flex-col gap-y-2 shrink-0">
              <p className="text-xl font-light">
                {avgPrice ?? 0} {tTtl("uah")}
                <span className="text-muted-foreground text-lg">
                  {`/${MIN_PER_SLOT} ${tTtl("min")}`}
                </span>
              </p>
              <Button
                variant="outlineSecondary"
                size="lg"
                onClick={() =>
                  push(`${routes.OWNER_FACILITIES}/${id}/${routes.SCHEDULE}`)
                }
              >
                {tTtl("showSchedule")}
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="outlineSecondary"
                size="lg"
                onClick={() =>
                  push(
                    `${routes.OWNER_FACILITIES}/${id}/${routes.SCHEDULE_CREATE}`,
                  )
                }
              >
                {tTtl("createSchedule")}
              </Button>
              <p className="text-sm italic text-muted-foreground">
                {tTtl("facilityWithoutScheduleIsNotPublic")}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilityCardFrame;
