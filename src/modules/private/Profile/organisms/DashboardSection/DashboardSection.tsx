import React from "react";
import ProfileDashboardList from "@/components/molecules/private/Lists/ProfileDashboardList/ProfileDashboardList";

const DashboardSection = () => {
  return (
    <section className="pt-[60px] flex flex-col w-[300px] border-r-1 border-border">
      <ProfileDashboardList />
    </section>
  );
};

export default DashboardSection;
