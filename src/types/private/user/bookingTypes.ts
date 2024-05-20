import {
  ECoveringType,
  EFacilityType,
  ESportType,
} from "@/types/public/facilityTypes";
import { TImage } from "@/types/commonTypes";

export enum EBookingStatus {
  pending = "pending",
  approved = "approved",
  unapproved = "unapproved",
  paid = "paid",
  cancelled = "cancelled",
  expired = "expired",
  completed = "completed",
  failed = "failed",
}

type TBookingFacility = {
  id: number;
  name: string;
  sportType: ESportType[];
  facilityType: EFacilityType;
  coveringType: ECoveringType;
  images: TImage[];
};

export type TBooking = {
  id: number;
  startTime: string;
  endTime: string;
  status: EBookingStatus;
  facility: TBookingFacility;
};
