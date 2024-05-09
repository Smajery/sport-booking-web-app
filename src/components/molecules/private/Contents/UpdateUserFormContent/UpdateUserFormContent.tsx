import React from "react";
import UserInfoFrame from "@/components/molecules/private/Frames/UserInfoFrame/UserInfoFrame";
import { TUser } from "@/types/private/profileTypes";
import UserInputField from "@/components/molecules/private/Fields/UserInputField/UserInputField";
import UserDatePickerField from "@/components/molecules/private/Fields/UserDatePickerField/UserDatePickerField";

interface IUpdateUserFormContent {
  form: any;
  user: TUser;
}

const UpdateUserFormContent: React.FC<IUpdateUserFormContent> = ({
  form,
  user,
}) => {
  const { email } = user;

  return (
    <div className="w-full flex flex-col gap-unit-5">
      <UserInputField
        form={form}
        name="fullname"
        type="text"
        labelText="Full Name"
        placeholder="Ex: Robbie Sportacus"
      />
      <UserInfoFrame title={"Email"} info={email} />
      <UserDatePickerField
        form={form}
        name="dateOfBirth"
        labelText="Date of birth"
      />
    </div>
  );
};

export default UpdateUserFormContent;