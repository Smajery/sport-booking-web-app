"use client";

import NavLinksList from "@/components/molecules/Lists/NavLinksList/NavLinksList";
import { siteConfig } from "@/config/site";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavAuthButtonsList from "@/components/molecules/Lists/NavAuthButtonsList/NavAuthButtonsList";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto">
        <NavigationMenu className="max-w-full justify-between hidden md:flex">
          <div className="flex">
            <NavLinksList navItems={siteConfig.publicNavItems} />
          </div>
          <div className="flex">
            <NavAuthButtonsList />
          </div>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
