"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { clsx } from "clsx";
import { Check, X } from "lucide-react";
import { TSelectedItem } from "@/types/commonTypes";

interface ISelectorField {
  form: any;
  name: string;
  labelText?: string;
  selectableItems: TSelectedItem[];
  placeholder?: string;
  noValidate?: boolean;
}

const SelectorField: React.FC<ISelectorField> = ({
  form,
  name,
  labelText,
  noValidate = false,
  placeholder,
  selectableItems,
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
        <FormItem className="flex flex-col space-y-1">
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
          <div className="flex justify-between items-center gap-x-5">
            <Select onValueChange={onChange}>
              <FormControl>
                <SelectTrigger className="h-[56px] border border-input rounded-md text-lg text-muted-foreground font-light">
                  <SelectValue
                    placeholder={placeholder ?? ""}
                    className="text-lg text-muted-foreground"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {selectableItems.map((selectableItem) => (
                    <SelectItem
                      key={selectableItem.key}
                      value={String(selectableItem.key)}
                    >
                      {selectableItem.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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

export default SelectorField;
