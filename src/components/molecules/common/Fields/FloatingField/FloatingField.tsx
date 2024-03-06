import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { clsx } from "clsx";
import { UseFormReturn } from "react-hook-form";

interface IFloatingField {
  form: UseFormReturn;
  IconComponent?: any;
  name: string;
  type: string;
  labelText?: string;
  placeholder?: string;
  handleType?: () => void;
  noValidate?: boolean;
}

const FloatingField: React.FC<IFloatingField> = ({
  form,
  IconComponent,
  name,
  type,
  labelText,
  placeholder = "",
  handleType,
  noValidate = false,
}) => {
  const {
    formState: { isSubmitted },
    register,
  } = form;

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    setIsFocused(e.target.value !== "");

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState: { invalid } }) => (
        <FormItem>
          <div
            className={clsx("relative flex items-center", {
              focused: isFocused || field.value,
            })}
          >
            {labelText && (
              <FormLabel
                className={clsx("floating-label", {
                  floating: isFocused || field.value,
                  "text-success": !invalid && isSubmitted && !noValidate,
                })}
              >
                {labelText}
              </FormLabel>
            )}
            <FormControl>
              <Input
                {...field}
                {...register(name)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoComplete="off"
                type={type}
                placeholder={isFocused || field.value ? placeholder : ""}
                value={field.value ? field.value : ""}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  if (handleType) {
                    handleType();
                  }
                }}
                className={clsx(
                  "h-[56px] pl-unit-3 pr-unit-10 pb-unit-[6px] pt-[26px]",
                  {
                    "border-destructive focus-visible:ring-destructive":
                      invalid && isSubmitted && !noValidate,
                    "border-success focus-visible:ring-success":
                      !invalid && isSubmitted && !noValidate,
                  },
                )}
              />
            </FormControl>
            {IconComponent && (
              <IconComponent
                className="w-unit-5 h-unit-5 absolute right-unit-4"
                color="#040C11"
              />
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
};

export default FloatingField;
