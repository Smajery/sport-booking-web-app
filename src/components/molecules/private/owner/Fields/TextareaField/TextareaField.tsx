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
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { Check, X } from "lucide-react";

interface ITextArea extends TextareaProps {
  form: any;
  name: string;
  labelText?: string;
  noValidate?: boolean;
  isRequestError?: boolean;
  className?: string;
}

const TextareaField: React.FC<ITextArea> = ({
  form,
  name,
  labelText,
  noValidate = false,
  isRequestError = false,
  className = "",
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
          <div className="flex items-center pr-[50px]">
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
          <div className="flex gap-x-5">
            <FormControl>
              <Textarea
                {...field}
                {...register(name)}
                autoComplete="off"
                value={field.value ? field.value : ""}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                className={clsx(`text-lg pl-3 pb-[6px] ${className}`, {
                  "border-destructive focus-visible:ring-destructive":
                    (invalid && isSubmitted && !noValidate) || isRequestError,
                  "border-success focus-visible:ring-success":
                    !invalid && isSubmitted && !noValidate && !isRequestError,
                })}
                {...props}
              />
            </FormControl>
            <div
              className={clsx(
                "shrink-0 flex items-center justify-center text-white w-[30px] h-[30px] rounded-[5px]",
                {
                  "bg-success": field.value,
                  "bg-danger": !field.value,
                },
              )}
            >
              {field.value ? <Check /> : <X />}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextareaField;
