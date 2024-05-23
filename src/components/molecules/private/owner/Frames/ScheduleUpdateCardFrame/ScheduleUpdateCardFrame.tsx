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

interface IScheduleUpdateCardFrame {
  timeSlots: TTimeSlot[];
  selectedSlotIds: number[];
  setSelectedSlotIds: (value: number[]) => void;
  isSelectAvailable: boolean;
  isEditSchedule: boolean;
  setIsEditSchedule: (value: boolean) => void;
  handleCancel: () => void;
  isRequestLoading: boolean;
  facilityId: number;
}

const ScheduleUpdateCardFrame: React.FC<IScheduleUpdateCardFrame> = ({
  timeSlots,
  selectedSlotIds,
  setSelectedSlotIds,
  isSelectAvailable,
  isEditSchedule,
  setIsEditSchedule,
  handleCancel,
  isRequestLoading,
  facilityId,
}) => {
  const { push } = useRouter();

  const [deleteSchedule, { loading: deleteScheduleLoading }] = useMutation(
    DELETE_SCHEDULE_MUTATION,
  );

  const [requestError, setRequestError] = React.useState<
    ApolloError | undefined
  >(undefined);

  const dayAvailability = facilityConfig.daysOfWeek.reduce(
    (acc, day) => {
      acc[day.key] = timeSlots.some((slot) => slot.dayOfWeek === day.key);
      return acc;
    },
    {} as {
      [key: number]: boolean;
    },
  );

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
      push(`${routes.USER_FACILITIES}/${facilityId}`);
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
              <div className="p-1 flex flex-col justify-center items-center gap-y-1 px-1 w-[88px] border-r border-white text-primary-foreground">
                <Clock className="w-6 h-6" />
                <p className="w-full truncate text-xs text-center">Min:</p>
              </div>
              <div className="flex items-center px-10 py-3 gap-x-10">
                {facilityConfig.daysOfWeek.map((day) => (
                  <div
                    key={day.key}
                    className={clsx(
                      "text-primary-foreground flex justify-center cursor-pointer font-hover-high",
                      {
                        "text-2xl leading-7": selectedDayOfWeek === day.key,
                        "opacity-50 pointer-events-none":
                          !dayAvailability[day.key],
                      },
                    )}
                    data-content={day.name}
                    onClick={() => setSelectedDayOfWeek(day.key)}
                  >
                    {day.name}
                  </div>
                ))}
              </div>
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
                      Cancel
                    </Button>
                    <Button
                      className="variant-gradient"
                      size="lg"
                      disabled={isRequestLoading}
                    >
                      {!isRequestLoading ? "Save" : "Loading..."}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outlineSecondary"
                    size="lg"
                    onClick={() => setIsEditSchedule(true)}
                    type="button"
                  >
                    Edit Schedule
                  </Button>
                )}
                <ApproveActionCard
                  handleApprove={handleDeleteSchedule}
                  alertDescription="This action cannot be undone. This will permanently delete your
            schedule and remove its data from our servers."
                >
                  <Button
                    type="button"
                    variant="outlineDestructive"
                    size="lg"
                    className="ml-auto"
                    disabled={isEditSchedule}
                  >
                    Delete Schedule
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

export default ScheduleUpdateCardFrame;
