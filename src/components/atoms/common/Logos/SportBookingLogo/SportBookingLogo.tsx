import React from "react";
import Link from "next/link";
import { ROUTE_HOME } from "@/utils/constants/routes.constants";
import { Anton } from "next/font/google";
import { clsx } from "clsx";

const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
});

interface ISportBookingLogo {
  className?: string;
  isScrolledHeader: boolean;
}

const SportBookingLogo: React.FC<ISportBookingLogo> = ({
  className = "",
  isScrolledHeader,
}) => {
  return (
    <div className={`flex flex-col ${className} ${anton.className}`}>
      <Link
        href={ROUTE_HOME}
        className={clsx(
          "uppercase font-extrabold text-2xl leading-6 text-center",
          {
            "text-background": isScrolledHeader,
            "text-primary": !isScrolledHeader,
          },
        )}
      >
        Sport <br /> Booking
      </Link>
    </div>
  );
};

export default SportBookingLogo;
