import React from "react";
import { clsx } from "clsx";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

type TItem = {
  href: string;
  name: string;
};

interface IDashboardItem {
  item: TItem;
  isCurrent: boolean;
}

const DashboardItem: React.FC<IDashboardItem> = ({ item, isCurrent }) => {
  const tDTtl = useTranslations(namespaces.DASHBOARDS_OWNER_TITLES);

  const { name, href } = item;

  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={clsx("text-xl", {
            "font-semibold text-primary": isCurrent,
          })}
        >
          {tDTtl(name)}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default DashboardItem;
