import React from "react";
import { clsx } from "clsx";
import { Dot } from "lucide-react";
import { TTimeSlot } from "@/types/commonTypes";

interface IPreviewUpdatePriceSlotsList {
  filteredTimeSlots: TTimeSlot[];
  selectedSlotIds: number[];
  setSelectedSlotIds: (value: number[]) => void;
  isSelectAvailable: boolean;
}

const PreviewUpdatePriceSlotsList: React.FC<IPreviewUpdatePriceSlotsList> = ({
  filteredTimeSlots,
  setSelectedSlotIds,
  selectedSlotIds,
  isSelectAvailable,
}) => {
  const handleSelectSlot = (slotId: number) => {
    if (isSelectAvailable) {
      if (selectedSlotIds.find((slot) => slot === slotId)) {
        const filteredSlotIds = selectedSlotIds.filter(
          (slot) => slot !== slotId,
        );
        setSelectedSlotIds(filteredSlotIds);
      } else {
        setSelectedSlotIds([...selectedSlotIds, slotId]);
      }
    }
  };
  return (
    <div className="grow flex flex-col py-[30px]">
      {filteredTimeSlots.map((slot, index) => (
        <div
          key={slot.id}
          className={clsx(
            "px-5 h-[40px] flex items-center justify-end text-lg font-light border-t border-border last:border-b",
            {
              "text-primary": selectedSlotIds.find(
                (selectedSlotId) => selectedSlotId === slot.id,
              ),
              "text-muted-foreground": !selectedSlotIds.find(
                (selectedSlotId) => selectedSlotId === slot.id,
              ),
              "cursor-pointer": isSelectAvailable,
            },
          )}
          onClick={() => handleSelectSlot(slot.id)}
        >
          {selectedSlotIds.find(
            (selectedSlotId) => selectedSlotId === slot.id,
          ) && <Dot className="w-6 h-6 mr-auto" color="#ff8749" />}
          {slot.price} UAH
        </div>
      ))}
    </div>
  );
};

export default PreviewUpdatePriceSlotsList;
