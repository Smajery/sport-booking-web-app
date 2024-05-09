"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_AVATAR } from "@/apollo/query/admin/user";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAbbreviation } from "@/utils/helpers/text.helpers";
import { User2 } from "lucide-react";
import { TUserAvatar } from "@/types/private/profileTypes";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";

const UserHeaderAvatar = () => {
  const { data, loading, error } = useQuery(GET_USER_AVATAR, {
    context: { authRequired: true },
    onError: (e) =>
      ErrorHandler.handle(e, { componentName: "UserHeaderAvatar__getUser" }),
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{getApolloErrorMessage(error)}</div>;

  const { avatar, fullname } = data.getProfile as TUserAvatar;

  return (
    <Avatar className="h-[50px] w-[50px]">
      {avatar && (
        <AvatarImage src={`${process.env.NEXT_PUBLIC_IMG_URL}/${avatar}`} />
      )}
      <AvatarFallback>
        {fullname ? getAbbreviation(fullname) : <User2 />}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserHeaderAvatar;
