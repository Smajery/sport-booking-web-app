"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { v4 as uuidv4 } from "uuid";

interface IApplyBookButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  amount: number;
  description: string;
  asChild?: boolean;
}

const ApplyButton: React.FC<IApplyBookButton> = ({
  amount,
  description,
  asChild,
  ...props
}) => {
  const data = {
    version: 3,
    public_key: process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY as string,
    action: "pay",
    amount: amount,
    currency: "UAH",
    description: description,
    order_id: uuidv4(),
    language: "en",
  };

  const privateKey = process.env.NEXT_PUBLIC_LIQPAY_PRIVATE_KEY as string;

  const dataBase64 = Buffer.from(JSON.stringify(data)).toString("base64");

  const handlePayment = async () => {
    const liqPayCheckoutUrl = `https://www.liqpay.ua/api/3/checkout?data=${encodeURIComponent(dataBase64)}`;
    window.location.href = liqPayCheckoutUrl;
  };

  return (
    <Button
      variant="none"
      size="md"
      className="book-gradient text-white"
      {...props}
      onClick={handlePayment}
    >
      Pay
    </Button>
  );
};

export default ApplyButton;
