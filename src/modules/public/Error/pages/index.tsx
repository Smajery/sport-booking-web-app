import ErrorSection from "@/modules/public/Error/organisms/ErrorSection/ErrorSection";
import React from "react";

interface IErrorPage {
  error: Error & { digest?: string };
}

const ErrorPage: React.FC<IErrorPage> = ({ error }) => {
  return (
    <div className="container mx-auto flex justify-center">
      <ErrorSection error={error} />
    </div>
  );
};

export default ErrorPage;
