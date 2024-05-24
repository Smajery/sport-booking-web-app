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
      acc[day.key] = timeSlots.some((slot) => slot.dayOfWeek === day.key);
      return acc;
    },
    {} as {
      [key: number]: boolean;
    },
  );
  return (
    <div className="px-5 bg-primary text-primary-foreground flex items-center">
      {facilityConfig.daysOfWeek.map((day) => (
        <div
          key={day.key}
          className={clsx(
            "px-5 py-1 rounded-xl flex justify-center cursor-pointer text-2xl",
            {
              "bg-black/10": selectedDayOfWeek === day.key,
              "opacity-50": !dayAvailability[day.key],
            },
          )}
          onClick={() => setSelectedDayOfWeek(day.key)}
        >
          {day.name}
        </div>
      ))}
    </div>
  );
};

export default DaysOfWeekList;
