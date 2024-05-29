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
import { useLocale, useTranslations } from "next-intl";
import { TLocale } from "@/navigation";
import { namespaces } from "@/utils/constants/namespaces.constants";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { TTimeSlot } from "@/types/commonTypes";

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
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);
  const tLbl = useTranslations(namespaces.COMPONENTS_LABELS);

  const pathname = usePathname();
  const locale = useLocale() as TLocale;
  const { minBookingTime, schedule, inventoryPrice } = facilitySchedule;

  const [createBooking, { loading: isBookLoading, error: errorBooking }] =
    useMutation(CREATE_BOOKING_MUTATION);
  const [createPayment, { loading: isPaymentLoading, error: errorPayment }] =
    useMutation(CREATE_PAYMENT_MUTATION);

  const [selectedDayOfWeek, setSelectedDayOfWeek] = React.useState<
    number | null
  >(null);
  const [selectedDayOfWeekTimeSlots, setSelectedDayOfWeekTimeSlots] =
    React.useState<TTimeSlot[]>([]);
  const [selectedSlotIds, setSelectedSlotIds] = React.useState<number[]>([]);
  const [amount, setAmount] = React.useState<number>(0);

  const [isMinBookingTime, setIsBookingTime] = React.useState<boolean>(false);
  const [isInventoryPrice, setIsInventoryPrice] =
    React.useState<CheckedState>(false);
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

  const handleSelectSlotIds = (newSelectedSlotIds: number[]) => {
    form.setValue("timeSlotIds", newSelectedSlotIds);
    setSelectedSlotIds(newSelectedSlotIds);

    let total = isInventoryPrice && inventoryPrice ? inventoryPrice : 0;
    newSelectedSlotIds.forEach((selectedSlotId) => {
      const timeSlot = selectedDayOfWeekTimeSlots.find(
        (timeSlot) => timeSlot.id === selectedSlotId,
      );
      if (timeSlot) {
        total += timeSlot.price;
      }
    });
    setAmount(total);

    const totalDuration = newSelectedSlotIds.reduce((total, id) => {
      const slot = selectedDayOfWeekTimeSlots.find((slot) => slot.id === id);
      if (slot) {
        const startTime = getMinutesFromIsoTime(slot.startTime);
        const endTime = getMinutesFromIsoTime(slot.endTime);
        const duration = endTime - startTime;
        return total + duration;
      }
      return total;
    }, 0);
    setIsBookingTime(totalDuration < minBookingTime);
  };

  const handleSelectDayOfWeek = (dayOfWeek: number) => {
    setSelectedDayOfWeek(dayOfWeek);

    const selectedDayOfWeekSchedule = schedule.find(
      (item) => item.dayOfWeek === dayOfWeek,
    );
    if (selectedDayOfWeekSchedule) {
      setSelectedDayOfWeekTimeSlots(selectedDayOfWeekSchedule.timeSlots);
    } else {
      setSelectedDayOfWeekTimeSlots([]);
    }

    handleSelectSlotIds([]);
  };

  //Payment
  const generateOrderData = () => {
    const requestData = {
      public_key: process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY as string,
      version: 3,
      action: "pay",
      amount: amount,
      currency: "UAH",
      description: tTtl("facilityBooking"),
      order_id: orderId,
      language: locale,
      result_url: pathname,
      expired_date: Math.floor(
        new Date().getTime() +
          Number(process.env.NEXT_PUBLIC_BOOKING_EXPIRE_TIME_MIN) * 60,
      ),
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

  const handleAddInventoryPrice = (e: CheckedState) => {
    setIsInventoryPrice(e);
    if (e) {
      setAmount((prevState) => prevState + (inventoryPrice ?? 0));
    } else {
      setAmount((prevState) => prevState - (inventoryPrice ?? 0));
    }
  };

  const handleCancel = () => {
    setSelectedSlotIds([]);
    handleCloseModal();
  };

  React.useEffect(() => {
    handleSelectDayOfWeek(new Date().getDay() - 1);
  }, []);

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="flex bg-secondary">
            <div className="p-1 flex flex-col justify-center items-center gap-y-1 px-1 w-[98px] border-r border-white text-primary-foreground">
              <Clock className="w-6 h-6" />
              <p className="w-full truncate text-xs text-center">
                {tTtl("cMinimum")}: {getDuration(minBookingTime, locale)}
              </p>
            </div>
            <DaysOfWeekList
              selectedDayOfWeek={selectedDayOfWeek}
              setSelectedDayOfWeek={handleSelectDayOfWeek}
              timeSlotsDaysOfWeek={schedule.map(
                (dayOfWeek) => dayOfWeek.dayOfWeek,
              )}
            />
          </div>
          <ScrollArea className="h-[500px]">
            <div className="min-h-[500px] flex">
              <TimeSlotsList timeSlots={selectedDayOfWeekTimeSlots} />
              <PriceSlotsList
                timeSlots={selectedDayOfWeekTimeSlots}
                selectedSlotIds={selectedSlotIds}
                setSelectedSlotIds={handleSelectSlotIds}
              />
            </div>
          </ScrollArea>
          <div className="flex flex-col py-5 border-t border-border gap-y-5">
            <div className="px-5 flex justify-between">
              <div className="flex text-xl">
                <div className="w-[98px] flex items-center">
                  {tLbl("total")}:
                </div>
                <div className="font-light text-primary">
                  {amount} {tTtl("uah")}
                </div>
              </div>
              {inventoryPrice && (
                <div className="pl-5 flex items-center gap-x-2">
                  <label
                    htmlFor="all-slotts-check"
                    className="-mb-[2px] text-xl font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {tTtl("withInventory")}
                  </label>
                  <Checkbox
                    id="inventory-price-check"
                    checked={isInventoryPrice}
                    onCheckedChange={handleAddInventoryPrice}
                    className="rounded-full w-5 h-5"
                  />
                </div>
              )}
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
                {tTtl("cancel")}
              </Button>
              <Button
                variant="outlineSecondary"
                size="md"
                disabled={isMinBookingTime || isBookLoading || isPaymentLoading}
              >
                {tTtl("pay")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default BookSchedule;
