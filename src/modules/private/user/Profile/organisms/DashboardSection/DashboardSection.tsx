import React from "react";
import ProfileDashboardList from "@/components/molecules/private/user/Lists/ProfileDashboardList/ProfileDashboardList";
import BecameOwnerButton from "@/components/atoms/private/user/Buttons/BecameOwnerButton/BecameOwnerButton";

const DashboardSection = () => {
  return (
    <section className="shrink-0 pt-[60px] pr-5 flex flex-col gap-y-5 w-[300px] border-r border-border">
      <ProfileDashboardList />
    </section>
  );
};

export default DashboardSection;
