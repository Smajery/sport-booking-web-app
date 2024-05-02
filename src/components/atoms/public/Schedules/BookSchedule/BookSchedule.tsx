"use client";

import React from "react";
import { TimeSlot } from "@/types/commonTypes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import TimeSlotsList from "@/components/molecules/public/Lists/TimeSlotsList/TimeSlotsList";
import PriceSlotsList from "@/components/molecules/public/Lists/PriceSlotsList/PriceSlotsList";
import DaysOfWeekList from "@/components/molecules/public/Lists/DaysOfWeekList/DaysOfWeekList";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { CREATE_BOOKING } from "@/apollo/mutations/booking";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { getMinutesFromIsoTime } from "@/utils/helpers/time.helpers";
import ErrorsFrame from "@/components/molecules/common/Frames/ErrorsFrame/ErrorsFrame";
import ApolloErrorFrame from "@/components/molecules/common/Frames/ApolloErrorFrame/ApolloErrorFrame";
import PayButton from "@/components/atoms/public/Buttons/PayButton/PayButton";
import { getDuration } from "@/utils/helpers/text.helpers";

const formCreateBookingSchema = z.object({
  timeSlotIds: z.array(z.number()).min(1, "At least one booking"),
});

interface IBookSchedule {
  facilityId: number;
  minBookingTime: number;
  timeSlots: TimeSlot[];
  handleCloseModal: () => void;
}

const BookSchedule: React.FC<IBookSchedule> = ({
  facilityId,
  minBookingTime,
  timeSlots,
  handleCloseModal,
}) => {
  const [createBooking, { loading: isBookLoading, error }] =
    useMutation(CREATE_BOOKING);

  const [selectedDayOfWeek, setSelectedDayOfWeek] = React.useState<number>(1);
  const [selectedSlotIds, setSelectedSlotIds] = React.useState<number[]>([]);
  const [isMinBookingTime, setIsBookingTime] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formCreateBookingSchema>>({
    resolver: zodResolver(formCreateBookingSchema),
    defaultValues: {
      timeSlotIds: selectedSlotIds,
    },
  });

  const onSubmit = async (values: z.infer<typeof formCreateBookingSchema>) => {
    try {
      const { timeSlotIds } = values;
      await createBooking({
        variables: {
          createBookingInput: {
            facilityId,
            timeSlotIds,
          },
        },
      });
      handleCancel();
    } catch (e) {
      ErrorHandler.handle(e, { componentName: "BookSchedule__onSubmit" });
    }
  };

  const {
    formState: { errors },
  } = form as UseFormReturn;

  const filteredTimeSlots = timeSlots.filter(
    (timeSlot) =>
      timeSlot.dayOfWeek === selectedDayOfWeek &&
      timeSlot.status === "available",
  );

  const getTotal = () => {
    let total = 0;
    selectedSlotIds.forEach((selectedSlotId) => {
      const timeSlot = filteredTimeSlots.find(
        (timeSlot) => timeSlot.id === selectedSlotId,
      );
      if (timeSlot) {
        total += timeSlot.price;
      }
    });
    return total;
  };

  const handleCancel = () => {
    setSelectedSlotIds([]);
    handleCloseModal();
  };

  React.useEffect(() => {
    form.setValue("timeSlotIds", selectedSlotIds);
  }, [selectedSlotIds]);

  React.useEffect(() => {
    const totalDuration = selectedSlotIds.reduce((total, id) => {
      const slot = timeSlots.find((slot) => slot.id === id);
      if (slot) {
        const startTime = getMinutesFromIsoTime(slot.startTime);
        const endTime = getMinutesFromIsoTime(slot.endTime);
        const duration = endTime - startTime;
        return total + duration;
      }
      return total;
    }, 0);
    setIsBookingTime(totalDuration < minBookingTime);
  }, [selectedSlotIds]);

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="flex bg-secondary">
            <div className="p-unit-1 flex flex-col justify-center items-center gap-y-unit-1 px-unit-5 w-[88px] border-r-1 border-white">
              <Clock className="w-unit-6 h-unit-6" color="#FFFFFF" />
              <p className="w-full truncate text-xs text-center text-secondary-foreground">
                Min: {getDuration(minBookingTime)}
              </p>
            </div>
            <DaysOfWeekList
              selectedDayOfWeek={selectedDayOfWeek}
              setSelectedDayOfWeek={setSelectedDayOfWeek}
              timeSlots={timeSlots}
            />
          </div>
          <ScrollArea className="h-[500px]">
            <div className="flex">
              <TimeSlotsList filteredTimeSlots={filteredTimeSlots} />
              <PriceSlotsList
                filteredTimeSlots={filteredTimeSlots}
                selectedSlotIds={selectedSlotIds}
                setSelectedSlotIds={setSelectedSlotIds}
              />
            </div>
          </ScrollArea>
          <div className="flex flex-col py-unit-5 border-t-1 border-border gap-y-unit-5">
            <div className="flex text-xl">
              <div className="px-unit-5 w-[88px] flex items-center">Total:</div>
              <div className="font-light text-primary">{getTotal()} UAH</div>
            </div>
            <ErrorsFrame errors={errors} />
            <ApolloErrorFrame error={error} />
            <div className="flex justify-end gap-x-unit-4 px-unit-5">
              <Button
                variant="ghost"
                size="md"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <PayButton
                disabled={isMinBookingTime || isBookLoading}
                description="Facility booking"
              />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default BookSchedule;
