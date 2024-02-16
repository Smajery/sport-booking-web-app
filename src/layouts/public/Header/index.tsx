import NavLinksList from "@/components/molecules/common/Lists/NavLinksList/NavLinksList";
import { siteConfig } from "@/config/site";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavAuthButtonsList from "@/components/molecules/public/Lists/NavAuthButtonsList/NavAuthButtonsList";
import React from "react";
import SportBookingLogo from "@/components/atoms/common/Logos/SportBookingLogo/SportBookingLogo";
import { clsx } from "clsx";
import { throttle } from "lodash";

const Header = () => {
  const [isFixed, setIsFixed] = React.useState(false);
  const headerRef = React.useRef(null);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const heightMarker = 20;

  const handleScroll = React.useMemo(
    () =>
      throttle(() => {
        const scrollTop = window.scrollY;
        setIsFixed(scrollTop > heightMarker);
      }, 100),
    [],
  );

  React.useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [isFixed]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <header
        ref={headerRef}
        id="headerId"
        style={{ paddingTop: isFixed ? 0 : `${heightMarker}px` }}
        className={clsx("", {
          "w-full fixed bg-primary shadow-bottom-sm z-[1000]": isFixed,
        })}
      >
        <div className="container mx-auto">
          <NavigationMenu className="py-unit-5 max-w-full justify-between hidden md:flex">
            <div className="flex items-center">
              <SportBookingLogo isFixedHeader={isFixed} className="mr-unit-5" />
              <NavLinksList navItems={siteConfig.publicNavItems} />
            </div>
            <NavAuthButtonsList />
          </NavigationMenu>
        </div>
      </header>
      {isFixed && (
        <div
          style={{ height: isFixed ? `${headerHeight + heightMarker}px` : 0 }}
        ></div>
      )}
    </>
  );
};

export default Header;
