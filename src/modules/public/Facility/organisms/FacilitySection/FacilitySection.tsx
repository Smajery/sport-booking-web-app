"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ONE_FACILITY_QUERY } from "@/apollo/query/public/facility";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { TFacility } from "@/types/public/facilityTypes";
import { Separator } from "@/components/ui/separator";
import MultiImageAvatar from "@/components/atoms/public/Avatars/MultiImageAvatar/MultiImageAvatar";
import RatingFrame from "@/components/molecules/public/Frames/RatingFrame/RatingFrame";
import BookButton from "@/components/atoms/public/Buttons/BookButton/BookButton";
import SelectFavoriteOnPageButton from "@/components/atoms/private/user/Buttons/SelectFavoriteOnPageButton/SelectFavoriteOnPageButton";
import { MIN_PER_SLOT } from "@/utils/constants/titles.constants";
import ContactOrganizationFrame from "@/components/molecules/public/Frames/ContactOrganizationFrame/ContactOrganizationFrame";
import UserRatingFrame from "@/components/molecules/public/Frames/UserRatingFrame/UserRatingFrame";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IFacilitySection {
  facilityId: number;
}

const FacilitySection: React.FC<IFacilitySection> = ({ facilityId }) => {
  const tLbl = useTranslations(namespaces.COMPONENTS_LABELS);
  const tSlct = useTranslations(namespaces.COMPONENTS_SELECTS);
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const { user } = useAuthContext();

  const { data, loading, error } = useQuery(GET_ONE_FACILITY_QUERY, {
    fetchPolicy: "cache-and-network",
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
    currentUserRate,
  } = data.facility as TFacility;

  const isOwnerFacility = !!(user && user.id && user.id === owner.id);

  const isComma = (index: number, arrayLength: number) => {
    return index < arrayLength - 1;
  };

  return (
    <section className="w-full flex flex-col pt-[40px] gap-y-10">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-end gap-x-2">
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
          <div className="flex justify-between gap-x-2 min-w-0">
            <div className="flex flex-col gap-y-2 min-w-0">
              <p className="w-full truncate text-3xl">{name}</p>
              <p className="text-lg font-light">
                {address}, {tSlct(district.name)}
              </p>
            </div>
            <RatingFrame
              avgRating={avgRating}
              ratingCount={ratingCount}
              className="shrink-0"
            />
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
                      {tSlct(sport)}
                      {isComma(index, sportType.length) && ","}
                    </p>
                  </div>
                ))}
              </div>
              <p>{tSlct(facilityType)}</p>
              <p>{tSlct(coveringType)}</p>
            </div>
          </div>
          <Separator />
          <p className="text-lg text-ellipsis break-words">{description}</p>
          <Separator />
        </div>
        {avgPrice && (
          <div className="flex items-end flex-col gap-y-2 shrink-0">
            <p className="text-xl font-light">
              {avgPrice} {tTtl("uah")}
              <span className="text-muted-foreground text-lg">
                {`/${MIN_PER_SLOT} ${tTtl("min")}`}
              </span>
            </p>
            <BookButton facilityId={id} disabled={!isWorking} />
            {!isWorking && (
              <p className="text-sm italic text-muted-foreground">
                {tTtl("temporarilyNotWorking")}
              </p>
            )}
            <div className="flex flex-col items-end gap-y-4 mt-auto">
              {!isOwnerFacility && (
                <UserRatingFrame
                  facilityId={facilityId}
                  currentUserRate={currentUserRate}
                />
              )}
              <ContactOrganizationFrame phone={owner.userOwner.phone} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FacilitySection;
