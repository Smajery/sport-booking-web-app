"use client";

import React from "react";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavLinksList from "@/components/molecules/common/Lists/NavLinksList/NavLinksList";
import { siteConfig } from "@/config/site";
import SportBookingLogo from "@/components/atoms/common/Logos/SportBookingLogo/SportBookingLogo";
import NavAuthButtonsList from "@/components/molecules/public/Lists/NavAuthButtonsList/NavAuthButtonsList";
import HeaderTemplate from "@/layouts/Header/templates/HeaderTemplate/HeaderTemplate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAbbreviation } from "@/utils/helpers/text.helpers";

interface IHeaderContent {
  isScrolled: boolean;
}

const HeaderContent: React.FC<IHeaderContent> = ({ isScrolled }) => {
  const { isAuth, isAuthLoading, user } = useAuthContext();

  const renderLeftNavContent = () => {
    if (isAuth) {
      return <NavLinksList navItems={siteConfig.privateNavItems} />;
    }
  };

  const renderRightNavContent = () => {
    if (isAuth && user) {
      return (
        <Avatar>
          {user.avatar && <AvatarImage src={user.avatar} />}
          <AvatarFallback>
            {user.fullname ? getAbbreviation(user.fullname) : ""}
          </AvatarFallback>
        </Avatar>
      );
    } else {
      return <NavAuthButtonsList />;
    }
  };

  return isAuthLoading ? (
    <HeaderTemplate />
  ) : (
    <div className="container mx-auto">
      <NavigationMenu className="py-unit-5 max-w-full justify-between hidden md:flex">
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
