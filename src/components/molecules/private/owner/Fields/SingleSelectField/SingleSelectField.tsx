import React from "react";
import { Badge } from "@/components/ui/badge";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { clsx } from "clsx";
import { Check, X } from "lucide-react";

type TSelectedItem = {
  key: string;
  name: string;
};

interface ISingleSelectField {
  form: any;
  name: string;
  labelText?: string;
  selectableItems: TSelectedItem[];
  noValidate?: boolean;
  className?: string;
}

const SingleSelectField: React.FC<ISingleSelectField> = ({
  form,
  labelText,
  name,
  selectableItems,
  noValidate = false,
  className = "",
}) => {
  const {
    control,
    setValue,
    formState: { isSubmitted },
  } = form as UseFormReturn;
  const handleSelectItem = (
    newSelectedItem: TSelectedItem,
    isSameItem: boolean,
  ) => {
    if (isSameItem) {
      setValue(name, null);
    } else {
      setValue(name, newSelectedItem);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { invalid } }) => (
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
            <FormControl>
              <ul
                className={cn(
                  "bg-background rounded-lg border border-border p-2 shadow-xs flex flex-wrap gap-x-2 gap-y-4",
                  className,
                )}
              >
                {selectableItems.map((selectableItem) => (
                  <li
                    key={selectableItem.key}
                    className="cursor-pointer"
                    onClick={() =>
                      handleSelectItem(
                        selectableItem,
                        field.value && field.value.key === selectableItem.key,
                      )
                    }
                  >
                    <Badge
                      variant={
                        field.value && field.value.key === selectableItem.key
                          ? "primary"
                          : "outline"
                      }
                    >
                      {selectableItem.name}
                    </Badge>
                  </li>
                ))}
              </ul>
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

export default SingleSelectField;
