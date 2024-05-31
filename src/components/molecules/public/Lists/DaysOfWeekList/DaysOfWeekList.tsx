import React from "react";
import { clsx } from "clsx";
import { TTimeSlot } from "@/types/commonTypes";
import { facilityConfig } from "@/config/public/facility";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IDaysOfWeekList {
  selectedDayOfWeek: number | null;
  setSelectedDayOfWeek: (value: number) => void;
  timeSlotsDaysOfWeek: number[];
}

const DaysOfWeekList: React.FC<IDaysOfWeekList> = ({
  selectedDayOfWeek,
  setSelectedDayOfWeek,
  timeSlotsDaysOfWeek,
}) => {
  const tSlct = useTranslations(namespaces.COMPONENTS_SELECTS);

  return (
    <div className="px-5 bg-primary text-primary-foreground flex items-center">
      {facilityConfig.daysOfWeek.map((day) => (
        <div
          key={day.key}
          className={clsx(
            "px-5 py-1 rounded-xl flex justify-center cursor-pointer text-2xl",
            {
              "bg-black/10": selectedDayOfWeek === day.key,
              "opacity-50 ": !timeSlotsDaysOfWeek.some(
                (dayOfWeek) => dayOfWeek === day.key,
              ),
            },
          )}
          onClick={() => setSelectedDayOfWeek(day.key)}
        >
          {tSlct(day.name)}
        </div>
      ))}
    </div>
  );
};

export default DaysOfWeekList;
