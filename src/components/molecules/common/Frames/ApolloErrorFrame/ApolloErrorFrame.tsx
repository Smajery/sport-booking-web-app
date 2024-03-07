import React from "react";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { ApolloError } from "@apollo/client";

interface IApolloErrorFrame {
  error: ApolloError | undefined;
}

const ApolloErrorFrame: React.FC<IApolloErrorFrame> = ({ error }) => {
  return error ? (
    <div className="px-unit-5">
      <p className="text-sm text-destructive">{getApolloErrorMessage(error)}</p>
    </div>
  ) : null;
};

export default ApolloErrorFrame;
