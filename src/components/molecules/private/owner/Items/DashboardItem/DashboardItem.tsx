import React from "react";
import { clsx } from "clsx";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

type TItem = {
  href: string;
  name: string;
};

interface IDashboardItem {
  item: TItem;
  isCurrent: boolean;
}

const DashboardItem: React.FC<IDashboardItem> = ({ item, isCurrent }) => {
  const { name, href } = item;

  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={clsx("text-xl", {
            "font-semibold text-primary": isCurrent,
          })}
        >
          {name}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default DashboardItem;
