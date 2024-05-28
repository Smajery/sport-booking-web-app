import React from "react";
import { clsx } from "clsx";
import { Dot } from "lucide-react";
import { TTimeSlot } from "@/types/commonTypes";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IPriceSlotsList {
  timeSlots: TTimeSlot[];
  selectedSlotIds: number[];
  setSelectedSlotIds: (value: number[]) => void;
}

const PriceSlotsList: React.FC<IPriceSlotsList> = ({
  timeSlots,
  setSelectedSlotIds,
  selectedSlotIds,
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const handleSelectSlot = (slotId: number) => {
    if (selectedSlotIds.find((slot) => slot === slotId)) {
      const filteredSlotIds = selectedSlotIds.filter((slot) => slot !== slotId);
      setSelectedSlotIds(filteredSlotIds);
    } else {
      setSelectedSlotIds([...selectedSlotIds, slotId]);
    }
  };

  if (!timeSlots.length)
    return (
      <div className="p-5 text-lg italic text-muted-foreground">
        {tTtl("noTimeSlotsForCurrentDayOfWeek")}
      </div>
    );

  return (
    <div className="grow flex flex-col py-[30px]">
      {timeSlots.map((slot, index) => (
        <div
          key={slot.id}
          className={clsx(
            "px-5 h-[40px] flex items-center justify-end text-lg font-light border-t border-border last:border-b cursor-pointer",
            {
              "text-secondary": selectedSlotIds.find(
                (selectedSlotId) => selectedSlotId === slot.id,
              ),
              "text-muted-foreground": !selectedSlotIds.find(
                (selectedSlotId) => selectedSlotId === slot.id,
              ),
              "pointer-events-none bg-black/10":
                slot.status === "booked" || slot.status === "unavailable",
            },
          )}
          onClick={() => handleSelectSlot(slot.id)}
        >
          {slot.status === "available" ? (
            <>
              {selectedSlotIds.find(
                (selectedSlotId) => selectedSlotId === slot.id,
              ) && <Dot className="w-6 h-6 mr-auto" />}
              <p>
                {slot.price} {tTtl("uah")}
              </p>
            </>
          ) : (
            <p>{tTtl("unavailable")}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PriceSlotsList;
