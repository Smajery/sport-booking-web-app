import { getHours, getMinutes, parseISO } from "date-fns";
import { TTimeSlot } from "@/types/commonTypes";

export const getTimeUtc = (time: string) => {
  const timeFromBaseDate = new Date(`1970-01-01T${time}:00.000`).getTime();
  return new Date(timeFromBaseDate).toISOString().split("T")[1].substring(0, 5);
};

export const getMinutesFromIsoTime = (isoTime: string) => {
  const date = parseISO(isoTime);
  const hours = getHours(date);
  const minutes = getMinutes(date);
  return hours * 60 + minutes;
};

export const getTimeSlots = ({
  daysOfWeek,
  startTime,
  endTime,
  price,
}: {
  daysOfWeek: Number[];
  startTime: string;
  endTime: string;
  price: number;
}) => {
  const slots: TTimeSlot[] = [];
  const duration = 30;
  let id = 1;

  const start = new Date(`1970-01-01T${getTimeUtc(startTime)}:00.000Z`);
  const end = new Date(`1970-01-01T${getTimeUtc(endTime)}:00.000Z`);

  daysOfWeek.forEach((dayOfWeek) => {
    let currentTime = new Date(start.getTime());

    while (currentTime < end) {
      const nextTime = new Date(currentTime.getTime() + duration * 60000); // Добавляем 30 минут

      const newSlot: TTimeSlot = {
        id: id++,
        dayOfWeek,
        startTime: currentTime.toISOString(),
        endTime: nextTime.toISOString(),
        price: price,
        status: "available",
        temporaryBlockDate: "",
      };
      slots.push(newSlot);

      currentTime = nextTime;
    }
  });

  return slots;
};
