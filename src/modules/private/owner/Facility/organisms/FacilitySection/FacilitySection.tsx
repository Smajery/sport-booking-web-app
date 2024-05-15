"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ONE_FACILITY_QUERY } from "@/apollo/query/private/owner/facility";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import UpdateFacilityForm from "@/components/molecules/private/owner/Form/UpdateFacilityForm/UpdateFacilityForm";

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

  const facility = data.facility;

  return (
    <section className="flex flex-col">
      <UpdateFacilityForm facility={facility} />
    </section>
  );
};

export default FacilitySection;
