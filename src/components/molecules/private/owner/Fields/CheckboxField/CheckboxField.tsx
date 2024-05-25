import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { clsx } from "clsx";
import { UseFormReturn } from "react-hook-form";
import { Check, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";

interface IInputField extends CheckboxProps {
  form: any;
  name: string;
  labelText?: string;
  checkboxId: string;
  checkboxLabelText: string;
  noValidate?: boolean;
}

const InputField: React.FC<IInputField> = ({
  form,
  name,
  labelText,
  checkboxId,
  checkboxLabelText,
  noValidate = false,
  ...props
}) => {
  const {
    control,
    formState: { isSubmitted },
  } = form as UseFormReturn;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { invalid } }) => (
        <FormItem className="space-y-1">
          <div className="flex items-center pr-[50px]">
            {labelText && (
              <FormLabel
                className={clsx("text-lg font-light", {
                  "text-success": !invalid && isSubmitted && !noValidate,
                  "text-destructive": invalid && isSubmitted && !noValidate,
                })}
              >
                {labelText}
              </FormLabel>
            )}
          </div>
          <div className="flex items-center justify-between gap-x-5">
            <FormControl>
              <div className="flex items-center gap-x-2">
                <Checkbox
                  id={checkboxId}
                  checked={value}
                  onCheckedChange={onChange}
                  className="rounded-full w-5 h-5"
                  {...props}
                />
                <label
                  htmlFor={checkboxId}
                  className="-mb-[2px] text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {checkboxLabelText}
                </label>
              </div>
            </FormControl>
            <div
              className={clsx(
                "shrink-0 flex items-center justify-center text-white w-[30px] h-[30px] rounded-[5px]",
                {
                  "bg-success": value,
                  "bg-danger": !value,
                },
              )}
            >
              {value ? <Check /> : <X />}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
