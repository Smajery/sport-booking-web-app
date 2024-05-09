"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ProfileDashboardItem from "@/components/molecules/private/Items/ProfileDashboardItem";
import { profileConfig } from "@/config/private/profile";
import { usePathname } from "next/navigation";

const ProfileDashboardList = () => {
  const pathname = usePathname();
  return (
    <NavigationMenu className="max-w-full hidden items-start justify-start md:flex">
      <NavigationMenuList className="flex flex-col gap-y-unit-5 items-start justify-start space-x-0">
        {profileConfig.dashboardItems.map((item) => (
          <ProfileDashboardItem
            item={item}
            isCurrent={pathname.endsWith(item.key)}
            key={item.key}
          />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default ProfileDashboardList;
