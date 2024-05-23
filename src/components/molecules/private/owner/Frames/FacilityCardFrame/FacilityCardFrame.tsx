"use client";

import React from "react";
import MultiImageAvatar from "@/components/atoms/public/Avatars/MultiImageAvatar/MultiImageAvatar";
import RatingFrame from "@/components/molecules/public/Frames/RatingFrame/RatingFrame";
import { Separator } from "@/components/ui/separator";
import { getFormattedText, getTitle } from "@/utils/helpers/text.helpers";
import { Button } from "@/components/ui/button";
import { TFacility } from "@/types/private/owner/facilityTypes";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";
import { TIME_PER_SLOT } from "@/utils/constants/titles.constants";

interface IFacilityCardFrame {
  facility: TFacility;
}

const FacilityCardFrame: React.FC<IFacilityCardFrame> = ({ facility }) => {
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
                {address}, {district.name} district
              </p>
            </div>
            <RatingFrame avgRating={avgRating} ratingCount={ratingCount} />
          </div>
          <Separator />
          <div className="flex gap-x-4">
            <div className="flex flex-col text-muted-foreground text-lg font-light">
              <p>Sport:</p>
              <p>Facility:</p>
              <p>Covering:</p>
            </div>
            <div className="flex flex-col text-lg">
              <div className="flex gap-x-1">
                {sportType.map((sport, index) => (
                  <div key={sport}>
                    <p>
                      {getTitle(sport)}
                      {isComma(index, sportType.length) && ","}
                    </p>
                  </div>
                ))}
              </div>
              <p>{getTitle(facilityType)}</p>
              <p>{getFormattedText(coveringType)}</p>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-lg">{description}</p>
          </div>
        </div>
        <div className="flex items-end flex-col gap-y-2 shrink-0">
          {avgPrice ? (
            <div className="flex items-end flex-col gap-y-2 shrink-0">
              <p className="text-xl font-light">
                {avgPrice ?? 0} UAH{" "}
                <span className="text-muted-foreground text-lg">
                  /{TIME_PER_SLOT}
                </span>
              </p>
              <Button
                variant="none"
                size="lg"
                className="variant-gradient"
                onClick={() =>
                  push(`${routes.USER_FACILITIES}/${id}/${routes.SCHEDULE}`)
                }
              >
                Show schedule
              </Button>
            </div>
          ) : (
            <Button
              variant="none"
              size="lg"
              className="variant-gradient"
              onClick={() =>
                push(
                  `${routes.USER_FACILITIES}/${id}/${routes.SCHEDULE_CREATE}`,
                )
              }
            >
              Create schedule
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilityCardFrame;
