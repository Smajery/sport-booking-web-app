"use client";

import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import React from "react";
import UpdateUserForm from "@/components/molecules/private/user/Forms/UpdateUserForm/UpdateUserForm";
import BecameOwnerForm from "@/components/molecules/private/user/Forms/BecameOwnerForm/BecameOwnerForm";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";
import BecameOwnerButton from "@/components/atoms/private/user/Buttons/BecameOwnerButton/BecameOwnerButton";
import { useQuery } from "@apollo/client";
import { GET_USER_QUERY } from "@/apollo/query/admin/user/profile";
import { TUser } from "@/types/private/user/profileTypes";

const ProfileSection = () => {
  const [isBecameOwner, setIsBecameOwner] = React.useState<boolean>(false);

  const { data, loading, error } = useQuery(GET_USER_QUERY, {
    context: { authRequired: true },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{getApolloErrorMessage(error)}</div>;

  const user = data.getProfile as TUser;

  return (
    <section className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-1">
        {!user.userOwner && (
          <BecameOwnerButton
            isBecameOwner={isBecameOwner}
            setIsBecameOwner={setIsBecameOwner}
            className="ml-auto mt-1"
          />
        )}
        <div className="pl-[80px] bg-primary text-primary-foreground p-2">
          <p className="text-4xl font-semibold">Personal information</p>
        </div>
      </div>
      <UpdateUserForm user={user} isBecameOwner={isBecameOwner} />
      {!user.userOwner && isBecameOwner && (
        <BecameOwnerForm setIsBecameOwner={setIsBecameOwner} />
      )}
    </section>
  );
};

export default ProfileSection;
