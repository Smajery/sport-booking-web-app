"use client";

import React from "react";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavLinksList from "@/components/molecules/common/Lists/NavLinksList/NavLinksList";
import { siteConfig } from "@/config/site";
import SportBookingLogo from "@/components/atoms/common/Logos/SportBookingLogo/SportBookingLogo";
import NavAuthButtonsList from "@/components/molecules/public/Lists/NavAuthButtonsList/NavAuthButtonsList";
import { clsx } from "clsx";
import HeaderContent from "@/components/molecules/common/Contents/HeaderContent/HeaderContent";
import { locales, TLocale } from "@/navigation";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  const pathParts = pathname
    .split("/")
    .filter(Boolean)
    .filter((part) => !locales.includes(part as TLocale));

  const currentSubNavItems = pathParts.map((part, index) => ({
    text: part,
    href: `/${pathParts.slice(0, index + 1).join("/")}`,
  }));

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldFixHeader = scrollTop > 10;

      setIsScrolled(shouldFixHeader);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={clsx("sticky top-0 z-50", {
        "border-b-1 border-border": !isScrolled,
        "bg-primary shadow-bottom-sm": isScrolled,
      })}
    >
      <HeaderContent isScrolled={isScrolled} />
    </header>
  );
};

export default Header;
