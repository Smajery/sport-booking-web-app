import React from "react";
import { Badge } from "@/components/ui/badge";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";

type TSelectedItem = {
  key: string;
  name: string;
};

interface ISingleSelectField {
  form: any;
  name: string;
  labelText?: string;
  handleSelect: () => void;
  selectableItems: TSelectedItem[];
}

const SingleSelectField: React.FC<ISingleSelectField> = ({
  form,
  labelText,
  name,
  handleSelect,
  selectableItems,
}) => {
  const { control, setValue } = form as UseFormReturn;
  const handleSelectItem = (
    newSelectedItem: TSelectedItem,
    isSameItem: boolean,
  ) => {
    if (isSameItem) {
      setValue(name, null);
      handleSelect();
    } else {
      setValue(name, newSelectedItem);
      handleSelect();
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-y-unit-1">
          {labelText && (
            <FormLabel className="text-base text-primary font-semibold">
              {labelText}
            </FormLabel>
          )}
          <ul className="bg-background rounded-lg border-1 border-border p-unit-2 shadow-xs flex flex-wrap gap-x-unit-2 gap-y-unit-4">
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
        </FormItem>
      )}
    />
  );
};

export default SingleSelectField;
