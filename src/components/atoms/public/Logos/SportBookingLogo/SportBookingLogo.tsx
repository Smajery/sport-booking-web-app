import React from "react";
import Link from "next/link";
import { Anton } from "next/font/google";
import { clsx } from "clsx";
import { routes } from "@/utils/constants/routes.constants";

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
        href={routes.HOME}
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
