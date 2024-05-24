import React from "react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

interface IErrorMessageField {
  form: any;
  name: string;
  className?: string;
}

const ErrorMessageField: React.FC<IErrorMessageField> = ({
  form,
  name,
  className,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className={className}>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ErrorMessageField;
