"use client";

import React from "react";
import CreateRatingForm from "@/components/molecules/private/user/Forms/CreateRatingForm/CreateRatingForm";
import UpdateRatingForm from "@/components/molecules/private/user/Forms/UpdateRatingForm/UpdateRatingForm";
import { TCurrentUserRate } from "@/types/public/facilityTypes";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IUserRatingFrame {
  facilityId: number;
  currentUserRate: TCurrentUserRate | null;
  className?: string;
}

const UserRatingFrame: React.FC<IUserRatingFrame> = ({
  facilityId,
  currentUserRate,
  className = "",
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  return (
    <div
      className={cn(
        "shadow-md flex flex-col border border-border rounded-xl gap-y-2 p-4",
        className,
      )}
    >
      <p className="text-lg font-light">{tTtl("yourRate")} </p>
      {!currentUserRate ? (
        <CreateRatingForm
          facilityId={facilityId}
          ratingsCount={5}
          userRating={0}
        />
      ) : (
        <UpdateRatingForm
          ratingsCount={5}
          userRating={currentUserRate.value}
          ratingId={currentUserRate.id}
          facilityId={facilityId}
        />
      )}
    </div>
  );
};

export default UserRatingFrame;
