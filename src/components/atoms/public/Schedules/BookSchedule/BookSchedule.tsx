"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import TimeSlotsList from "@/components/molecules/public/Lists/TimeSlotsList/TimeSlotsList";
import PriceSlotsList from "@/components/molecules/public/Lists/PriceSlotsList/PriceSlotsList";
import DaysOfWeekList from "@/components/molecules/public/Lists/DaysOfWeekList/DaysOfWeekList";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { CREATE_BOOKING_MUTATION } from "@/apollo/mutations/booking";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { getMinutesFromIsoTime } from "@/utils/helpers/time.helpers";
import FormErrorsFrame from "@/components/molecules/public/Frames/FormErrorsFrame/FormErrorsFrame";
import ApolloErrorFrame from "@/components/molecules/public/Frames/ApolloErrorFrame/ApolloErrorFrame";
import { v4 as uuidv4 } from "uuid";
import { TFacilitySchedule } from "@/types/public/facilityTypes";
import { getDuration } from "@/utils/helpers/text.helpers";

const createBookingFormSchema = z.object({
  timeSlotIds: z.array(z.number()).min(1, "At least one booking"),
});

interface IBookSchedule {
  facilitySchedule: TFacilitySchedule;
  facilityId: number;
  handleCloseModal: () => void;
}

const BookSchedule: React.FC<IBookSchedule> = ({
  facilityId,
  facilitySchedule,
  handleCloseModal,
}) => {
  const { minBookingTime, timeSlots } = facilitySchedule;

  const [createBooking, { loading: isBookLoading, error }] = useMutation(
    CREATE_BOOKING_MUTATION,
  );

  const [selectedDayOfWeek, setSelectedDayOfWeek] = React.useState<number>(
    timeSlots[0].dayOfWeek,
  );
  const [selectedSlotIds, setSelectedSlotIds] = React.useState<number[]>([]);
  const [isMinBookingTime, setIsBookingTime] = React.useState<boolean>(false);

  const data = {
    version: 3,
    public_key: process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY as string,
    action: "pay",
    currency: "UAH",
    description: "Facility booking",
    order_id: uuidv4(),
    language: "en",
  };

  const privateKey = process.env.NEXT_PUBLIC_LIQPAY_PRIVATE_KEY as string;

  const dataBase64 = Buffer.from(JSON.stringify(data)).toString("base64");

  const createPayment = async () => {
    // const liqPayCheckoutUrl = `https://www.liqpay.ua/api/3/checkout?data=${encodeURIComponent(dataBase64)}`;
    const liqPayCheckoutUrl =
      "https://www.liqpay.ua/en/checkout/sandbox_i69297607762";
    window.location.href = liqPayCheckoutUrl;
  };

  const form = useForm<z.infer<typeof createBookingFormSchema>>({
    resolver: zodResolver(createBookingFormSchema),
    defaultValues: {
      timeSlotIds: selectedSlotIds,
    },
  });

  const onSubmit = async (values: z.infer<typeof createBookingFormSchema>) => {
    try {
      const { timeSlotIds } = values;
      await createBooking({
        context: {
          authRequired: true,
        },
        variables: {
          createBookingInput: {
            facilityId,
            timeSlotIds,
          },
        },
      });
      await createPayment();
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

  const handleSelectSlotIds = (selectedSlotIds: number[]) => {
    form.setValue("timeSlotIds", selectedSlotIds);
    setSelectedSlotIds(selectedSlotIds);
  };

  const handleCancel = () => {
    setSelectedSlotIds([]);
    handleCloseModal();
  };

  //Temporary solution
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
          <div className="flex bg-primary">
            <div className="p-1 flex flex-col justify-center items-center gap-y-1 px-1 w-[88px] border-r border-white text-primary-foreground">
              <Clock className="w-6 h-6" />
              <p className="w-full truncate text-xs text-center">
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
            <div className="min-h-[500px] flex">
              <TimeSlotsList filteredTimeSlots={filteredTimeSlots} />
              <PriceSlotsList
                filteredTimeSlots={filteredTimeSlots}
                selectedSlotIds={selectedSlotIds}
                setSelectedSlotIds={handleSelectSlotIds}
              />
            </div>
          </ScrollArea>
          <div className="flex flex-col py-5 border-t border-border gap-y-5">
            <div className="flex text-xl">
              <div className="px-5 w-[88px] flex items-center">Total:</div>
              <div className="font-light text-primary">{getTotal()} UAH</div>
            </div>
            <FormErrorsFrame fieldErrors={errors} />
            <ApolloErrorFrame error={error} />
            <div className="flex justify-end gap-x-4 px-5">
              <Button
                variant="outline"
                size="md"
                type="button"
                onClick={handleCancel}
                disabled={isBookLoading}
              >
                Cancel
              </Button>
              <Button
                variant="none"
                size="md"
                className="variant-gradient"
                disabled={isMinBookingTime || isBookLoading}
              >
                Pay
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default BookSchedule;
