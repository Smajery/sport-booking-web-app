"use client";

import React from "react";
import { CardContent, Card } from "@/components/ui/card";
import { facilityConfig } from "@/config/public/facility";
import { ScrollArea } from "@/components/ui/scroll-area";
import TimeSlotsList from "@/components/molecules/public/Lists/TimeSlotsList/TimeSlotsList";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { TTimeSlot } from "@/types/commonTypes";
import { Clock } from "lucide-react";
import PreviewPriceSlotsList from "@/components/molecules/private/owner/Lists/PreviewPriceSlotsList/PreviewPriceSlotsList";

interface IScheduleCreateCardFrame {
  timeSlots: TTimeSlot[];
}

const ScheduleCreateCardFrame: React.FC<IScheduleCreateCardFrame> = ({
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

  const [selectedDayOfWeek, setSelectedDayOfWeek] = React.useState<number>(0);

  const filteredTimeSlots = timeSlots.filter(
    (timeSlot) =>
      timeSlot.dayOfWeek === selectedDayOfWeek &&
      timeSlot.status === "available",
  );

  React.useEffect(() => {
    if (!timeSlots.length) {
      setSelectedDayOfWeek(0);
    } else {
      if (timeSlots[0].dayOfWeek !== selectedDayOfWeek) {
        setSelectedDayOfWeek(timeSlots[0].dayOfWeek);
      }
    }
  }, [timeSlots]);
  return (
    <Card className="bg-background overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="flex bg-primary">
            <div className="p-1 flex flex-col justify-center items-center gap-y-1 px-1 w-[88px] border-r border-white text-primary-foreground">
              <Clock className="w-6 h-6" />
              <p className="w-full truncate text-xs text-center">Min:</p>
            </div>
            <div className="flex items-center px-10 py-3 gap-x-10">
              {facilityConfig.daysOfWeek.map((day) => (
                <div
                  key={day.key}
                  className={clsx(
                    "text-primary-foreground flex justify-center cursor-pointer font-hover-high",
                    {
                      "text-2xl leading-7": selectedDayOfWeek === day.key,
                      "opacity-50 pointer-events-none":
                        !dayAvailability[day.key],
                    },
                  )}
                  data-content={day.name}
                  onClick={() => setSelectedDayOfWeek(day.key)}
                >
                  {day.name}
                </div>
              ))}
            </div>
          </div>
          <ScrollArea className="h-[500px]">
            <div className="min-h-[500px] flex">
              <TimeSlotsList filteredTimeSlots={filteredTimeSlots} />
              <PreviewPriceSlotsList filteredTimeSlots={filteredTimeSlots} />
            </div>
          </ScrollArea>
          <div className="flex flex-col py-10 border-t border-border gap-y-5"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleCreateCardFrame;
