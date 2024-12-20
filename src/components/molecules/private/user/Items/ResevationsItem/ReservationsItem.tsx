import React from "react";
import { TBooking } from "@/types/private/user/bookingTypes";
import { Badge } from "@/components/ui/badge";
import format from "@/lib/format";
import { parseISO } from "date-fns";
import Link from "next/link";
import { routes } from "@/utils/constants/routes.constants";
import { getBookingStatusVariant } from "@/utils/helpers/variant.helpers";
import { useLocale } from "next-intl";
import { TLocale } from "@/navigation";
import CreateRatingForm from "@/components/molecules/private/user/Forms/CreateRatingForm/CreateRatingForm";
import UpdateRatingForm from "@/components/molecules/private/user/Forms/UpdateRatingForm/UpdateRatingForm";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";

interface IBookingItem {
  booking: TBooking;
}

const ReservationsItem: React.FC<IBookingItem> = ({ booking }) => {
  const locale = useLocale() as TLocale;
  const { user } = useAuthContext();

  const {
    startTime,
    endTime,
    status,
    facility: { id, name, currentUserRate, owner },
  } = booking;

  const isOwnerFacility = !!(user && user.id && user.id === owner.id);

  return (
    <div className="h-[260px] rounded-xl shadow-md flex">
      <div className="px-5 pt-5 pb-10 w-[300px] flex flex-col gap-y-4">
        <Badge variant={getBookingStatusVariant(status)} size="sm">
          {status}
        </Badge>
        <Link
          href={`${routes.FACILITY}/${id}`}
          className="text-2xl hover:underline"
        >
          {name}
        </Link>
        {!isOwnerFacility &&
          status === "completed" &&
          (!currentUserRate ? (
            <CreateRatingForm
              facilityId={id}
              ratingsCount={5}
              userRating={0}
              className="pointer-events-none opacity-50"
            />
          ) : (
            <UpdateRatingForm
              ratingsCount={5}
              userRating={Number(currentUserRate.value)}
              ratingId={currentUserRate.id}
              className="pointer-events-none opacity-50"
            />
          ))}
      </div>
      <div className="flex py-10">
        <div className="px-5 flex flex-col justify-center items-center border-l border-border">
          <p className="text-xl font-light">
            {format(parseISO(startTime), "MMMM", locale)}
          </p>
          <p className="text-4xl font-light">
            {format(parseISO(startTime), "d", locale)}
          </p>
          <p className="text-xl font-light">
            {`${format(parseISO(startTime), "HH:mm", locale)} - ${format(parseISO(endTime), "HH:mm", locale)}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationsItem;
