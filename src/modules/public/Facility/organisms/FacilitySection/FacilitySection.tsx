"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ONE_FACILITY_QUERY } from "@/apollo/query/public/facility";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { TFacility } from "@/types/public/facilityTypes";
import { Separator } from "@/components/ui/separator";
import MultiImageAvatar from "@/components/atoms/public/Avatars/MultiImageAvatar/MultiImageAvatar";
import { getFormattedText, getTitle } from "@/utils/helpers/text.helpers";
import RatingFrame from "@/components/molecules/public/Frames/RatingFrame/RatingFrame";
import BookButton from "@/components/atoms/public/Buttons/BookButton/BookButton";
import SelectFavoriteOnPageButton from "@/components/atoms/private/user/Buttons/SelectFavoriteOnPageButton/SelectFavoriteOnPageButton";
import ShareOnPageButton from "@/components/atoms/private/user/Buttons/ShareOnPageButton/ShareOnPageButton";
import { TIME_PER_SLOT } from "@/utils/constants/titles.constants";
import { clsx } from "clsx";
import PhoneLink from "@/components/atoms/public/Links/PhoneLink/PhoneLink";
import { Phone } from "lucide-react";

interface IFacilitySection {
  facilityId: number;
}

const FacilitySection: React.FC<IFacilitySection> = ({ facilityId }) => {
  const { data, loading, error } = useQuery(GET_ONE_FACILITY_QUERY, {
    context: {
      authRequired: true,
    },
    variables: {
      id: facilityId,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{getApolloErrorMessage(error)}</div>;

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
    currentUserIsFavorite,
    avgPrice,
    isWorking,
    owner,
  } = data.facility as TFacility;

  const isComma = (index: number, arrayLength: number) => {
    return index < arrayLength - 1;
  };

  return (
    <section className="w-full flex flex-col pt-[40px] gap-y-10">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-end gap-x-2">
          <ShareOnPageButton />
          <SelectFavoriteOnPageButton
            currentUserIsFavorite={currentUserIsFavorite}
            facilityId={id}
          />
        </div>
        <MultiImageAvatar
          images={images}
          imagesName={name}
          className="h-[460px] rounded-2xl"
        />
      </div>
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
          <Separator />
          <div className="mr-auto flex flex-col border border-border rounded-xl gap-y-2 p-4">
            <div className="flex gap-x-2 items-center">
              <p className="text-lg font-light">Contact the organization</p>
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex gap-x-4">
              <div className="flex flex-col text-muted-foreground text-lg font-light">
                <p>Phone number:</p>
              </div>
              <div className="flex flex-col text-lg font-light">
                <PhoneLink phone={owner.userOwner.phone} />
              </div>
            </div>
          </div>
        </div>
        {avgPrice && (
          <div className="flex items-end flex-col gap-y-2 shrink-0">
            <p className="text-xl font-light">
              {avgPrice} UAH{" "}
              <span className="text-muted-foreground text-lg">
                /{TIME_PER_SLOT}
              </span>
            </p>
            <BookButton facilityId={id} disabled={!isWorking} />
            {!isWorking && (
              <p className="text-sm italic text-muted-foreground">
                Temporarily not working
              </p>
            )}
          </div>
        )}
      </div>
      <Separator />
    </section>
  );
};

export default FacilitySection;
