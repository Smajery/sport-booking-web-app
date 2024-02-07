import {
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import LoginButton from "@/components/atoms/Buttons/public/LoginButton/LoginButton";
import SignUpButton from "@/components/atoms/Buttons/public/SignUpButton/SignUpButton";

const NavAuthButtonsList = () => {
  return (
    <NavigationMenuList className="gap-x-unit-3_5">
      <NavigationMenuItem>
        <LoginButton>Login</LoginButton>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <SignUpButton>Sign up</SignUpButton>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};

export default NavAuthButtonsList;
