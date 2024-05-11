"use client";

import React from "react";
import FacilitiesList from "@/components/molecules/private/owner/Lists/FacilitiesList/FacilitiesList";
import { useQuery } from "@apollo/client";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { TFacilityFilter } from "@/types/private/owner/facilityTypes";
import { GET_ALL_FACILITIES_QUERY } from "@/apollo/query/admin/owner/facility";

const limit = 10;

interface I {
  ownerId: number;
}

const FacilitiesSection: React.FC<I> = ({ ownerId }) => {
  const [filterValues, setFilterValues] =
    React.useState<TFacilityFilter | null>({ ownerId });
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, loading, error, fetchMore } = useQuery(
    GET_ALL_FACILITIES_QUERY,
    {
      context: {
        authRequired: true,
      },
      variables: {
        paginationArgs: {
          limit: limit,
          page: 1,
        },
        facilitiesFilterInput: filterValues,
      },
    },
  );

  return (
    <section className="flex flex-col gap-y-5">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{getApolloErrorMessage(error)}</div>
      ) : data.findAll.facilities.length === 0 && filterValues ? (
        <div>No facilities for this filter</div>
      ) : data.findAll.facilities.length === 0 && !filterValues ? (
        <div className="flex justify-center p-5 ">
          You haven't added any facilities yet
        </div>
      ) : (
        <FacilitiesList facilities={data.findAll.facilities} />
      )}
    </section>
  );
};

export default FacilitiesSection;
