import React from "react";
import { Badge } from "@/components/ui/badge";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { TSelectedItem } from "@/types/commonTypes";

interface ISingleSelectField {
  form: any;
  name: string;
  labelText?: string;
  selectableItems: TSelectedItem[];
  className?: string;
}

const SingleSelectField: React.FC<ISingleSelectField> = ({
  form,
  labelText,
  name,
  selectableItems,
  className = "",
}) => {
  const { control, setValue } = form as UseFormReturn;
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
      render={({ field: { value } }) => (
        <FormItem className="flex flex-col space-y-1">
          {labelText && (
            <FormLabel className="text-base text-primary font-semibold">
              {labelText}
            </FormLabel>
          )}
          <FormControl>
            <div
              className={cn(
                "min-h-[52px] bg-background rounded-lg border border-border p-2 shadow-xs flex flex-wrap gap-x-2 gap-y-4",
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
        </FormItem>
      )}
    />
  );
};

export default SingleSelectField;
