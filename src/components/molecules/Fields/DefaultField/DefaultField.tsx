import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@nextui-org/input";

interface IDefaultField {
  form: any;
  name: string;
  labelText?: string;
  placeholder?: string;
  fieldDescription?: string;
}

const DefaultField: React.FC<IDefaultField> = ({
  form,
  name,
  labelText,
  placeholder,
  fieldDescription,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-y-[10px] py-[5px]">
          {labelText && <FormLabel>{labelText}</FormLabel>}
          <FormControl>
            <Input placeholder={placeholder ?? ""} {...field} />
          </FormControl>
          {fieldDescription && (
            <FormDescription>{fieldDescription}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DefaultField;
