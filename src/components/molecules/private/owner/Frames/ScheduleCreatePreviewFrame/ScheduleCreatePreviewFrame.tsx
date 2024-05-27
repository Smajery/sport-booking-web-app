"use client";

import React from "react";
import { CardContent, Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import TimeSlotsList from "@/components/molecules/public/Lists/TimeSlotsList/TimeSlotsList";
import { TTimeSlot } from "@/types/commonTypes";
import { Clock } from "lucide-react";
import PreviewPriceSlotsList from "@/components/molecules/private/owner/Lists/PreviewPriceSlotsList/PreviewPriceSlotsList";
import { getDuration } from "@/utils/helpers/text.helpers";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";
import DaysOfWeekList from "@/components/molecules/public/Lists/DaysOfWeekList/DaysOfWeekList";

interface IScheduleCreatePreviewFrame {
  timeSlots: TTimeSlot[];
  minBookingTime: number;
}

const ScheduleCreatePreviewFrame: React.FC<IScheduleCreatePreviewFrame> = ({
  timeSlots,
  minBookingTime,
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const [selectedDayOfWeek, setSelectedDayOfWeek] = React.useState<number>(0);

  const filteredTimeSlots = timeSlots.filter(
    (timeSlot) => timeSlot.dayOfWeek === selectedDayOfWeek,
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
    <Card className="bg-background overflow-hidden border-secondary shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="flex bg-secondary">
            <div className="p-1 flex flex-col justify-center items-center gap-y-1 px-1 w-[98px] border-r border-white text-primary-foreground">
              <Clock className="w-6 h-6" />
              <p className="w-full truncate text-xs text-center">
                {tTtl("cMinimum")}: {getDuration(minBookingTime)}
              </p>
            </div>
            <DaysOfWeekList
              selectedDayOfWeek={selectedDayOfWeek}
              setSelectedDayOfWeek={setSelectedDayOfWeek}
              timeSlots={timeSlots}
            />
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

export default ScheduleCreatePreviewFrame;
