"use client";

import React from "react";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavLinksList from "@/components/molecules/common/Lists/NavLinksList/NavLinksList";
import { siteConfig } from "@/config/site";
import SportBookingLogo from "@/components/atoms/common/Logos/SportBookingLogo/SportBookingLogo";
import NavAuthButtonsList from "@/components/molecules/public/Lists/NavAuthButtonsList/NavAuthButtonsList";
import { clsx } from "clsx";

const Header = () => {
  const { user } = useAuthContext();

  const headerRef = React.useRef(null);
  const [isFixed, setIsFixed] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldFixHeader = scrollTop > 12;

      setIsFixed(shouldFixHeader);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const renderHeaderContent = () => {
    // if (user) {
    //   return <HeaderTemplate />;
    // }
    if (user) {
      return (
        <div className="container mx-auto">
          <NavigationMenu className="max-w-full justify-between hidden md:flex">
            <NavLinksList navItems={siteConfig.privateNavItems} />
          </NavigationMenu>
        </div>
      );
    } else {
      return (
        <div className="container mx-auto">
          <NavigationMenu className="py-unit-5 max-w-full justify-between hidden md:flex">
            <div className="flex items-center">
              <SportBookingLogo isFixedHeader={isFixed} className="mr-unit-5" />
              <NavLinksList navItems={siteConfig.publicNavItems} />
            </div>
            <NavAuthButtonsList />
          </NavigationMenu>
        </div>
      );
    }
  };

  return (
    <header
      style={{
        height: isFixed ? `${headerRef.current?.offsetHeight}px` : "auto",
      }}
      className="mb-unit-5"
    >
      <div
        ref={headerRef}
        id="headerId"
        className={clsx("", {
          "w-full fixed bg-primary shadow-bottom-sm z-[1000]": isFixed,
          "pt-unit-3 border-b-1 border-border": !isFixed,
        })}
      >
        {renderHeaderContent()}
      </div>
    </header>
  );
};

export default Header;
