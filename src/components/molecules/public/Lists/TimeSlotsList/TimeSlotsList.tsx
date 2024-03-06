import React from "react";
import { TimeSlot } from "@/types/commonTypes";
import { format, parseISO } from "date-fns";

interface ITimeSlotsList {
  filteredTimeSlots: TimeSlot[];
}

const TimeSlotsList: React.FC<ITimeSlotsList> = ({ filteredTimeSlots }) => {
  return (
    <ul className="flex flex-col p-unit-5 w-[88px] gap-y-unit-5 border-r-1 border-border">
      {filteredTimeSlots.map((slot, index) =>
        index === 0 ? (
          <React.Fragment key={`${slot.id}-fragment`}>
            <li
              key={`${slot.id}-startTime`}
              className="h-unit-5 flex items-center text-lg"
            >
              {format(parseISO(slot.startTime), "HH:mm")}
            </li>
            <li
              key={`${slot.id}-endTime`}
              className="h-unit-5 flex items-center text-lg"
            >
              {format(parseISO(slot.endTime), "HH:mm")}
            </li>
          </React.Fragment>
        ) : (
          <li key={slot.id} className="h-unit-5 flex items-center text-lg">
            {format(parseISO(slot.endTime), "HH:mm")}
          </li>
        ),
      )}
    </ul>
  );
};

export default TimeSlotsList;
