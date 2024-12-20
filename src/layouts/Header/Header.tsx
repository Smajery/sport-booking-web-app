"use client";

import React from "react";
import { clsx } from "clsx";
import HeaderContent from "@/components/molecules/public/Contents/HeaderContent/HeaderContent";

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

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
        "border-b border-border": !isScrolled,
        "bg-primary shadow-bottom-sm": isScrolled,
      })}
    >
      <HeaderContent isScrolled={isScrolled} />
    </header>
  );
};

export default Header;
