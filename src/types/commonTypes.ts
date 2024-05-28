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
  id: number;
  timeSlot: TTimeSlot;
};

export type TBooking = {
  bookingSlots: BookingSlot[];
  createdAt: string;
  facility: TFacility;
  id: number;
  price: string;
  status: string;
};

export type TSchedule = {
  date: string;
  dayOfWeek: number;
  timeSlots: TTimeSlot[];
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
  id: number;
  name: string;
  districts: { id: number; name: string }[];
};

export type TDistrict = {
  id: number;
  name: string;
  city: TCity;
};

export type TSelectedItem = {
  key: string | number;
  name: string;
};

export type TPriceRange = {
  min: number;
  max: number;
};
