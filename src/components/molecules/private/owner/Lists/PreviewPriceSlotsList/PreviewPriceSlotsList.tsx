import React from "react";
import { TTimeSlot } from "@/types/commonTypes";

interface IPreviewPriceSlotsList {
  filteredTimeSlots: TTimeSlot[];
}

const PreviewPriceSlotsList: React.FC<IPreviewPriceSlotsList> = ({
  filteredTimeSlots,
}) => {
  return (
    <div className="grow flex flex-col py-[30px]">
      {filteredTimeSlots.map((slot, index) => (
        <div
          key={slot.id}
          className="px-5 h-[40px] flex items-center justify-end text-lg font-light border-t border-border last:border-b text-muted-foreground"
        >
          {slot.price} UAH
        </div>
      ))}
    </div>
  );
};

export default PreviewPriceSlotsList;
