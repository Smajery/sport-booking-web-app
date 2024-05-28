"use client";

import React from "react";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CREATE_SCHEDULE_MUTATION } from "@/apollo/mutations/private/owner/facility";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { routes } from "@/utils/constants/routes.constants";
import { facilityConfig } from "@/config/public/facility";
import { facilityConfig as ownerFacilityConfig } from "@/config/private/owner/facility";
import MultiSelectField from "@/components/molecules/private/owner/Fields/MultiSelectField/MultiSelectField";
import InputField from "@/components/molecules/private/owner/Fields/InputField/InputField";
import ScheduleCreatePreviewFrame from "@/components/molecules/private/owner/Frames/ScheduleCreatePreviewFrame/ScheduleCreatePreviewFrame";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TTimeSlot } from "@/types/commonTypes";
import { getTimeSlots, getTimeUtc } from "@/utils/helpers/time.helpers";
import SelectorField from "@/components/molecules/private/owner/Fields/SelectorField/SelectorField";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

const createScheduleFormSchema = z.object({
  facilityId: z.number().min(1),
  daysOfWeek: z
    .array(
      z.object({
        key: z.number(),
        name: z.string(),
      }),
    )
    .min(1, "At least one day of week"),
  startTime: z.string().min(1, "Required"),
  endTime: z.string().min(1, "Required"),
  price: z.string().min(1, "Required"),
  minBookingTime: z.string().min(1, "Required"),
});

const CreateScheduleForm = () => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const { myFacilityId } = useParams();
  const { push } = useRouter();

  const [createSchedule, { loading }] = useMutation(CREATE_SCHEDULE_MUTATION);

  const [generatedTimeSlots, setGeneratedTimeSlots] = React.useState<
    TTimeSlot[]
  >([]);

  const form = useForm<z.infer<typeof createScheduleFormSchema>>({
    resolver: zodResolver(createScheduleFormSchema),
    defaultValues: {
      daysOfWeek: [],
      facilityId: Number(myFacilityId),
    },
  });

  const onSubmit = async (values: z.infer<typeof createScheduleFormSchema>) => {
    const {
      price,
      daysOfWeek,
      startTime,
      endTime,
      minBookingTime,
      ...otherValues
    } = values;
    const modifiedOtherValues = {
      ...otherValues,
      price: Number(price),
      daysOfWeek: daysOfWeek.map((dayOfWeek) => dayOfWeek.key),
      startTime: getTimeUtc(startTime), //Temporary solution
      endTime: getTimeUtc(endTime), //Temporary solution
      minBookingTime: Number(minBookingTime),
    };
    try {
      await createSchedule({
        context: {
          authRequired: true,
        },
        variables: {
          createScheduleInput: modifiedOtherValues,
        },
      });
      handleCancel();
    } catch (e) {
      ErrorHandler.handle(e, { componentName: "CreateFacilityForm__onSubmit" });
    }
  };

  const handleCancel = () => {
    push(`${routes.OWNER_FACILITIES}/${myFacilityId}`);
  };

  const daysOfWeekWatch = form.watch("daysOfWeek");
  const startTimeWatch = form.watch("startTime");
  const endTimeWatch = form.watch("endTime");
  const priceWatch = form.watch("price");
  const minBookingTimeWatch = form.watch("minBookingTime");

  //Temporary solution
  React.useEffect(() => {
    if (daysOfWeekWatch && startTimeWatch && endTimeWatch && priceWatch) {
      const values = form.getValues();
      const { price, daysOfWeek, ...otherValues } = values;
      const modifiedValues = {
        ...otherValues,
        price: Number(price),
        daysOfWeek: daysOfWeek.map((dayOfWeek) => dayOfWeek.key),
      };
      const newTimeSlots = getTimeSlots(modifiedValues);
      setGeneratedTimeSlots(newTimeSlots);
    } else {
      if (generatedTimeSlots.length) {
        setGeneratedTimeSlots([]);
      }
    }
  }, [daysOfWeekWatch, startTimeWatch, endTimeWatch, priceWatch]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between gap-x-5"
      >
        <div className="flex flex-col gap-y-5 grow">
          <p className="text-4xl text-primary font-semibold">
            {tTtl("createSchedule")}
          </p>
          <MultiSelectField
            form={form}
            name="daysOfWeek"
            labelText="daysOfWeek"
            selectableItems={facilityConfig.daysOfWeek}
          />
          <div className="flex justify-between gap-x-5">
            <InputField
              form={form}
              name="startTime"
              type="time"
              labelText="startTime"
              step={3600}
              className="input__no-time-select"
            />
            <InputField
              form={form}
              name="endTime"
              type="time"
              labelText="endTime"
              step={3600}
              className="input__no-time-select"
            />
          </div>
          <SelectorField
            form={form}
            name="minBookingTime"
            selectableItems={ownerFacilityConfig.minBookingTime}
            labelText="minBookingTime"
            placeholder="select"
          />
          <InputField
            form={form}
            name="price"
            type="number"
            labelText="pricePerSlot"
            placeholder="price"
            min={1}
          />
          <Separator />
          <div className="flex justify-end gap-x-5">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleCancel}
              disabled={loading}
            >
              {tTtl("cancel")}
            </Button>
            <Button variant="primary" size="lg" disabled={loading}>
              {!loading ? tTtl("save") : tTtl("loading")}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <p className="text-4xl text-primary font-semibold">
            {tTtl("preview")}
          </p>
          <ScheduleCreatePreviewFrame
            minBookingTime={
              minBookingTimeWatch ? Number(minBookingTimeWatch) : 0
            }
            timeSlots={generatedTimeSlots}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateScheduleForm;
