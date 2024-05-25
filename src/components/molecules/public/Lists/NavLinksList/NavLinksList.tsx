import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

type TNavLink = {
  href: string;
  title: string;
};

interface INavbarLinksList {
  navItems: TNavLink[];
}

const NavbarLinksList: React.FC<INavbarLinksList> = ({ navItems }) => {
  const t = useTranslations(namespaces.LAYOUTS_HEADER_TITLES);
  const pathname = usePathname();
  const rootHref = "/" + pathname.split("/")[1];
  return (
    <NavigationMenuList className="flex items-center space-x-4">
      {navItems.map((link, index) => (
        <NavigationMenuItem
          key={index}
          className={clsx("hover:underline", {
            underline: link.href === rootHref,
            "": link.href !== rootHref,
          })}
        >
          <Link href={link.href} legacyBehavior passHref>
            <NavigationMenuLink className="">
              {t(link.title)}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  );
};

export default NavbarLinksList;
