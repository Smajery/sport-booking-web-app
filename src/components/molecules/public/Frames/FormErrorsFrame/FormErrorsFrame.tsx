import React from "react";
import { cn } from "@/lib/utils";

interface IFormErrorsFrame {
  formErrors: { [key: string]: any };
  className?: string;
}

const FormErrorsFrame: React.FC<IFormErrorsFrame> = ({
  formErrors,
  className,
}) => {
  return Object.keys(formErrors).length !== 0 ? (
    <div className={cn("flex flex-col text-sm text-destructive", className)}>
      {Object.keys(formErrors).map((formError) => (
        <p key={formError}>{formErrors[formError]}</p>
      ))}
    </div>
  ) : null;
};

export default FormErrorsFrame;
