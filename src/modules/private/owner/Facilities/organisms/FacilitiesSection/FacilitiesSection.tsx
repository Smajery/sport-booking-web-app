"use client";

import React from "react";
import FacilitiesList from "@/components/molecules/private/owner/Lists/FacilitiesList/FacilitiesList";
import { useQuery } from "@apollo/client";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { GET_ALL_OWNER_FACILITIES_QUERY } from "@/apollo/query/private/owner/facility";

const limit = 10;

const FacilitiesSection = () => {
  const { data, loading, error } = useQuery(GET_ALL_OWNER_FACILITIES_QUERY, {
    context: {
      authRequired: true,
    },
    variables: {
      paginationArgs: {
        limit: limit,
        page: 1,
      },
    },
  });

  return (
    <section className="flex flex-col gap-y-5">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{getApolloErrorMessage(error)}</div>
      ) : (
        <FacilitiesList facilities={data.findOwnerFacilities.facilities} />
      )}
    </section>
  );
};

export default FacilitiesSection;
