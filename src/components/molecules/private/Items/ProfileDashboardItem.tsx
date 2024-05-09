import React from "react";
import { clsx } from "clsx";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

type TItem = {
  key: string;
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
  const { key, name, href } = item;

  const isDisabled =
    key === "notification" ||
    key === "about" ||
    key === "privacy" ||
    key === "help";

  return (
    <NavigationMenuItem
      className={clsx("", {
        "pointer-events-none opacity-50": isDisabled,
      })}
    >
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={clsx("text-xl", {
            "font-semibold": isCurrent,
          })}
        >
          {name}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default ProfileDashboardItem;
