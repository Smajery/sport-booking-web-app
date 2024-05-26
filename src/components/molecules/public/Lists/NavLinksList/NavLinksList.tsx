"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useLocale, useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";
import { useHeaderContext } from "@/layouts/Header/Header";
import { TLocale } from "@/navigation";

type TNavLink = {
  href: string;
  title: string;
};

interface INavbarLinksList {
  navItems: TNavLink[];
}

const NavbarLinksList: React.FC<INavbarLinksList> = ({ navItems }) => {
  const t = useTranslations(namespaces.LAYOUTS_HEADER_TITLES);

  const locale = useLocale() as TLocale;
  const pathname = usePathname();
  const { isHeaderScrolled } = useHeaderContext();

  return (
    <NavigationMenuList className="flex items-center space-x-4">
      {navItems.map((link, index) => (
        <NavigationMenuItem
          key={index}
          className={clsx("hover:underline", {
            underline: pathname.startsWith(
              `/${locale}/${link.href.split("/")[1]}`,
            ),
            "text-primary-foreground": isHeaderScrolled,
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
