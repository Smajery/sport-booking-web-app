"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";
import process from "process";

interface IApplyBookButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const ApplyButton: React.FC<IApplyBookButton> = ({ asChild, ...props }) => {
  const { push } = useRouter();
  return (
    <Button
      variant="none"
      size="md"
      className="book-gradient text-white"
      {...props}
      onClick={() => push(process.env.NEXT_PUBLIC_LIQPAY_PAY_URL)}
    >
      Apply
    </Button>
  );
};

export default ApplyButton;
