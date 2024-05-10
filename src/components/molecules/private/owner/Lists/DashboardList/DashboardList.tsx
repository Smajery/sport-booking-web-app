"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { dashboardConfig } from "@/config/private/owner/dashboard";
import DashboardItem from "@/components/molecules/private/owner/Items/DashboardItem/DashboardItem";

const DashboardList = () => {
  const pathname = usePathname();
  return (
    <NavigationMenu className="max-w-full hidden items-start justify-start md:flex">
      <NavigationMenuList className="flex flex-col gap-y-5 items-start justify-start space-x-0">
        {dashboardConfig.dashboardItems.map((item) => (
          <DashboardItem
            item={item}
            isCurrent={pathname.endsWith(item.href.slice(1))}
            key={item.name}
          />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DashboardList;
