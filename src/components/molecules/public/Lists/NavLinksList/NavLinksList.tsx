import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

type TNavLink = {
  href: string;
  key: string;
  text: string;
};

interface INavbarLinksList {
  navItems: TNavLink[];
}

const NavbarLinksList: React.FC<INavbarLinksList> = ({ navItems }) => {
  const pathname = usePathname();
  const rootHref = "/" + pathname.split("/")[1];
  return (
    <NavigationMenuList className="flex items-center py-[20px]">
      {navItems.map((link) => (
        <NavigationMenuItem
          key={link.key}
          className={clsx("hover:underline", {
            underline: link.href === rootHref,
            "": link.href !== rootHref,
          })}
        >
          <Link href={link.href} legacyBehavior passHref>
            <NavigationMenuLink className="">{link.text}</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  );
};

export default NavbarLinksList;
