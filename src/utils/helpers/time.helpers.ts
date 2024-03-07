import { getHours, getMinutes, parseISO } from "date-fns";

export const getMinutesFromIsoTime = (isoTime: string) => {
  const date = parseISO(isoTime);
  const hours = getHours(date);
  const minutes = getMinutes(date);
  return hours * 60 + minutes;
};
