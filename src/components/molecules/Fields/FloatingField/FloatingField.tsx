import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import DynamicIcon from "@/components/atoms/Icons/DynamicIcon/DynamicIcon";
import { Input } from "@/components/ui/input";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { clsx } from "clsx";

interface IFloatingField {
  form: any;
  iconName?: keyof typeof dynamicIconImports;
  name: string;
  type: string;
  labelText?: string;
  placeholder?: string;
}

const FloatingField: React.FC<IFloatingField> = ({
  form,
  iconName,
  name,
  type,
  labelText,
  placeholder = "",
}) => {
  const {
    formState: { isValid, isSubmitted },
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
                type={type}
                placeholder={isFocused || field.value ? placeholder : ""}
                value={field.value ? field.value : ""}
                className={clsx(
                  "h-[56px] pl-unit-3 pr-unit-10 pb-unit-[6px] pt-[26px]",
                  {
                    "border-destructive focus-visible:ring-destructive":
                      !isValid && isSubmitted,
                  },
                )}
              />
            </FormControl>
            <DynamicIcon
              name={iconName}
              className="w-unit-5 h-unit-5 absolute right-unit-4"
            />
          </div>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
};

export default FloatingField;
