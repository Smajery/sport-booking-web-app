import React from "react";
import DashboardList from "@/components/molecules/private/owner/Lists/DashboardList/DashboardList";

const DashboardSection = () => {
  return (
    <section className="pt-[60px] flex flex-col w-[300px] border-r border-border">
      <DashboardList />
    </section>
  );
};

export default DashboardSection;
