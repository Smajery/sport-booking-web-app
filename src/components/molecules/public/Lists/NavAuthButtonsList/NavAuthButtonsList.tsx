import {
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import LoginButton from "@/components/atoms/public/Buttons/LoginButton/LoginButton";
import SignUpButton from "@/components/atoms/public/Buttons/SignUpButton/SignUpButton";
import React from "react";

interface INavAuthButtonsList {
  isScrolled: boolean;
}

const NavAuthButtonsList: React.FC<INavAuthButtonsList> = ({ isScrolled }) => {
  return (
    <NavigationMenuList className="gap-x-4">
      <NavigationMenuItem>
        <LoginButton isScrolled={isScrolled}>Login</LoginButton>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <SignUpButton isScrolled={isScrolled}>Sign up</SignUpButton>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};

export default NavAuthButtonsList;
