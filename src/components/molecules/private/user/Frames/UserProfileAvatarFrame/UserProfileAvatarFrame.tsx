"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAbbreviation } from "@/utils/helpers/text.helpers";
import { ImagePlus, User2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_ALLOWED_AVATAR_SIZE_KB,
} from "@/utils/constants/files.constants";
import { Button } from "@/components/ui/button";
import { TUser } from "@/types/private/user/profileTypes";
import ErrorMessageField from "@/components/molecules/public/Fields/ErrorMessageField/ErrorMessageField";

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

  const [selectedAvatar, setSelectedAvatar] = React.useState<
    string | undefined
  >(avatar ? `${process.env.NEXT_PUBLIC_IMG_URL}/${avatar}` : undefined);
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

  const handleRemoveFile = () => {
    setSelectedAvatar(undefined);
    form.setValue("avatar", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  //Temporary solution for changing avatar
  React.useEffect(() => {
    setSelectedAvatar(
      avatar ? `${process.env.NEXT_PUBLIC_IMG_URL}/${avatar}` : undefined,
    );
  }, [avatar]);

  //Temporary solution for resetting avatar
  React.useEffect(() => {
    if (!isEdit) {
      setSelectedAvatar(
        avatar ? `${process.env.NEXT_PUBLIC_IMG_URL}/${avatar}` : undefined,
      );
    }
  }, [isEdit]);

  return (
    <div className="shrink-0 flex justify-center w-[310px] mb-auto">
      <div className="relative">
        <Avatar className="h-[150px] w-[150px]">
          <AvatarImage src={selectedAvatar} alt="User Avatar" />
          <AvatarFallback className="text-5xl">
            {fullname ? (
              getAbbreviation(fullname)
            ) : (
              <User2 className="w-[80px] h-[80px]" strokeWidth={1} />
            )}
          </AvatarFallback>
        </Avatar>
        {isEdit && (
          <>
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
            {selectedAvatar && (
              <Button
                variant="none"
                size="none"
                type="button"
                onClick={handleRemoveFile}
                asChild
                className="absolute -top-2 -right-2 cursor-pointer ml-auto"
              >
                <div className="flex rounded-md bg-background items-center justify-center w-8 h-8">
                  <X />
                </div>
              </Button>
            )}
          </>
        )}
      </div>
      <ErrorMessageField
        form={form}
        name="avatar"
        className="mt-10 text-center"
      />
    </div>
  );
};

export default UserProfileAvatarFrame;
