import {
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import LoginButton from "@/components/atoms/public/Buttons/LoginButton/LoginButton";
import SignUpButton from "@/components/atoms/public/Buttons/SignUpButton/SignUpButton";
import React from "react";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

const NavAuthButtonsList = () => {
  const tHTtl = useTranslations(namespaces.LAYOUTS_HEADER_TITLES);
  return (
    <NavigationMenuList className="gap-x-4">
      <NavigationMenuItem>
        <LoginButton>{tHTtl("login")}</LoginButton>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <SignUpButton>{tHTtl("signUp")}</SignUpButton>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};

export default NavAuthButtonsList;
