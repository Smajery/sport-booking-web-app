"use client";

import React from "react";
import Link from "next/link";
import { Comic_Neue } from "next/font/google";
import { clsx } from "clsx";
import { routes } from "@/utils/constants/routes.constants";
import { useHeaderContext } from "@/layouts/Header/Header";

const anton = Comic_Neue({
  weight: ["700"],
  subsets: ["latin"],
});

interface ISportBookingLogo {
  className?: string;
}

const FacilityBookingLogo: React.FC<ISportBookingLogo> = ({
  className = "",
}) => {
  const { isHeaderScrolled } = useHeaderContext();

  return (
    <div className={`flex flex-col ${className} ${anton.className}`}>
      <Link
        href={routes.HOME}
        className={clsx(
          "uppercase font-extrabold text-2xl leading-6 text-center",
          {
            "text-primary-foreground": isHeaderScrolled,
            "text-primary": !isHeaderScrolled,
          },
        )}
      >
        Facility <br /> <span className="ml-5">Booking</span>
      </Link>
    </div>
  );
};

export default FacilityBookingLogo;
