"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ONE_FACILITY_QUERY } from "@/apollo/query/private/owner/facility";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import UpdateFacilityForm from "@/components/molecules/private/owner/Form/UpdateFacilityForm/UpdateFacilityForm";
import { TFacility } from "@/types/private/owner/facilityTypes";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IFacilitySection {
  facilityId: number;
}

const FacilitySection: React.FC<IFacilitySection> = ({ facilityId }) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const { data, loading, error, refetch } = useQuery(GET_ONE_FACILITY_QUERY, {
    fetchPolicy: "cache-and-network",
    variables: {
      id: facilityId,
    },
  });

  if (loading) return <div>{tTtl("loading")}</div>;
  if (error) return <div>{getApolloErrorMessage(error)}</div>;

  return (
    <section className="flex flex-col">
      <UpdateFacilityForm facility={data.facility} refetchFacility={refetch} />
    </section>
  );
};

export default FacilitySection;
