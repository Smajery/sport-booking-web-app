import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import clsx from "clsx";
import { Button } from "@/components/ui/button";
import DynamicIcon from "@/components/atoms/Icons/DynamicIcon/DynamicIcon";
import { Input } from "@/components/ui/input";
import { XOctagon } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IDefaultField {
  form: any;
  iconName?: keyof typeof dynamicIconImports;
  name: string;
  type: string;
  labelText?: string;
  placeholder?: string;
  fieldDescription?: string;
  requestError?: [];
  isActiveIcon?: boolean;
  isClearable?: boolean;
}

const DefaultField: React.FC<IDefaultField> = ({
  form,
  iconName,
  name,
  type,
  labelText,
  placeholder,
  fieldDescription,
  isClearable,
  isActiveIcon,
  requestError,
}) => {
  const {
    formState: { isSubmitted },
    setValue,
  } = form;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState: { invalid } }) => (
        <FormItem className="flex flex-col gap-y-[16px] py-[5px]">
          {labelText && <FormLabel>{labelText}</FormLabel>}
          <div className="relative flex items-center">
            <FormControl>
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                value={field.value ? field.value : ""}
                // className={clsx(
                //   "",
                //   {
                //     "":
                //       (isSubmitted && invalid) || requestError,
                //     "": isSubmitted && !invalid && !requestError,
                //   },
                // )}
              />
            </FormControl>
            {isClearable ? (
              <Button
                variant="none"
                size="none"
                className="absolute right-[10px] cursor-pointer"
                type="button"
                onClick={() => setValue(name, "")}
              >
                <XOctagon className="w-[16px] h-[16px]" />
              </Button>
            ) : (
              <DynamicIcon
                name={iconName}
                className="w-[16px] h-[16px] absolute right-[16px]"
                // color={isActiveIcon ? "" : ""}
              />
            )}
          </div>
          {fieldDescription && (
            <FormDescription>{fieldDescription}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
};

export default DefaultField;
