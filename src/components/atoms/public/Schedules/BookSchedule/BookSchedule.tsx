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
import { CREATE_BOOKING_MUTATION } from "@/apollo/mutations/private/user/booking";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { getMinutesFromIsoTime } from "@/utils/helpers/time.helpers";
import ApolloErrorFrame from "@/components/molecules/public/Frames/ApolloErrorFrame/ApolloErrorFrame";
import { TFacilitySchedule } from "@/types/public/facilityTypes";
import { getDuration } from "@/utils/helpers/text.helpers";
import { CREATE_PAYMENT_MUTATION } from "@/apollo/mutations/private/user/payment";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const { minBookingTime, timeSlots } = facilitySchedule;

  const [createBooking, { loading: isBookLoading, error: errorBooking }] =
    useMutation(CREATE_BOOKING_MUTATION);
  const [createPayment, { loading: isPaymentLoading, error: errorPayment }] =
    useMutation(CREATE_PAYMENT_MUTATION);

  const [selectedDayOfWeek, setSelectedDayOfWeek] = React.useState<number>(
    new Date().getDay(),
  );
  const [selectedSlotIds, setSelectedSlotIds] = React.useState<number[]>([]);
  const [isMinBookingTime, setIsBookingTime] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<number>(0);
  const orderId = uuidv4();

  const form = useForm<z.infer<typeof createBookingFormSchema>>({
    resolver: zodResolver(createBookingFormSchema),
    defaultValues: {
      timeSlotIds: selectedSlotIds,
    },
  });

  const onSubmit = async (values: z.infer<typeof createBookingFormSchema>) => {
    try {
      const { timeSlotIds } = values;
      const { data } = await createBooking({
        context: {
          authRequired: true,
        },
        variables: {
          createBookingInput: {
            facilityId,
            timeSlotIds,
          },
        },
        onCompleted: async () => {
          await handleCreatePayment();

          const { id, price } = data.createBooking as {
            id: number;
            price: number;
          };
          await createPayment({
            context: {
              authRequired: true,
            },
            variables: {
              input: {
                bookingId: id,
                amount: price,
                orderId: orderId,
              },
            },
          });
        },
      });

      handleCancel();
    } catch (e) {
      ErrorHandler.handle(e, { componentName: "BookSchedule__onSubmit" });
    }
  };

  const filteredTimeSlots = timeSlots.filter(
    (timeSlot) =>
      timeSlot.dayOfWeek === selectedDayOfWeek &&
      timeSlot.status === "available",
  );

  const handleSelectSlotIds = (selectedSlotIds: number[]) => {
    form.setValue("timeSlotIds", selectedSlotIds);
    setSelectedSlotIds(selectedSlotIds);
  };

  //Payment
  const generateOrderData = () => {
    const requestData = {
      public_key: process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY as string,
      version: 3,
      action: "pay",
      amount: amount,
      currency: "UAH",
      description: "Facility booking",
      order_id: orderId,
      language: "UK",
      result_url: pathname,
      // expired_date: new Date(new Date().getTime() + 5 * 60000).toISOString(), //5 min to pay
    };
    const jsonData = JSON.stringify(requestData);
    const base64Data = Buffer.from(jsonData).toString("base64");
    return base64Data;
  };

  const generateSignature = async (orderData: string) => {
    const privateKey = process.env.NEXT_PUBLIC_LIQPAY_PRIVATE_KEY as string;

    const encoder = new TextEncoder();
    const signString = `${privateKey}${orderData}${privateKey}`;
    const dataBuffer = encoder.encode(signString);

    const hashBuffer = await crypto.subtle.digest("SHA-1", dataBuffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashBase64 = btoa(
      hashArray.map((b) => String.fromCharCode(b)).join(""),
    );

    return hashBase64;
  };

  const handleCreatePayment = async () => {
    try {
      const orderData = generateOrderData();
      const signature = await generateSignature(orderData);

      window.location.href = `https://www.liqpay.ua/api/3/checkout?data=${orderData}&signature=${signature}`;
    } catch (e) {
      ErrorHandler.handle(e, {
        componentName: "PayButton__handleCreatePayment",
      });
    }
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

  React.useEffect(() => {
    let total = 0;
    selectedSlotIds.forEach((selectedSlotId) => {
      const timeSlot = filteredTimeSlots.find(
        (timeSlot) => timeSlot.id === selectedSlotId,
      );
      if (timeSlot) {
        total += timeSlot.price;
      }
    });
    setAmount(total);
  }, [selectedSlotIds]);

  const handleCancel = () => {
    setSelectedSlotIds([]);
    handleCloseModal();
  };

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
              <div className="font-light text-primary">{amount} UAH</div>
            </div>
            <ApolloErrorFrame error={errorBooking} />
            <div className="flex justify-end gap-x-4 px-5">
              <Button
                variant="outline"
                size="md"
                type="button"
                onClick={handleCancel}
                disabled={isBookLoading || isPaymentLoading}
              >
                Cancel
              </Button>
              <Button
                variant="none"
                size="md"
                className="variant-gradient"
                disabled={isMinBookingTime || isBookLoading || isPaymentLoading}
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
