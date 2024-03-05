import React from "react";
import { TimeSlot } from "@/types/commonTypes";
import { format, parseISO } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Dot } from "lucide-react";
import { clsx } from "clsx";
import ApplyButton from "@/components/atoms/public/Buttons/ApplyButton/ApplyButton";
import { Button } from "@/components/ui/button";

const daysOfWeek = [
  { id: 1, name: "Mon" },
  { id: 2, name: "Tue" },
  { id: 3, name: "Wed" },
  { id: 4, name: "Thu" },
  { id: 5, name: "Fri" },
  { id: 6, name: "Sat" },
  { id: 7, name: "Sun" },
];

interface IBookSchedule {
  timeSlots: TimeSlot[];
  handleCloseModal: () => void;
}

const BookSchedule: React.FC<IBookSchedule> = ({
  timeSlots,
  handleCloseModal,
}) => {
  const [selectedDayOfWeek, setSelectedDayOfWeek] = React.useState<number>(1);

  const filteredTimeSLots = timeSlots.filter(
    (timeSlot) =>
      timeSlot.dayOfWeek === selectedDayOfWeek &&
      timeSlot.status === "available",
  );

  const [selectedSlotIds, setSelectedSlotIds] = React.useState<number[]>([]);

  const handleCancel = () => {
    setSelectedSlotIds([]);
    handleCloseModal();
  };

  const getTotal = () => {
    let total = 0;
    selectedSlotIds.forEach((selectedSlotId) => {
      const timeSlot = filteredTimeSLots.find(
        (timeSlot) => timeSlot.id === selectedSlotId,
      );
      if (timeSlot) {
        total += timeSlot.price;
      }
    });
    return total;
  };

  return (
    <div className="flex flex-col">
      <div className="flex bg-secondary py-unit-3">
        <div className="flex justify-center items-center px-unit-5 w-[88px] border-r-1 border-white">
          <Clock className="w-unit-6 h-unit-6" color="#FFFFFF" />
        </div>
        <ul className="flex px-unit-10 gap-x-unit-10">
          {daysOfWeek.map((day) => (
            <li
              key={day.id}
              className={clsx(
                "text-primary-foreground flex justify-center cursor-pointer font-hover-high",
                {
                  "text-2xl leading-7": selectedDayOfWeek === day.id,
                  "mt-auto": selectedDayOfWeek !== day.id,
                },
              )}
              data-content={day.name}
              onClick={() => setSelectedDayOfWeek(day.id)}
            >
              {day.name}
            </li>
          ))}
        </ul>
      </div>
      <ScrollArea className="h-[500px]">
        <div className="flex">
          <ul className="flex flex-col p-unit-5 w-[88px] gap-y-unit-5 border-r-1 border-border">
            {filteredTimeSLots.map((slot, index) =>
              index === 0 ? (
                <>
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
                </>
              ) : (
                <li
                  key={slot.id}
                  className="h-unit-5 flex items-center text-lg"
                >
                  {format(parseISO(slot.endTime), "HH:mm")}
                </li>
              ),
            )}
          </ul>
          <ul className="grow flex flex-col py-[30px]">
            {filteredTimeSLots.map((slot, index) => (
              <li
                key={slot.id}
                className={clsx(
                  "px-unit-5 h-[40px] flex items-center justify-end text-lg font-light border-t-1 border-border last:border-b-1 cursor-pointer",
                  {
                    "text-primary": selectedSlotIds.find(
                      (selectedSlotId) => selectedSlotId === slot.id,
                    ),
                    "text-muted-foreground": !selectedSlotIds.find(
                      (selectedSlotId) => selectedSlotId === slot.id,
                    ),
                  },
                )}
                onClick={() =>
                  setSelectedSlotIds([...selectedSlotIds, slot.id])
                }
              >
                {selectedSlotIds.find(
                  (selectedSlotId) => selectedSlotId === slot.id,
                ) && (
                  <Dot className="w-unit-6 h-unit-6 mr-auto" color="#ff8749" />
                )}
                {slot.price} UAH
              </li>
            ))}
          </ul>
        </div>
      </ScrollArea>
      <div className="flex flex-col py-unit-5 border-t-1 border-border gap-y-unit-5">
        <div className="flex text-xl">
          <div className="px-unit-5 w-[88px] flex items-center">Total:</div>
          <div className="font-light text-primary">{getTotal()} UAH</div>
        </div>
        <div className="flex justify-end gap-x-unit-4 px-unit-5">
          <Button variant="ghost" size="md" onClick={handleCancel}>
            Cancel
          </Button>
          <ApplyButton />
        </div>
      </div>
    </div>
  );
};

export default BookSchedule;
