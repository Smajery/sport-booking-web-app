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

interface IFloatingField extends InputProps {
  form: any;
  IconComponent?: any;
  name: string;
  labelText?: string;
  noValidate?: boolean;
  isRequestError?: boolean;
  placeholder?: string;
}

const FloatingField: React.FC<IFloatingField> = ({
  form,
  IconComponent,
  name,
  labelText,
  noValidate = false,
  isRequestError = false,
  placeholder = "",
  ...props
}) => {
  const {
    formState: { isSubmitted },
  } = form as UseFormReturn;

  const [isFocused, setIsFocused] = React.useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    setIsFocused(e.target.value !== "");

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { invalid } }) => (
        <FormItem>
          <div
            className={clsx("relative flex items-center", {
              focused: isFocused || value,
            })}
          >
            {labelText && (
              <FormLabel
                className={clsx("floating-label", {
                  floating: isFocused || value,
                  "text-success":
                    !invalid && isSubmitted && !noValidate && !isRequestError,
                  "text-destructive":
                    (invalid && isSubmitted && !noValidate) || isRequestError,
                })}
              >
                {labelText}
              </FormLabel>
            )}
            <FormControl>
              <Input
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoComplete="off"
                placeholder={isFocused || value ? placeholder : ""}
                value={value ?? ""}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                className={clsx("h-[56px] pl-3 pr-10 pb-[6px] pt-[26px]", {
                  "border-destructive focus-visible:ring-destructive":
                    (invalid && isSubmitted && !noValidate) || isRequestError,
                  "border-success focus-visible:ring-success":
                    !invalid && isSubmitted && !noValidate && !isRequestError,
                })}
                {...props}
              />
            </FormControl>
            {IconComponent && (
              <IconComponent className="w-5 h-5 absolute right-4" />
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FloatingField;
