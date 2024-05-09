import "@/app/[locale]/globals.css";
import DashboardSection from "@/modules/private/Profile/organisms/DashboardSection/DashboardSection";
import React, { ReactNode } from "react";

export const metadata = {
  title: "Profile",
  description: "Profile page",
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto flex justify-between">
      <DashboardSection />
      {children}
    </div>
  );
}
