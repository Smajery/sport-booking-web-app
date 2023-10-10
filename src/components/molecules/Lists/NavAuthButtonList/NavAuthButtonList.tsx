import { Button } from "@/components/ui/button";
import {
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";
import { ROUTE_LOGIN, ROUTE_SIGNUP } from "@/utils/constants/routes.constants";

const NavAuthButtonsList = () => {
  const { push } = useRouter();
  return (
    <NavigationMenuList className="gap-x-unit-3_5">
      <NavigationMenuItem>
        <Button onClick={() => push(ROUTE_LOGIN)}>Вхід</Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button onClick={() => push(ROUTE_SIGNUP)}>Реєстрація</Button>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};

export default NavAuthButtonsList;
