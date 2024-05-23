"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ProfileDashboardItem from "@/components/molecules/private/user/Items/ProfileDashboardItem/ProfileDashboardItem";
import { profileConfig } from "@/config/private/user/profile";
import { usePathname } from "next/navigation";

const ProfileDashboardList = () => {
  const pathname = usePathname();
  return (
    <NavigationMenu className="hidden items-start justify-start md:flex">
      <NavigationMenuList className="flex flex-col gap-y-5 items-start justify-start space-x-0">
        {profileConfig.dashboardItems.map((item) => (
          <ProfileDashboardItem
            item={item}
            isCurrent={pathname.endsWith(item.href.slice(1))}
            key={item.name}
          />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default ProfileDashboardList;
