"use client";

import React from "react";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavLinksList from "@/components/molecules/public/Lists/NavLinksList/NavLinksList";
import { siteConfig } from "@/config/site";
import FacilityBookingLogo from "@/components/atoms/public/Logos/FacilityBookingLogo/FacilityBookingLogo";
import NavAuthButtonsList from "@/components/molecules/public/Lists/NavAuthButtonsList/NavAuthButtonsList";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserHeaderAvatar from "@/components/atoms/private/user/Avatars/UserHeaderAvatar/UserHeaderAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import SelectLanguageButton from "@/components/atoms/public/Buttons/SelectLanguageButton/SelectLanguageButton";
import { useHeaderContext } from "@/layouts/Header/Header";
import { clsx } from "clsx";

const HeaderContent = () => {
  const { isHeaderScrolled } = useHeaderContext();

  const { user, isAuth, isAuthLoading, handleLogout } = useAuthContext();

  const isHasUserCurrentRole = (role: string) => {
    return user && user.roles.some((userRole) => userRole.value === role);
  };

  // const renderLeftNavContent = () => {
  //   if (isAuth) {
  //     return <NavLinksList navItems={siteConfig.privateNavItems} />;
  //   }
  // };

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
      if (isHasUserCurrentRole("USER")) {
        return (
          <div className="flex items-center gap-x-4">
            {isHasUserCurrentRole("OWNER") ? (
              <NavLinksList navItems={siteConfig.privateNavItems.owner} />
            ) : (
              <NavLinksList navItems={siteConfig.privateNavItems.user} />
            )}
            <UserHeaderAvatar />
            <Button
              variant="none"
              size="none"
              className={clsx("cursor-pointer", {
                "text-primary-foreground": isHeaderScrolled,
              })}
              asChild
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        );
      }
    } else {
      return <NavAuthButtonsList />;
    }
  };

  return (
    <div className="py-5 container mx-auto">
      <NavigationMenu className="max-w-full justify-between hidden md:flex">
        <div className="flex items-center gap-x-4">
          <FacilityBookingLogo className="mr-5" />
          <NavLinksList navItems={siteConfig.publicNavItems} />
          <SelectLanguageButton />
          {/*{renderLeftNavContent()}*/}
        </div>
        <div className="flex items-center gap-x-4">
          {renderRightNavContent()}
        </div>
      </NavigationMenu>
    </div>
  );
};

export default HeaderContent;
