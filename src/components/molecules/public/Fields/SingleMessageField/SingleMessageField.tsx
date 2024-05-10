import React from "react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

interface ISingleMessageField {
  form: any;
  name: string;
  className?: string;
}

const SingleMessageField: React.FC<ISingleMessageField> = ({
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

export default SingleMessageField;
