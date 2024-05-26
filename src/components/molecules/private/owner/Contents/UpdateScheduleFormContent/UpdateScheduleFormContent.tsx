import React from "react";
import InputField from "@/components/molecules/private/owner/Fields/InputField/InputField";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IUpdateScheduleFormContent {
  form: any;
  isAllSlots: CheckedState;
  setIsAllSlots: (e: CheckedState) => void;
}

const UpdateScheduleFormContent: React.FC<IUpdateScheduleFormContent> = ({
  form,
  isAllSlots,
  setIsAllSlots,
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  return (
    <div className="flex flex-col gap-y-5">
      <p className="text-4xl text-primary font-semibold">
        {tTtl("updateSchedule")}
      </p>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <Checkbox
            id="all-slotts-check"
            checked={isAllSlots}
            onCheckedChange={setIsAllSlots}
            className="rounded-full w-5 h-5"
          />
          <label
            htmlFor="all-slotts-check"
            className="-mb-[2px] text-lg font-light text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {tTtl("allSlots")}
          </label>
        </div>
        <div className="flex items-center gap-x-2">
          <Checkbox
            id="selected-slots-check"
            checked={!isAllSlots}
            onCheckedChange={(e) => setIsAllSlots(!e)}
            className="rounded-full w-5 h-5"
          />
          <label
            htmlFor="selected-slots-check"
            className="-mb-[2px] text-lg font-light text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {tTtl("selectedSlots")}
          </label>
        </div>
      </div>
      <InputField
        form={form}
        name="price"
        type="number"
        placeholder="price"
        labelText="pricePerSlot"
        min={1}
      />
    </div>
  );
};

export default UpdateScheduleFormContent;
