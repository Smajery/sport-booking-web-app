"use client";

import NavLinksList from "@/components/molecules/common/Lists/NavLinksList/NavLinksList";
import { siteConfig } from "@/config/site";
import { NavigationMenu } from "@/components/ui/navigation-menu";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto mt-unit-15 mb-unit-10">
        <NavigationMenu className="max-w-full justify-between hidden md:flex">
          <NavLinksList navItems={siteConfig.privateNavItems} />
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
