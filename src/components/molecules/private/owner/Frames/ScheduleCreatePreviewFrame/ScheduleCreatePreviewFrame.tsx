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

  const [selectedDayOfWeek, setSelectedDayOfWeek] = React.useState<
    number | null
  >(null);
  const [selectedDayOfWeekTimeSlots, setSelectedDayOfWeekTimeSlots] =
    React.useState<TTimeSlot[]>([]);
  const [availableDaysOfWeek, setAvailableDaysOfWeek] = React.useState<
    number[]
  >([]);

  const handleSelectDayOfWeek = (dayOfWeek: number | null) => {
    setSelectedDayOfWeek(dayOfWeek);

    setSelectedDayOfWeekTimeSlots(
      timeSlots.filter((timeSlot) => timeSlot.dayOfWeek === dayOfWeek),
    );
  };

  React.useEffect(() => {
    if (timeSlots.length) {
      const newSelectedDayOfWeek = timeSlots[0].dayOfWeek;
      setSelectedDayOfWeek(newSelectedDayOfWeek);
      handleSelectDayOfWeek(newSelectedDayOfWeek);
      setAvailableDaysOfWeek(
        timeSlots.length ? timeSlots.map((timeSlot) => timeSlot.dayOfWeek) : [],
      );
    } else {
      setSelectedDayOfWeek(null);
      setAvailableDaysOfWeek([]);
      handleSelectDayOfWeek(null);
    }
  }, [timeSlots]);
  return (
    <Card className="bg-background overflow-hidden shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="flex bg-primary">
            <div className="p-1 flex flex-col justify-center items-center gap-y-1 px-1 w-[98px] border-r border-white text-primary-foreground">
              <Clock className="w-6 h-6" />
              <p className="w-full truncate text-xs text-center">
                {tTtl("cMinimum")}: {getDuration(minBookingTime)}
              </p>
            </div>
            <DaysOfWeekList
              selectedDayOfWeek={selectedDayOfWeek}
              setSelectedDayOfWeek={handleSelectDayOfWeek}
              timeSlotsDaysOfWeek={availableDaysOfWeek}
            />
          </div>
          <ScrollArea className="h-[500px]">
            <div className="min-h-[500px] flex">
              <TimeSlotsList timeSlots={selectedDayOfWeekTimeSlots} />
              <PreviewPriceSlotsList timeSlots={selectedDayOfWeekTimeSlots} />
            </div>
          </ScrollArea>
          <div className="flex flex-col py-10 border-t border-border gap-y-5"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleCreatePreviewFrame;
