import React from "react";
import UserInfoFrame from "@/components/molecules/private/Frames/UserInfoFrame/UserInfoFrame";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAbbreviation } from "@/utils/helpers/text.helpers";
import { User2 } from "lucide-react";
import { TUser } from "@/types/private/profileTypes";
import format from "@/lib/format";
import { useLocale } from "use-intl";
import { TLocale } from "@/navigation";

interface IUserCardFrame {
  user: TUser;
}

const UserCardFrame: React.FC<IUserCardFrame> = ({ user }) => {
  const locale = useLocale() as TLocale;

  const { email, fullname, dateOfBirth } = user;

  return (
    <div className="w-full flex flex-col gap-unit-5">
      <UserInfoFrame title={"Full Name"} info={fullname} />
      <UserInfoFrame title={"Email"} info={email} />
      <UserInfoFrame
        title={"Date of birth"}
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
