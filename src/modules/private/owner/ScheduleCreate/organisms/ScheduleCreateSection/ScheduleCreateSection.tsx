import React from "react";
import CreateScheduleForm from "@/components/molecules/private/owner/Form/CreateScheduleForm/CreateScheduleForm";

const ScheduleCreateSection = () => {
  return (
    <section className="flex flex-col gap-y-10 pt-5 pl-5">
      <CreateScheduleForm />
    </section>
  );
};

export default ScheduleCreateSection;
