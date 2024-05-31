import {
  TBooking,
  TCity,
  TDistrict,
  TImage,
  TSchedule,
  TTimeSlot,
} from "@/types/commonTypes";
import { TUser } from "@/types/private/user/profileTypes";

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

export type TFacility = {
  address: string;
  avgRating: number;
  avgPrice: number;
  bookings: TBooking[];
  city: TCity;
  coveringType: ECoveringType;
  description: string;
  district: TDistrict;
  facilityType: EFacilityType;
  id: number;
  images: TImage[];
  location: string;
  inventoryPrice: string;
  inventoryName: string;
  name: string;
  owner: TUser;
  ownerId: number;
  ratingCount: number;
  sportType: ESportType[];
  minBookingTime: number;
  isWorking: boolean;
};

export type TFacilitySchedule = {
  id: number;
  minBookingTime: number;
  schedule: TSchedule[];
};
