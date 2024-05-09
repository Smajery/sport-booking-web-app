import {
  TBooking,
  TCity,
  TDistrict,
  TImage,
  TTimeSlot,
} from "@/types/commonTypes";
import { TUser } from "@/types/private/profileTypes";

export enum ESportType {
  basketball = "basketball",
  soccer = "soccer",
  tennis = "tennis",
  volleyball = "volleyball",
}

export enum ECoveringType {
  artificial_lawn = "artificial_lawn",
  parquet = "parquet",
  natural_lawn = "natural_lawn",
  rubber = "rubber",
  sand = "sand",
}

export enum EFacilityType {
  indoor = "indoor",
  outdoor = "outdoor",
}

export type TFacilityFilter = {
  search?: string | null;
  coveringType?: string | null;
  facilityType?: string | null;
  sportType?: string | null;
  district?: string | null;
};

type TUserRate = {
  id: string;
  value: string;
};

export type TFacility = {
  address: string;
  avgRating: number;
  avgPrice: number;
  bookings: TBooking[];
  city: TCity;
  coveringType: ECoveringType;
  currentUserIsFavorite: boolean;
  currentUserRate: TUserRate;
  description: string;
  district: TDistrict;
  facilityType: EFacilityType;
  id: number;
  images: TImage[];
  location: string;
  name: string;
  owner: TUser;
  ownerId: number;
  ratingCount: number;
  sportType: ESportType[];
  minBookingTime: number;
};

export type TFacilitySchedule = {
  minBookingTime: number;
  timeSlots: TTimeSlot[];
};
