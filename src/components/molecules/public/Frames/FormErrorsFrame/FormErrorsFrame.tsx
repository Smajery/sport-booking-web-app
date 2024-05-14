import React from "react";
import { cn } from "@/lib/utils";

interface IFormErrorsFrame {
  fieldErrors: { [key: string]: any };
  className?: string;
}

const FormErrorsFrame: React.FC<IFormErrorsFrame> = ({
  fieldErrors,
  className,
}) => {
  return Object.keys(fieldErrors).length !== 0 ? (
    <div className={cn("flex flex-col text-sm text-destructive", className)}>
      {Object.keys(fieldErrors).map((fieldError) => (
        <p key={fieldError}>{fieldErrors[fieldError]}</p>
      ))}
    </div>
  ) : null;
};

export default FormErrorsFrame;
