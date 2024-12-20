"use client";

import React from "react";
import { usePagination } from "@/hooks/usePagination/usePagination";
import { useQuery } from "@apollo/client";
import { GET_USER_BOOKINGS_QUERY } from "@/apollo/query/private/user/booking";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import PaginationFrame from "@/components/molecules/public/Frames/PaginationFrame/PaginationFrame";
import ReservationsList from "@/components/molecules/private/user/Lists/ReservationsList/ReservationsList";

const limit = 10;

const ReservationsSection = () => {
  const { pagination, setPagination, handlePageChange } = usePagination();
  const { currentPage, totalPages, totalItems } = pagination;

  const { data, loading, error, fetchMore } = useQuery(
    GET_USER_BOOKINGS_QUERY,
    {
      context: {
        authRequired: true,
      },
      variables: {
        paginationArgs: {
          limit: limit,
          page: currentPage,
        },
      },
      onCompleted: (data) => {
        setPagination({
          ...pagination,
          totalItems: data.findAllBookings.totalCount,
          totalPages: Math.ceil(data.findAllBookings.totalCount / limit),
        });
      },
    },
  );
  return (
    <section className="flex flex-col gap-y-5">
      <div className="flex mt-5">
        <p className="text-primary text-4xl font-semibold">Reservations</p>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{getApolloErrorMessage(error)}</div>
      ) : data.findAllBookings.bookings.length === 0 ? (
        <div className="flex justify-center py-5 ">
          You haven't created any bookings yet
        </div>
      ) : (
        <ReservationsList bookings={data.findAllBookings.bookings} />
      )}
      <PaginationFrame
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        currentPage={currentPage}
        isFetchLoading={loading}
      />
    </section>
  );
};

export default ReservationsSection;
