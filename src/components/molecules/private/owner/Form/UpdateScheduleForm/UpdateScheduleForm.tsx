"use client";

import React from "react";
import * as z from "zod";
import { useMutation } from "@apollo/client";
import { UPDATE_SCHEDULE_MUTATION } from "@/apollo/mutations/private/owner/facility";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import UpdateScheduleFormContent from "@/components/molecules/private/owner/Contents/UpdateScheduleFormContent/UpdateScheduleFormContent";
import { TFacilitySchedule } from "@/types/private/owner/facilityTypes";
import ScheduleUpdatePreviewFrame from "@/components/molecules/private/owner/Frames/ScheduleUpdatePreviewFrame/ScheduleUpdatePreviewFrame";
import { CheckedState } from "@radix-ui/react-checkbox";
import { TSchedule, TTimeSlot } from "@/types/commonTypes";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IUpdateScheduleForm {
  facilitySchedule: TFacilitySchedule;
}

const updateScheduleFormSchema = z.object({
  timeSlotIds: z.array(z.number()).min(1, "At least one slot"),
  price: z.string().min(1, "Required"),
});

const UpdateScheduleForm: React.FC<IUpdateScheduleForm> = ({
  facilitySchedule,
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const { schedule, minBookingTime, id } = facilitySchedule;
  const [updateSchedule, { loading }] = useMutation(UPDATE_SCHEDULE_MUTATION);

  const [isEditSchedule, setIsEditSchedule] = React.useState<boolean>(false);
  const [isAllSlots, setIsAllSlots] = React.useState<CheckedState>(true);
  const [initSchedule, setInitSchedule] = React.useState<TSchedule[]>(schedule);
  const [selectedSlotIds, setSelectedSlotIds] = React.useState<number[]>([]);

  const form = useForm<z.infer<typeof updateScheduleFormSchema>>({
    resolver: zodResolver(updateScheduleFormSchema),
    defaultValues: {
      timeSlotIds: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof updateScheduleFormSchema>) => {
    const { price, ...otherValues } = values;
    const modifiedOtherValues = {
      ...otherValues,
      price: Number(price),
    };
    try {
      await updateSchedule({
        context: {
          authRequired: true,
        },
        variables: {
          updateTimeSlotsInput: modifiedOtherValues,
        },
      });
      form.reset();
      setIsEditSchedule(false);
      setSelectedSlotIds([]);
    } catch (e) {
      ErrorHandler.handle(e, { componentName: "UpdateFacilityForm__onSubmit" });
    }
  };

  const priceWatch = form.watch("price");

  const handleSelectSlotIds = (selectedSlotIds: number[]) => {
    form.setValue("timeSlotIds", selectedSlotIds);
    setSelectedSlotIds(selectedSlotIds);
  };

  //Temporary solution for price updating
  React.useEffect(() => {
    if (priceWatch) {
      let updatedSchedule: TSchedule[] = [];
      if (isAllSlots) {
        schedule.forEach((item) => {
          let updatedTimeSlots: TTimeSlot[] = [];
          item.timeSlots.forEach((timeSlot) =>
            updatedTimeSlots.push({ ...timeSlot, price: Number(priceWatch) }),
          );
          updatedSchedule.push({ ...item, timeSlots: updatedTimeSlots });
        });
      } else {
        schedule.forEach((item) => {
          let updatedTimeSlots: TTimeSlot[] = [];
          item.timeSlots.forEach((timeSlot) => {
            if (selectedSlotIds.includes(timeSlot.id)) {
              updatedTimeSlots.push({ ...timeSlot, price: Number(priceWatch) });
            } else {
              updatedTimeSlots.push(timeSlot);
            }
          });
          updatedSchedule.push({ ...item, timeSlots: updatedTimeSlots });
        });
      }
      setInitSchedule(updatedSchedule);
    }
  }, [priceWatch, isAllSlots, selectedSlotIds]);

  React.useEffect(() => {
    if (!isEditSchedule) return;
    if (isAllSlots) {
      schedule.forEach((item) => {
        const allTimeSlotIds = item.timeSlots.map((timeSlot) => timeSlot.id);
        const initTimeSLotsIds = form.getValues("timeSlotIds");
        form.setValue("timeSlotIds", [...initTimeSLotsIds, ...allTimeSlotIds]);
        setSelectedSlotIds([...selectedSlotIds, ...allTimeSlotIds]);
      });
    } else {
      form.setValue("timeSlotIds", []);
      setSelectedSlotIds([]);
    }
  }, [isAllSlots, isEditSchedule]);

  const handleCancel = () => {
    form.reset();
    setSelectedSlotIds([]);
    setInitSchedule(schedule);
    setIsAllSlots(true);
    setIsEditSchedule(false);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between gap-x-5"
      >
        <div className="flex flex-col gap-y-5 grow">
          {isEditSchedule && (
            <>
              <UpdateScheduleFormContent
                form={form}
                isAllSlots={isAllSlots}
                setIsAllSlots={setIsAllSlots}
              />
              <Separator />
            </>
          )}
        </div>
        <div className="flex flex-col gap-y-5">
          <p className="text-4xl text-primary font-semibold">
            {tTtl("preview")}
          </p>
          <ScheduleUpdatePreviewFrame
            schedule={initSchedule}
            selectedSlotIds={selectedSlotIds}
            setSelectedSlotIds={handleSelectSlotIds}
            isSelectAvailable={!isAllSlots}
            isEditSchedule={isEditSchedule}
            setIsEditSchedule={setIsEditSchedule}
            handleCancel={handleCancel}
            isRequestLoading={loading}
            facilityId={id}
            minBookingTime={minBookingTime}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateScheduleForm;
