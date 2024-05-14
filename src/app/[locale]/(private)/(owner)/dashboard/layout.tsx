import "@/app/[locale]/globals.css";
import DashboardSection from "@/modules/private/owner/Dashboard/organisms/DashboardSection/DashboardSection";
import React, { ReactNode } from "react";

export const metadata = {
  title: {
    template: "%s | Dashboard",
    default: "Dashboard",
  },
  description: "Dashboard page",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto flex justify-between">
      <DashboardSection />
      {children}
    </div>
  );
}
