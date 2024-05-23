"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAbbreviation } from "@/utils/helpers/text.helpers";
import { ImagePlus, User2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_ALLOWED_AVATAR_SIZE_KB,
} from "@/utils/constants/files.constants";
import { Button } from "@/components/ui/button";
import { TUser } from "@/types/private/user/profileTypes";
import SingleMessageField from "@/components/molecules/public/Fields/SingleMessageField/SingleMessageField";

interface IUserProfileAvatarFrame {
  isEdit: boolean;
  user: TUser;
  form: any;
}

const UserProfileAvatarFrame: React.FC<IUserProfileAvatarFrame> = ({
  isEdit,
  user,
  form,
}) => {
  const { fullname, avatar } = user;
  const [selectedAvatar, setSelectedAvatar] = React.useState<string | null>(
    `${process.env.NEXT_PUBLIC_IMG_URL}/${avatar}`,
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleSetAvatar = (avatar: File) => {
    form.setValue("avatar", avatar);
    setSelectedAvatar(URL.createObjectURL(avatar));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const avatar = e.target.files[0];
      if (avatar.size > MAX_ALLOWED_AVATAR_SIZE_KB * 1024) {
        form.setError("avatar", {
          message: `Max file size is ${(MAX_ALLOWED_AVATAR_SIZE_KB / 1000).toFixed(2)} MB.`,
        });
      } else {
        handleSetAvatar(avatar);
      }
    }
  };

  //Temporary solution for changing avatar
  React.useEffect(() => {
    setSelectedAvatar(`${process.env.NEXT_PUBLIC_IMG_URL}/${avatar}`);
  }, [avatar]);

  //Temporary solution for resetting avatar
  React.useEffect(() => {
    if (!isEdit) {
      setSelectedAvatar(`${process.env.NEXT_PUBLIC_IMG_URL}/${avatar}`);
    }
  }, [isEdit]);

  return (
    <div className="shrink-0 flex justify-center w-[310px] mb-auto">
      <div className="relative">
        <Avatar className="h-[150px] w-[150px]">
          {selectedAvatar && (
            <AvatarImage src={selectedAvatar} alt="User Avatar" />
          )}
          <AvatarFallback className="text-5xl">
            {fullname ? (
              getAbbreviation(fullname)
            ) : (
              <User2 className="w-[80px] h-[80px]" strokeWidth={1} />
            )}
          </AvatarFallback>
        </Avatar>
        {isEdit && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <Input
              type="file"
              onChange={handleFileInput}
              accept={ACCEPTED_IMAGE_TYPES.join(", ")}
              className="hidden"
              ref={fileInputRef}
            />
            <Button
              variant="none"
              type="button"
              className="bg-background shadow-lg gap-x-2 border-transparent"
              onClick={() =>
                fileInputRef.current ? fileInputRef.current.click() : null
              }
            >
              <ImagePlus />{" "}
              <p className="mt-1">{selectedAvatar ? "Change" : "Add"}</p>
            </Button>
          </div>
        )}
      </div>
      <SingleMessageField
        form={form}
        name="avatar"
        className="mt-10 text-center"
      />
    </div>
  );
};

export default UserProfileAvatarFrame;
