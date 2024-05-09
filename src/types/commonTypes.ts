import { TFacility } from "@/types/public/facilityTypes";

export type TImage = {
  image: string;
  isMain: boolean;
};

export enum EScheduleStatus {
  available = "available",
  booked = "booked",
  unavailable = "unavailable",
}

type BookingSlot = {
  id: string;
  timeSlot: TTimeSlot;
};

export type TBooking = {
  bookingSlots: BookingSlot[];
  createdAt: string;
  facility: TFacility;
  id: string;
  price: string;
  status: string;
};

export type TTimeSlot = {
  id: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  price: number;
  status: EScheduleStatus;
  temporaryBlockDate: string;
};

export type TCity = {
  id: string;
  name: string;
  districts: { id: string; name: string }[];
};

export type TDistrict = {
  id: string;
  name: string;
  city: TCity;
};
