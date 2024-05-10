import React from "react";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { ApolloError } from "@apollo/client";
import { cn } from "@/lib/utils";

interface IApolloErrorFrame {
  error: ApolloError | undefined;
  className?: string;
}

const ApolloErrorFrame: React.FC<IApolloErrorFrame> = ({
  error,
  className = "",
}) => {
  return error ? (
    <div className={cn("px-5 text-sm text-destructive", className)}>
      <p>{getApolloErrorMessage(error)}</p>
    </div>
  ) : null;
};

export default ApolloErrorFrame;
