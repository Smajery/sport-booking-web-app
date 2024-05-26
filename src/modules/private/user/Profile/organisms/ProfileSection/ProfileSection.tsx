"use client";

import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import React from "react";
import UpdateUserForm from "@/components/molecules/private/user/Forms/UpdateUserForm/UpdateUserForm";
import BecameOwnerForm from "@/components/molecules/private/user/Forms/BecameOwnerForm/BecameOwnerForm";
import BecomeOwnerButton from "@/components/atoms/private/user/Buttons/BecomeOwnerButton/BecomeOwnerButton";
import { useQuery } from "@apollo/client";
import { GET_USER_QUERY } from "@/apollo/query/private/user/profile";
import { TUser } from "@/types/private/user/profileTypes";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

const ProfileSection = () => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);
  const [isBecameOwner, setIsBecameOwner] = React.useState<boolean>(false);

  const { data, loading, error } = useQuery(GET_USER_QUERY, {
    fetchPolicy: "cache-and-network",
    context: {
      authRequired: true,
    },
  });

  if (loading) return <div>{tTtl("loading")}</div>;
  if (error) return <div>{getApolloErrorMessage(error)}</div>;

  const user = data.getProfile as TUser;

  return (
    <section className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-1">
        {!user.userOwner && (
          <BecomeOwnerButton
            isBecameOwner={isBecameOwner}
            setIsBecameOwner={setIsBecameOwner}
            className="ml-auto mt-1"
          />
        )}
        <div className="pl-[80px] bg-primary text-primary-foreground p-2">
          <p className="text-4xl font-semibold">
            {tTtl("personalInformation")}
          </p>
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
