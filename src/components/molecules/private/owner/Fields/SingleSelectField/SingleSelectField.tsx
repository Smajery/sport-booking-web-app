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
import { TSelectedItem } from "@/types/commonTypes";

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
      render={({ field: { value }, fieldState: { invalid } }) => (
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
              <div
                className={cn(
                  "bg-background rounded-lg border border-border p-2 shadow-xs flex flex-wrap gap-x-2 gap-y-4 text-lg",
                  className,
                )}
              >
                {selectableItems.map((selectableItem) => (
                  <div
                    key={selectableItem.key}
                    className="cursor-pointer"
                    onClick={() =>
                      handleSelectItem(
                        selectableItem,
                        value && value.key === selectableItem.key,
                      )
                    }
                  >
                    <Badge
                      variant={
                        value && value.key === selectableItem.key
                          ? "primary"
                          : "outline"
                      }
                    >
                      {selectableItem.name}
                    </Badge>
                  </div>
                ))}
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

export default SingleSelectField;
