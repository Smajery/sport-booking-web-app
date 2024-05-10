"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAbbreviation } from "@/utils/helpers/text.helpers";
import { User2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";

const UserHeaderAvatar = () => {
  const { user, userLoading, userError } = useAuthContext();

  if (userLoading)
    return <Skeleton className="rounded-full h-[50px] w-[50px]" />;
  if (userError)
    return (
      <Skeleton className="rounded-full flex items-center justify-center p-2 h-[50px] w-[50px]">
        <p className="truncate">User not found</p>
      </Skeleton>
    );
  if (user) {
    const { avatar, fullname } = user;

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
  }
};

export default UserHeaderAvatar;
