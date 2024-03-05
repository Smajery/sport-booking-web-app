export type TImage = {
  image: string;
  isMain: boolean;
};

export enum EScheduleStatus {
  available = "available",
  booked = "booked",
  unavailable = "unavailable",
}

export type TimeSlot = {
  id: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  price: number;
  status: EScheduleStatus;
  temporaryBlockDate: string;
};
