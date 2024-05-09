import React from "react";
import { clsx } from "clsx";
import { Check, X } from "lucide-react";

interface IUserInfoFrame {
  title: string;
  info: string | null;
}

const UserInfoFrame: React.FC<IUserInfoFrame> = ({ title, info }) => {
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-primary">{title}</p>
      <div className="flex justify-between items-center h-unit-10 gap-x-unit-5">
        {info ? (
          <p className="text-2xl">{info}</p>
        ) : (
          <p className="text-2xl italic font-light text-muted-foreground">
            No information
          </p>
        )}
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
      </div>
    </div>
  );
};

export default UserInfoFrame;
