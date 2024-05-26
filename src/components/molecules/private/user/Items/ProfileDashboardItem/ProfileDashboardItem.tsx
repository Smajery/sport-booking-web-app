import React from "react";
import { clsx } from "clsx";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { names } from "@/utils/constants/routes.constants";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

type TItem = {
  href: string;
  name: string;
};

interface IProfileDashboardItem {
  item: TItem;
  isCurrent: boolean;
}

const ProfileDashboardItem: React.FC<IProfileDashboardItem> = ({
  item,
  isCurrent,
}) => {
  const tDTtl = useTranslations(namespaces.DASHBOARDS_PROFILE_TITLES);
  const { name, href } = item;

  const isDisabled =
    name === names.NOTIFICATION ||
    name === names.ABOUT ||
    name === names.PRIVACY ||
    name === names.HELP;

  return (
    <NavigationMenuItem
      className={clsx("", {
        "pointer-events-none opacity-50": isDisabled,
      })}
    >
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

export default ProfileDashboardItem;
