import React from "react";
import { clsx } from "clsx";
import { TimeSlot } from "@/types/commonTypes";

interface IDaysOfWeekList {
  selectedDayOfWeek: number;
  setSelectedDayOfWeek: (value: number) => void;
  timeSlots: TimeSlot[];
}

const daysOfWeek = [
  { id: 1, name: "Mon" },
  { id: 2, name: "Tue" },
  { id: 3, name: "Wed" },
  { id: 4, name: "Thu" },
  { id: 5, name: "Fri" },
  { id: 6, name: "Sat" },
  { id: 7, name: "Sun" },
];

const DaysOfWeekList: React.FC<IDaysOfWeekList> = ({
  selectedDayOfWeek,
  setSelectedDayOfWeek,
  timeSlots,
}) => {
  const dayAvailability = daysOfWeek.reduce(
    (acc, day) => {
      acc[day.id] = timeSlots.some(
        (slot) => slot.dayOfWeek === day.id && slot.status === "available",
      );
      return acc;
    },
    {} as {
      [key: number]: boolean;
    },
  );
  return (
    <ul className="flex items-center px-10 py-3 gap-x-10">
      {daysOfWeek.map((day) => (
        <li
          key={day.id}
          className={clsx(
            "text-primary-foreground flex justify-center cursor-pointer font-hover-high",
            {
              "text-2xl leading-7": selectedDayOfWeek === day.id,
              "opacity-50 pointer-events-none": !dayAvailability[day.id],
            },
          )}
          data-content={day.name}
          onClick={() => setSelectedDayOfWeek(day.id)}
        >
          {day.name}
        </li>
      ))}
    </ul>
  );
};

export default DaysOfWeekList;
