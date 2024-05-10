import React from "react";
import { clsx } from "clsx";
import { Dot } from "lucide-react";
import { TimeSlot } from "@/types/commonTypes";

interface IPriceSlotsList {
  filteredTimeSlots: TimeSlot[];
  selectedSlotIds: number[];
  setSelectedSlotIds: (value: number[]) => void;
}

const PriceSlotsList: React.FC<IPriceSlotsList> = ({
  filteredTimeSlots,
  setSelectedSlotIds,
  selectedSlotIds,
}) => {
  const handleSelectSlot = (slotId: number) => {
    if (selectedSlotIds.find((slot) => slot === slotId)) {
      const filteredSlotIds = selectedSlotIds.filter((slot) => slot !== slotId);
      setSelectedSlotIds(filteredSlotIds);
    } else {
      setSelectedSlotIds([...selectedSlotIds, slotId]);
    }
  };
  return (
    <ul className="grow flex flex-col py-[30px]">
      {filteredTimeSlots.map((slot, index) => (
        <li
          key={slot.id}
          className={clsx(
            "px-5 h-[40px] flex items-center justify-end text-lg font-light border-t-1 border-border last:border-b-1 cursor-pointer",
            {
              "text-primary": selectedSlotIds.find(
                (selectedSlotId) => selectedSlotId === slot.id,
              ),
              "text-muted-foreground": !selectedSlotIds.find(
                (selectedSlotId) => selectedSlotId === slot.id,
              ),
            },
          )}
          onClick={() => handleSelectSlot(slot.id)}
        >
          {selectedSlotIds.find(
            (selectedSlotId) => selectedSlotId === slot.id,
          ) && <Dot className="w-6 h-6 mr-auto" color="#ff8749" />}
          {slot.price} UAH
        </li>
      ))}
    </ul>
  );
};

export default PriceSlotsList;
