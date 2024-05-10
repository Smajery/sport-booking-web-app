"use client";

import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import React from "react";
import UpdateUserForm from "@/components/molecules/private/user/Forms/UpdateUserForm/UpdateUserForm";
import BecameOwnerForm from "@/components/molecules/private/user/Forms/BecameOwnerForm/BecameOwnerForm";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";

const ProfileSection = () => {
  const { user, userLoading, userError } = useAuthContext();
  const [isBecameOwner, setIsBecameOwner] = React.useState<boolean>(false);
  React.useEffect(() => {
    setIsBecameOwner(sessionStorage.getItem("isBecameOwner") === "true");
  }, []);

  if (userLoading) return <div>Loading...</div>;
  if (userError) return <div>{getApolloErrorMessage(userError)}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <section className="h-full flex flex-col gap-y-10 pt-10">
      <div className="pl-[80px] bg-primary text-primary-foreground p-2">
        <p className="text-4xl font-semibold">Personal information</p>
      </div>
      <UpdateUserForm user={user} isBecameOwner={isBecameOwner} />
      {!user.userOwner && isBecameOwner && <BecameOwnerForm />}
    </section>
  );
};

export default ProfileSection;
