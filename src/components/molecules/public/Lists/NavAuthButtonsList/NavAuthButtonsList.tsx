import {
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import LoginButton from "@/components/atoms/public/Buttons/LoginButton/LoginButton";
import SignUpButton from "@/components/atoms/public/Buttons/SignUpButton/SignUpButton";

const NavAuthButtonsList = () => {
  return (
    <NavigationMenuList className="gap-x-unit-4">
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
