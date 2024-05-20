import React from "react";
import { clsx } from "clsx";
import { TTimeSlot } from "@/types/commonTypes";
import { facilityConfig } from "@/config/public/facility";

interface IDaysOfWeekList {
  selectedDayOfWeek: number;
  setSelectedDayOfWeek: (value: number) => void;
  timeSlots: TTimeSlot[];
}

const DaysOfWeekList: React.FC<IDaysOfWeekList> = ({
  selectedDayOfWeek,
  setSelectedDayOfWeek,
  timeSlots,
}) => {
  const dayAvailability = facilityConfig.daysOfWeek.reduce(
    (acc, day) => {
      acc[day.key] = timeSlots.some(
        (slot) => slot.dayOfWeek === day.key && slot.status === "available",
      );
      return acc;
    },
    {} as {
      [key: number]: boolean;
    },
  );
  return (
    <div className="flex items-center px-10 py-3 gap-x-10">
      {facilityConfig.daysOfWeek.map((day) => (
        <div
          key={day.key}
          className={clsx(
            "text-primary-foreground flex justify-center cursor-pointer font-hover-high",
            {
              "text-2xl leading-7": selectedDayOfWeek === day.key,
              "opacity-50 pointer-events-none": !dayAvailability[day.key],
            },
          )}
          data-content={day.name}
          onClick={() => setSelectedDayOfWeek(day.key)}
        >
          {day.name}
        </div>
      ))}
    </div>
  );
};

export default DaysOfWeekList;
