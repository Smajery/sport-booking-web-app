import React from "react";
import { TBooking } from "@/types/private/user/bookingTypes";
import { Badge } from "@/components/ui/badge";
import format from "@/lib/format";
import { formatISO } from "date-fns";
import { Hash } from "lucide-react";
import { getFormattedText, getTitle } from "@/utils/helpers/text.helpers";
import Link from "next/link";
import { routes } from "@/utils/constants/routes.constants";
import { getBookingStatusVariant } from "@/utils/helpers/variant.helpers";

interface IBookingItem {
  booking: TBooking;
}

const ReservationsItem: React.FC<IBookingItem> = ({ booking }) => {
  const {
    startTime,
    endTime,
    status,
    facility: { name, id, images, sportType, coveringType, facilityType },
  } = booking;
  return (
    <div className="h-[260px] rounded-xl shadow-md flex">
      <div className="p-5 w-[300px] flex flex-col gap-y-4">
        <Badge variant={getBookingStatusVariant(status)} size="sm">
          {status}
        </Badge>
        <Link
          href={`${routes.FACILITY}/${id}`}
          className="text-2xl hover:underline"
        >
          {name}
        </Link>
        <div className="mt-auto flex flex-col gap-y-2">
          <div className="flex flex-wrap gap-x-1">
            {sportType.map((sport) => (
              <div key={sport}>
                <Badge variant="outline" Icon={Hash}>
                  {getTitle(sport)}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex py-5">
        <div className="mb-5 px-5 flex flex-col justify-center items-center border-l border-border">
          <p className="text-xl font-light">
            {format(formatISO(startTime), "MMMM")}
          </p>
          <p className="text-4xl font-light">
            {format(formatISO(startTime), "d")}
          </p>
          <p className="text-xl font-light">
            {`${format(formatISO(startTime), "HH:mm")} - ${format(formatISO(endTime), "HH:mm")}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationsItem;
