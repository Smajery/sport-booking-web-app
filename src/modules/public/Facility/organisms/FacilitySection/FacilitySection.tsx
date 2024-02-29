"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ONE_FACILITY_QUERY } from "@/apollo/query/public/facility";
import { getErrorMessage } from "@/utils/helpers/error.helpers";
import { TFacility } from "@/types/public/facilityTypes";
import { Separator } from "@/components/ui/separator";
import MultiImageAvatar from "@/components/atoms/common/Avatars/MultiImageAvatar/MultiImageAvatar";
import { Button } from "@/components/ui/button";
import { getFormattedText, getTitle } from "@/utils/helpers/text.helpers";
import { clsx } from "clsx";
import { CheckCircle2 } from "lucide-react";

interface IFacilitySection {
  facilityId: string;
}

const FacilitySection: React.FC<IFacilitySection> = ({ facilityId }) => {
  const { data, loading, error } = useQuery(GET_ONE_FACILITY_QUERY, {
    variables: {
      id: Number(facilityId),
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{getErrorMessage(error)}</p>;

  const {
    name,
    images,
    description,
    address,
    avgRating,
    ratingCount,
    currentUserRate,
    location,
    minBookingTime,
    district,
    sportType,
    facilityType,
    coveringType,
  } = data.facility as TFacility;
  return (
    <section className="w-full flex flex-col pt-unit-10 gap-y-unit-10">
      <MultiImageAvatar
        images={images}
        imagesName={name}
        className="h-[460px] rounded-2xl"
      />
      <div className="flex justify-between">
        <div className="w-[700px] flex flex-col gap-y-unit-5">
          <div className="flex flex-col gap-y-unit-2">
            <p className="text-3xl">{name}</p>
            <p className="text-lg font-light">
              {address}, {district} district
            </p>
          </div>
          <Separator />
          <div className="flex gap-x-unit-4">
            <div className="flex flex-col text-muted-foreground text-lg font-light">
              <p>Sport:</p>
              <p>Facility:</p>
              <p>Covering:</p>
            </div>
            <div className="flex flex-col text-lg">
              <p>{getTitle(sportType)}</p>
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
          <Button size="md" className="book-gradient">
            Book
          </Button>
        </div>
      </div>
      <Separator />
    </section>
  );
};

export default FacilitySection;
