"use client";

import { useQuery } from "@apollo/client";
import { GET_USER_QUERY } from "@/apollo/query/admin/user";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import React from "react";
import { TUser } from "@/types/private/profileTypes";
import UpdateUserForm from "@/components/molecules/private/Forms/UpdateUserForm/UpdateUserForm";

const ProfileSection = () => {
  const { data, loading, error } = useQuery(GET_USER_QUERY, {
    context: { authRequired: true },
    onError: (e) =>
      ErrorHandler.handle(e, { componentName: "AuthProvider__getUser" }),
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{getApolloErrorMessage(error)}</div>;

  const user = data.getProfile as TUser;

  return (
    <section className="h-full flex flex-col gap-y-unit-10 pt-unit-10">
      <div className="pl-[80px] bg-primary text-primary-foreground p-unit-2">
        <p className="text-4xl font-semibold">Personal information</p>
      </div>
      <UpdateUserForm user={user} />
    </section>
  );
};

export default ProfileSection;
