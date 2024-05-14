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

interface IInputField extends InputProps {
  form: any;
  IconComponent?: any;
  name: string;
  labelText?: string;
  noValidate?: boolean;
  isRequestError?: boolean;
}

const InputField: React.FC<IInputField> = ({
  form,
  IconComponent,
  name,
  labelText,
  noValidate = false,
  isRequestError = false,
  ...props
}) => {
  const {
    formState: { isSubmitted },
    register,
  } = form as UseFormReturn;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState: { invalid } }) => (
        <FormItem className="space-y-1">
          <div className="flex items-center">
            {labelText && (
              <FormLabel
                className={clsx("text-lg font-light", {
                  "text-success":
                    !invalid && isSubmitted && !noValidate && !isRequestError,
                  "text-destructive":
                    (invalid && isSubmitted && !noValidate) || isRequestError,
                })}
              >
                {labelText}
              </FormLabel>
            )}
            {props.maxLength && (
              <p className="ml-auto text-muted-foreground text-sm font-light">
                {field.value.length}/{props.maxLength}
              </p>
            )}
          </div>
          <FormControl>
            <Input
              {...field}
              {...register(name)}
              autoComplete="off"
              value={field.value ? field.value : ""}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              className={clsx("", {
                "border-destructive focus-visible:ring-destructive":
                  (invalid && isSubmitted && !noValidate) || isRequestError,
                "border-success focus-visible:ring-success":
                  !invalid && isSubmitted && !noValidate && !isRequestError,
              })}
              {...props}
            />
          </FormControl>
          {IconComponent && (
            <IconComponent
              className="w-5 h-5 absolute right-4"
              color="#040C11"
            />
          )}
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
};

export default InputField;
