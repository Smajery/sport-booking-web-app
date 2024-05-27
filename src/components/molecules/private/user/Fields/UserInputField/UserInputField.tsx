import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input, InputProps } from "@/components/ui/input";

import { clsx } from "clsx";
import { UseFormReturn } from "react-hook-form";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IUserInputField extends InputProps {
  form: any;
  name: string;
  placeholder?: string;
  labelText?: string;
  noValidate?: boolean;
}

const UserInputField: React.FC<IUserInputField> = ({
  form,
  name,
  labelText,
  noValidate = false,
  placeholder = "",
  ...props
}) => {
  const tLbl = useTranslations(namespaces.COMPONENTS_LABELS);
  const tPlh = useTranslations(namespaces.COMPONENTS_PLACEHOLDERS);

  const {
    formState: { isSubmitted },
  } = form as UseFormReturn;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { invalid } }) => (
        <FormItem className="space-y-1">
          {labelText && (
            <FormLabel
              className={clsx("text-primary text-base font-normal", {
                "text-success": !invalid && isSubmitted && !noValidate,
              })}
            >
              {tLbl(labelText)}
            </FormLabel>
          )}
          <FormControl>
            <div className="flex items-center gap-x-5">
              <Input
                autoComplete="off"
                value={value ?? ""}
                placeholder={placeholder ? tPlh(placeholder) : placeholder}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                className={clsx("text-2xl pl-3 pr-[30px]", {
                  "border-destructive focus-visible:ring-destructive":
                    invalid && isSubmitted && !noValidate,
                  "border-success focus-visible:ring-success":
                    !invalid && isSubmitted && !noValidate,
                })}
                {...props}
              />
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
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UserInputField;
