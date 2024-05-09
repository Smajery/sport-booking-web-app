"use client";

import React from "react";

import { getErrorMessage } from "@/utils/helpers/error.helpers";

interface IErrorSection {
  error: Error & { digest?: string };
}

const ErrorSection: React.FC<IErrorSection> = ({ error }) => {
  return (
    <section className="w-full flex flex-col items-center justify-center">
      <p className="text-xlg">{getErrorMessage(error)}</p>
    </section>
  );
};

export default ErrorSection;
