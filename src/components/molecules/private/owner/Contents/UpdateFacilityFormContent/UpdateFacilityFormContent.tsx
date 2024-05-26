import React from "react";
import InputField from "@/components/molecules/private/owner/Fields/InputField/InputField";
import { Separator } from "@/components/ui/separator";
import MultiSelectField from "@/components/molecules/private/owner/Fields/MultiSelectField/MultiSelectField";
import { facilityConfig } from "@/config/public/facility";
import SingleSelectField from "@/components/molecules/private/owner/Fields/SingleSelectField/SingleSelectField";
import TextareaField from "@/components/molecules/private/owner/Fields/TextareaField/TextareaField";
import MultiImageAvatarField from "@/components/molecules/private/owner/Fields/MultiImageAvatarField/MultiImageAvatarField";
import FormErrorsFrame from "@/components/molecules/public/Frames/FormErrorsFrame/FormErrorsFrame";
import ErrorMessageField from "@/components/molecules/public/Fields/ErrorMessageField/ErrorMessageField";
import CheckboxField from "@/components/molecules/private/owner/Fields/CheckboxField/CheckboxField";

interface IUpdateFacilityFormContent {
  form: any;
}

const UpdateFacilityFormContent: React.FC<IUpdateFacilityFormContent> = ({
  form,
}) => {
  return (
    <div className="flex flex-col gap-y-10">
      <MultiImageAvatarField
        form={form}
        name="photos"
        imagesName="Facility image"
        className="h-[460px] rounded-2xl"
      />
      <div className="flex justify-between">
        <div className="w-[700px] flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <InputField
              form={form}
              name="name"
              type="text"
              labelText="name"
              placeholder="facilityName"
              maxLength={100}
            />
            <InputField
              form={form}
              name="address"
              type="text"
              labelText="address"
              placeholder="facilityAddress"
              maxLength={100}
            />
          </div>
          <Separator />
          <div className="w-full flex flex-col gap-y-2">
            <MultiSelectField
              form={form}
              name="sportType"
              labelText="sport"
              selectableItems={facilityConfig.sportType}
              className="w-full"
            />
            <SingleSelectField
              form={form}
              name="facilityType"
              labelText="facility"
              selectableItems={facilityConfig.facilityType}
              className="w-full"
            />
            <SingleSelectField
              form={form}
              name="coveringType"
              labelText="covering"
              selectableItems={facilityConfig.coveringType}
              className="w-full"
            />
          </div>
          <Separator />
          <TextareaField
            form={form}
            name="description"
            labelText="description"
            className="text-lg max-h-[200px] min-h-[98px]"
            placeholder="facilityDescription"
            maxLength={400}
          />
          <CheckboxField
            form={form}
            labelText="facilityStatus"
            name="isWorking"
            checkboxId="working-status-check"
            checkboxLabelText="working"
          />
          <ErrorMessageField form={form} name="photos" />
        </div>
      </div>
    </div>
  );
};

export default UpdateFacilityFormContent;
