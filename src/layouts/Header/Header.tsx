"use client";

import React from "react";
import { clsx } from "clsx";
import HeaderContent from "@/components/molecules/public/Contents/HeaderContent/HeaderContent";

type THeaderContext = {
  isHeaderScrolled: boolean;
};

const HeaderContext = React.createContext<THeaderContext | undefined>(
  undefined,
);

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

  const headerContextData: THeaderContext = {
    isHeaderScrolled: isScrolled,
  };

  return (
    <header
      className={clsx("sticky top-0 z-50", {
        "border-b border-border": !isScrolled,
        "bg-primary shadow-bottom-sm": isScrolled,
      })}
    >
      <HeaderContext.Provider value={headerContextData}>
        <HeaderContent />
      </HeaderContext.Provider>
    </header>
  );
};

export const useHeaderContext = (): THeaderContext => {
  const context = React.useContext(HeaderContext);
  if (!context) {
    throw new Error("headerAuthContext must be used within an HeaderProvider");
  }
  return context;
};

export default Header;
