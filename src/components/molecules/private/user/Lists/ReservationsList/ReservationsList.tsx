import React from "react";
import ReservationsItem from "@/components/molecules/private/user/Items/ResevationsItem/ReservationsItem";
import { TBooking } from "@/types/private/user/bookingTypes";

interface IReservationsList {
  bookings: TBooking[];
}

const ReservationsList: React.FC<IReservationsList> = ({ bookings }) => {
  return (
    <div className="flex flex-wrap gap-5">
      {bookings.map((booking) => (
        <ReservationsItem key={booking} booking={booking} />
      ))}
    </div>
  );
};

export default ReservationsList;
