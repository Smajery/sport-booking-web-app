import React from "react";
import { TTimeSlot } from "@/types/commonTypes";
import { useLocale } from "use-intl";
import { TLocale } from "@/navigation";
import format from "@/lib/format";
import { parseISO } from "date-fns";

interface ITimeSlotsList {
  filteredTimeSlots: TTimeSlot[];
}

const TimeSlotsList: React.FC<ITimeSlotsList> = ({ filteredTimeSlots }) => {
  const locale = useLocale() as TLocale;
  return (
    <div className="flex flex-col p-5 w-[88px] gap-y-5 border-r border-border">
      {filteredTimeSlots.map((slot, index) =>
        index === 0 ? (
          <React.Fragment key={`${slot.id}-fragment`}>
            <div
              key={`${slot.id}-startTime`}
              className="h-5 flex items-center text-lg"
            >
              {format(parseISO(slot.startTime), "HH:mm", locale)}
            </div>
            <div
              key={`${slot.id}-endTime`}
              className="h-5 flex items-center text-lg"
            >
              {format(parseISO(slot.endTime), "HH:mm", locale)}
            </div>
          </React.Fragment>
        ) : (
          <div key={slot.id} className="h-5 flex items-center text-lg">
            {format(parseISO(slot.endTime), "HH:mm", locale)}
          </div>
        ),
      )}
    </div>
  );
};

export default TimeSlotsList;
