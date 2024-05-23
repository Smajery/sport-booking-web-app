import React from "react";
import InputField from "@/components/molecules/private/owner/Fields/InputField/InputField";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

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
  return (
    <div className="flex flex-col gap-y-5">
      <p className="text-4xl text-primary font-semibold">Update Schedule</p>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <Checkbox
            id="allSlotsCheckbox"
            checked={isAllSlots}
            onCheckedChange={setIsAllSlots}
            className="rounded-full w-5 h-5"
          />
          <label
            htmlFor="allSlotsCheckbox"
            className="-mb-[2px] text-lg font-light text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            All slots
          </label>
        </div>
        <div className="flex items-center gap-x-2">
          <Checkbox
            id="selectedSlotsCheckbox"
            checked={!isAllSlots}
            onCheckedChange={(e) => setIsAllSlots(!e)}
            className="rounded-full w-5 h-5"
          />
          <label
            htmlFor="selectedSlotsCheckbox"
            className="-mb-[2px] text-lg font-light text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Selected slots
          </label>
        </div>
      </div>
      <InputField
        form={form}
        name="price"
        type="number"
        placeholder="Price..."
        labelText="Price per slot (30 min)"
        min={1}
      />
    </div>
  );
};

export default UpdateScheduleFormContent;
