"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAbbreviation } from "@/utils/helpers/text.helpers";
import { User2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@apollo/client";
import { TUserAvatar } from "@/types/private/user/profileTypes";
import { GET_USER_AVATAR_QUERY } from "@/apollo/query/private/user/profile";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";

const UserHeaderAvatar = () => {
  const { push } = useRouter();

  const { data, loading, error } = useQuery(GET_USER_AVATAR_QUERY, {
    fetchPolicy: "cache-and-network",
    context: { authRequired: true },
  });

  if (loading) return <Skeleton className="rounded-full h-[50px] w-[50px]" />;
  if (error)
    return (
      <Skeleton className="rounded-full flex items-center justify-center p-2 h-[50px] w-[50px]">
        <p className="truncate">User not found</p>
      </Skeleton>
    );
  const { avatar, fullname } = data.getProfile as TUserAvatar;

  return (
    <Avatar
      className="h-[50px] w-[50px] cursor-pointer"
      onClick={() => push(routes.PROFILE)}
    >
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
