"use client";

import React from "react";
import FacilitiesList from "@/components/molecules/private/owner/Lists/FacilitiesList/FacilitiesList";
import { useQuery } from "@apollo/client";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { GET_ALL_OWNER_FACILITIES_QUERY } from "@/apollo/query/private/owner/facility";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";
import CreateFacilityButton from "@/components/atoms/private/owner/Buttons/CreateFacilityButton/CreateFacilityButton";

const limit = 10;

const FacilitiesSection = () => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

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
        <div>{tTtl("loading")}</div>
      ) : error ? (
        <div>{getApolloErrorMessage(error)}</div>
      ) : (
        <>
          <FacilitiesList facilities={data.findOwnerFacilities.facilities} />
          <div className="mx-auto flex items-center justify-center w-[340px] h-[288px]">
            <CreateFacilityButton />
          </div>
        </>
      )}
    </section>
  );
};

export default FacilitiesSection;
