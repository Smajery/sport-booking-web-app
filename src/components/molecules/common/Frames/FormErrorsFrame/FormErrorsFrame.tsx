import React from "react";
import { cn } from "@/lib/utils";

interface IFormErrorsFrame {
  requestErrors: { [key: string]: any };
  className?: string;
}

const FormErrorsFrame: React.FC<IFormErrorsFrame> = ({
  requestErrors,
  className,
}) => {
  return Object.keys(requestErrors).length !== 0 ? (
    <div className={cn("flex flex-col text-destructive", className)}>
      {Object.keys(requestErrors).map((requestError) => (
        <p key={requestError}>{requestErrors[requestError]}</p>
      ))}
    </div>
  ) : null;
};

export default FormErrorsFrame;
