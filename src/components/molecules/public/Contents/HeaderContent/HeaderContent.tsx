"use client";

import React from "react";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavLinksList from "@/components/molecules/public/Lists/NavLinksList/NavLinksList";
import { siteConfig } from "@/config/site";
import SportBookingLogo from "@/components/atoms/public/Logos/SportBookingLogo/SportBookingLogo";
import NavAuthButtonsList from "@/components/molecules/public/Lists/NavAuthButtonsList/NavAuthButtonsList";
import HeaderTemplate from "@/layouts/Header/templates/HeaderTemplate/HeaderTemplate";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";
import UserHeaderAvatar from "@/components/atoms/private/user/Avatars/UserHeaderAvatar/UserHeaderAvatar";
import { Skeleton } from "@/components/ui/skeleton";

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
    if (isAuthLoading) {
      return (
        <div className="flex gap-x-4">
          <Skeleton className="rounded-full w-[80px] h-[36px]" />
          <Skeleton className="rounded-full w-[100px] h-[36px]" />
        </div>
      );
    }
    if (isAuth) {
      return (
        <div className="flex items-center gap-x-4">
          <Button
            variant="none"
            size="none"
            onClick={() => push(routes.DASHBOARD)}
          >
            Dashboard
          </Button>
          <Button
            variant="none"
            size="none"
            onClick={() => push(routes.PROFILE)}
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
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      );
    } else {
      return <NavAuthButtonsList isScrolled={isScrolled} />;
    }
  };

  return (
    <div className="py-5 container mx-auto">
      <NavigationMenu className="max-w-full justify-between hidden md:flex">
        <div className="flex items-center">
          <SportBookingLogo isScrolledHeader={isScrolled} className="mr-5" />
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
