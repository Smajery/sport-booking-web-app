"use client";

import React from "react";
import FacilitiesSection from "@/modules/private/owner/Facilities/organisms/FacilitiesSection/FacilitiesSection";
import { useQuery } from "@apollo/client";
import { GET_USER_ID_QUERY } from "@/apollo/query/private/user/profile";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";

const Facilities = () => {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER_ID_QUERY, {
    context: {
      authRequired: true,
    },
  });

  if (userLoading) return <div>Loading...</div>;
  if (userError) return <div>{getApolloErrorMessage(userError)}</div>;

  const { id: ownerId } = userData.getProfile as { id: number };

  return (
    <div className="w-full flex flex-col">
      <FacilitiesSection ownerId={ownerId} />
    </div>
  );
};

export default Facilities;
