"use client";

import React from "react";
import { TimeSlot } from "@/types/commonTypes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import ApplyButton from "@/components/atoms/public/Buttons/ApplyButton/ApplyButton";
import { Button } from "@/components/ui/button";
import TimeSlotsList from "@/components/molecules/public/Lists/TimeSlotsList/TimeSlotsList";
import PriceSlotsList from "@/components/molecules/public/Lists/PriceSlotsList/PriceSlotsList";
import DaysOfWeekList from "@/components/molecules/public/Lists/DaysOfWeekList/DaysOfWeekList";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { CREATE_BOOKING } from "@/apollo/mutations/booking";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";

const formCreateBookingSchema = z.object({
  timeSlotIds: z.array(z.number()).min(1, "At least one booking"),
});

interface IBookSchedule {
  facilityId: number;
  timeSlots: TimeSlot[];
  handleCloseModal: () => void;
}

const BookSchedule: React.FC<IBookSchedule> = ({
  facilityId,
  timeSlots,
  handleCloseModal,
}) => {
  const [createBooking, { loading: isBookLoading, error }] =
    useMutation(CREATE_BOOKING);

  const [selectedDayOfWeek, setSelectedDayOfWeek] = React.useState<number>(1);
  const [selectedSlotIds, setSelectedSlotIds] = React.useState<number[]>([]);

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
  } = form;

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

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="flex bg-secondary py-unit-3">
            <div className="flex justify-center items-center px-unit-5 w-[88px] border-r-1 border-white">
              <Clock className="w-unit-6 h-unit-6" color="#FFFFFF" />
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
            {Object.keys(errors).length !== 0 && (
              <div className="px-unit-5">
                {Object.keys(errors).map((key) => (
                  <p key={key} className="text-sm text-destructive">
                    {errors[key].message}
                  </p>
                ))}
              </div>
            )}
            {error && (
              <div className="px-unit-5">
                <p className="text-sm text-destructive">
                  {getApolloErrorMessage(error)}
                </p>
              </div>
            )}
            <div className="flex justify-end gap-x-unit-4 px-unit-5">
              <Button
                variant="ghost"
                size="md"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <ApplyButton />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default BookSchedule;
