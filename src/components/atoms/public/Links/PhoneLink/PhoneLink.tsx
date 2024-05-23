import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface IPhoneLink {
  phone: string;
  className?: string;
}

const PhoneLink: React.FC<IPhoneLink> = ({ phone, className = "" }) => {
  return (
    <Link
      href={`tel:${phone}`}
      className={cn("max-w-max hover:underline", className)}
    >
      {phone}
    </Link>
  );
};

export default PhoneLink;
