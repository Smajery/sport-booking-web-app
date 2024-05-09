"use client";

import React from "react";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavLinksList from "@/components/molecules/common/Lists/NavLinksList/NavLinksList";
import { siteConfig } from "@/config/site";
import SportBookingLogo from "@/components/atoms/common/Logos/SportBookingLogo/SportBookingLogo";
import NavAuthButtonsList from "@/components/molecules/public/Lists/NavAuthButtonsList/NavAuthButtonsList";
import HeaderTemplate from "@/layouts/Header/templates/HeaderTemplate/HeaderTemplate";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTE_PROFILE } from "@/utils/constants/routes.constants";
import UserHeaderAvatar from "@/components/atoms/private/Avatars/UserHeaderAvatar/UserHeaderAvatar";

interface IHeaderContent {
  isScrolled: boolean;
}

const HeaderContent: React.FC<IHeaderContent> = ({ isScrolled }) => {
  const { push } = useRouter();
  const { isAuth, isAuthLoading, handleLogout } = useAuthContext();

  const renderLeftNavContent = () => {
    if (isAuth) {
      return <NavLinksList navItems={siteConfig.privateNavItems} />;
    }
  };

  const renderRightNavContent = () => {
    if (isAuth) {
      return (
        <div className="flex items-center gap-x-unit-4">
          <Button
            variant="none"
            size="none"
            onClick={() => push(ROUTE_PROFILE)}
          >
            Profile
          </Button>
          <UserHeaderAvatar />
          <Button
            variant="none"
            size="none"
            className=""
            asChild
            onClick={handleLogout}
          >
            <LogOut className="w-unit-5 h-unit-5" />
          </Button>
        </div>
      );
    } else {
      return <NavAuthButtonsList />;
    }
  };

  return isAuthLoading ? (
    <HeaderTemplate />
  ) : (
    <div className="py-unit-5 container mx-auto">
      <NavigationMenu className="max-w-full justify-between hidden md:flex">
        <div className="flex items-center">
          <SportBookingLogo
            isScrolledHeader={isScrolled}
            className="mr-unit-5"
          />
          <NavLinksList navItems={siteConfig.publicNavItems} />
          {renderLeftNavContent()}
        </div>
        <div className="flex items-center">
          {/*<LanguageSelect />*/}
          {renderRightNavContent()}
        </div>
      </NavigationMenu>
    </div>
  );
};

export default HeaderContent;
