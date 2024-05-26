"use client";

import React from "react";
import { CardContent, Card } from "@/components/ui/card";
import { facilityConfig } from "@/config/public/facility";
import { ScrollArea } from "@/components/ui/scroll-area";
import TimeSlotsList from "@/components/molecules/public/Lists/TimeSlotsList/TimeSlotsList";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { TTimeSlot } from "@/types/commonTypes";
import { Clock } from "lucide-react";
import PreviewUpdatePriceSlots from "@/components/molecules/private/owner/Lists/PreviewUpdatePriceSlotsList/PreviewUpdatePriceSlotsList";
import ApproveActionCard from "@/components/atoms/private/user/Cards/ApproveActionCard/ApproveActionCard";
import { ApolloError, useMutation } from "@apollo/client";
import { DELETE_SCHEDULE_MUTATION } from "@/apollo/mutations/private/owner/facility";
import ShowErrorModal from "@/components/molecules/public/Modals/ShowErrorModal/ShowErrorModal";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";
import { getDuration } from "@/utils/helpers/text.helpers";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";
import DaysOfWeekList from "@/components/molecules/public/Lists/DaysOfWeekList/DaysOfWeekList";

interface IScheduleUpdatePreviewFrame {
  timeSlots: TTimeSlot[];
  selectedSlotIds: number[];
  setSelectedSlotIds: (value: number[]) => void;
  isSelectAvailable: boolean;
  isEditSchedule: boolean;
  setIsEditSchedule: (value: boolean) => void;
  handleCancel: () => void;
  isRequestLoading: boolean;
  facilityId: number;
  minBookingTime: number;
}

const ScheduleUpdatePreviewFrame: React.FC<IScheduleUpdatePreviewFrame> = ({
  timeSlots,
  selectedSlotIds,
  setSelectedSlotIds,
  isSelectAvailable,
  isEditSchedule,
  setIsEditSchedule,
  handleCancel,
  isRequestLoading,
  facilityId,
  minBookingTime,
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const { push } = useRouter();

  const [deleteSchedule] = useMutation(DELETE_SCHEDULE_MUTATION);

  const [requestError, setRequestError] = React.useState<
    ApolloError | undefined
  >(undefined);

  const [selectedDayOfWeek, setSelectedDayOfWeek] = React.useState<number>(0);

  const filteredTimeSlots = timeSlots.filter(
    (timeSlot) =>
      timeSlot.dayOfWeek === selectedDayOfWeek &&
      timeSlot.status === "available",
  );

  const handleDeleteSchedule = async () => {
    try {
      await deleteSchedule({
        variables: {
          facilityId,
        },
      });
      push(`${routes.OWNER_FACILITIES}/${facilityId}`);
    } catch (e) {
      setRequestError(e as ApolloError);
      ErrorHandler.handle(e, {
        componentName: "ScheduleUpdateCardFrame__handleDeleteSchedule",
      });
    }
  };

  React.useEffect(() => {
    if (!timeSlots.length) {
      setSelectedDayOfWeek(0);
    } else {
      if (timeSlots[0].dayOfWeek !== selectedDayOfWeek) {
        setSelectedDayOfWeek(timeSlots[0].dayOfWeek);
      }
    }
  }, [timeSlots]);

  return (
    <>
      <Card className="bg-background overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col">
            <div className="flex bg-primary">
              <div className="p-1 flex flex-col justify-center items-center gap-y-1 px-1 w-[98px] border-r border-white text-primary-foreground">
                <Clock className="w-6 h-6" />
                <p className="w-full truncate text-xs text-center">
                  {tTtl("cMinimum")}: {getDuration(minBookingTime)}
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
                <PreviewUpdatePriceSlots
                  filteredTimeSlots={filteredTimeSlots}
                  selectedSlotIds={selectedSlotIds}
                  setSelectedSlotIds={setSelectedSlotIds}
                  isSelectAvailable={isSelectAvailable}
                />
              </div>
            </ScrollArea>
            <div className="flex flex-col py-5 border-t border-border gap-y-5">
              <div className="flex gap-x-4 px-5">
                {isEditSchedule ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={handleCancel}
                      disabled={isRequestLoading}
                    >
                      {tTtl("cancel")}
                    </Button>
                    <Button
                      variant="gradient"
                      size="lg"
                      disabled={isRequestLoading}
                    >
                      {!isRequestLoading ? tTtl("save") : tTtl("loading")}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outlineSecondary"
                    size="lg"
                    onClick={() => setIsEditSchedule(true)}
                    type="button"
                  >
                    {tTtl("editSchedule")}
                  </Button>
                )}
                <ApproveActionCard
                  handleApprove={handleDeleteSchedule}
                  alertDescription="deleteScheduleCannotBeUndone"
                >
                  <Button
                    type="button"
                    variant="outlineDestructive"
                    size="lg"
                    className="ml-auto"
                    disabled={isEditSchedule}
                  >
                    {tTtl("deleteSchedule")}
                  </Button>
                </ApproveActionCard>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <ShowErrorModal error={requestError} setError={setRequestError} />
    </>
  );
};

export default ScheduleUpdatePreviewFrame;
