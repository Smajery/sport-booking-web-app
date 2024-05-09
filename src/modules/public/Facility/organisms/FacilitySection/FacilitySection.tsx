"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ONE_FACILITY_QUERY } from "@/apollo/query/public/facility";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { TFacility } from "@/types/public/facilityTypes";
import { Separator } from "@/components/ui/separator";
import MultiImageAvatar from "@/components/atoms/common/Avatars/MultiImageAvatar/MultiImageAvatar";
import { getFormattedText, getTitle } from "@/utils/helpers/text.helpers";
import RatingFrame from "@/components/molecules/public/Frames/RatingFrame/RatingFrame";
import BookButton from "@/components/atoms/public/Buttons/BookButton/BookButton";

interface IFacilitySection {
  facilityId: number;
}

const FacilitySection: React.FC<IFacilitySection> = ({ facilityId }) => {
  const { data, loading, error } = useQuery(GET_ONE_FACILITY_QUERY, {
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
  } = data.facility as TFacility;

  const isComma = (index: number, arrayLength: number) => {
    return index < arrayLength - 1;
  };

  return (
    <section className="w-full flex flex-col pt-[60px] gap-y-unit-10">
      <MultiImageAvatar
        images={images}
        imagesName={name}
        className="h-[460px] rounded-2xl"
      />
      <div className="flex justify-between">
        <div className="w-[700px] flex flex-col gap-y-unit-5">
          <div className="flex justify-between">
            <div className="flex flex-col gap-y-unit-2">
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
          <div className="flex gap-x-unit-4">
            <div className="flex flex-col text-muted-foreground text-lg font-light">
              <p>Sport:</p>
              <p>Facility:</p>
              <p>Covering:</p>
            </div>
            <div className="flex flex-col text-lg">
              <ul className="flex gap-x-unit-1">
                {sportType.map((sport, index) => (
                  <li key={sport}>
                    <p>
                      {getTitle(sport)}
                      {isComma(index, sportType.length) && ","}
                    </p>
                  </li>
                ))}
              </ul>
              <p>{getTitle(facilityType)}</p>
              <p>{getFormattedText(coveringType)}</p>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-lg">{description}</p>
          </div>
        </div>
        <div className="flex items-end flex-col gap-y-unit-2 shrink-0">
          <p className="text-xl font-light">
            200 UAH <span className="text-muted-foreground text-lg">/hour</span>
          </p>
          <BookButton facilityId={id} />
        </div>
      </div>
      <Separator />
    </section>
  );
};

export default FacilitySection;
