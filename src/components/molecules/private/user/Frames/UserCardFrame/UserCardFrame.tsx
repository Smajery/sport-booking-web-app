import React from "react";
import UserInfoFrame from "@/components/molecules/private/user/Frames/UserInfoFrame/UserInfoFrame";
import { TUser } from "@/types/private/user/profileTypes";
import format from "@/lib/format";
import { useLocale } from "next-intl";
import { TLocale } from "@/navigation";

interface IUserCardFrame {
  user: TUser;
}

const UserCardFrame: React.FC<IUserCardFrame> = ({ user }) => {
  const locale = useLocale() as TLocale;

  const { email, fullname, dateOfBirth } = user;

  return (
    <div className="w-full flex flex-col gap-5">
      <UserInfoFrame title={"fullName"} info={fullname} />
      <UserInfoFrame title={"email"} info={email} />
      <UserInfoFrame
        title={"dateOfBirth"}
        info={
          dateOfBirth
            ? format(new Date(dateOfBirth), "dd.MM.yyyy", locale)
            : null
        }
      />
    </div>
  );
};

export default UserCardFrame;
