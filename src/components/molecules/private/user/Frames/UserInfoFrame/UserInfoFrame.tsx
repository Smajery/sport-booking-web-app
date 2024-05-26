import React from "react";
import { clsx } from "clsx";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IUserInfoFrame {
  title: string;
  info: string | null;
  isCheck?: boolean;
  className?: string;
}

const UserInfoFrame: React.FC<IUserInfoFrame> = ({
  title,
  info,
  isCheck = true,
  className = "",
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);
  const tLbl = useTranslations(namespaces.COMPONENTS_LABELS);

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <p className="text-primary">{tLbl(title)}</p>
      <div className="flex justify-between items-center h-10 gap-x-5">
        {info ? (
          <p className="text-2xl">{info}</p>
        ) : (
          <p className="text-2xl italic font-light text-muted-foreground">
            {tTtl("noInformation")}
          </p>
        )}
        {isCheck && (
          <div
            className={clsx(
              "flex items-center justify-center text-white w-[30px] h-[30px] rounded-[5px]",
              {
                "bg-success": info,
                "bg-danger": !info,
              },
            )}
          >
            {info ? <Check /> : <X />}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoFrame;
