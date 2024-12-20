"use client";

import React from "react";
import BookModalCard from "@/components/atoms/public/Cards/BookModalCard/BookModalCard";
import { useQuery } from "@apollo/client";
import { GET_FACILITY_SCHEDULE_QUERY } from "@/apollo/query/public/facility";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import BookSchedule from "@/components/atoms/public/Schedules/BookSchedule/BookSchedule";

interface IBookModal {
  facilityId: number;
  setIsModal: (value: boolean) => void;
}

const BookModal: React.FC<IBookModal> = ({ setIsModal, facilityId }) => {
  const { data, loading, error } = useQuery(GET_FACILITY_SCHEDULE_QUERY, {
    variables: {
      id: facilityId,
    },
  });

  const handleCloseModal = () => {
    setIsModal(false);
  };

  return (
    <BookModalCard handleCloseModal={handleCloseModal}>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{getApolloErrorMessage(error)}</div>
      ) : (
        <BookSchedule
          facilityId={facilityId}
          handleCloseModal={handleCloseModal}
          facilitySchedule={data.facility}
        />
      )}
    </BookModalCard>
  );
};

export default BookModal;
