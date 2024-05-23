"use client";

import React from "react";
import UpdateScheduleForm from "@/components/molecules/private/owner/Form/UpdateScheduleForm/UpdateScheduleForm";
import { useQuery } from "@apollo/client";
import { GET_FACILITY_SCHEDULE_QUERY } from "@/apollo/query/private/owner/facility";
import { useParams } from "next/navigation";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { TFacilitySchedule } from "@/types/private/owner/facilityTypes";

const ScheduleSection = () => {
  const { myFacilityId } = useParams();

  const { data, loading, error } = useQuery(GET_FACILITY_SCHEDULE_QUERY, {
    variables: {
      id: Number(myFacilityId),
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{getApolloErrorMessage(error)}</div>;

  const facilitySchedule = data.facility as TFacilitySchedule;

  return (
    <section className="flex flex-col gap-y-10 pt-5 pl-5">
      <UpdateScheduleForm facilitySchedule={facilitySchedule} />
    </section>
  );
};

export default ScheduleSection;
