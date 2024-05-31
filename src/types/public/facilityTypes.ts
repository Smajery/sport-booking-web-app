import { TDistrict, TImage, TSchedule, TTimeSlot } from "@/types/commonTypes";

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

type TFacilityOwner = {
  id: number;
  userOwner: { phone: string };
};

export type TCurrentUserRate = {
  id: number;
  value: number;
};

export type TFacilityItem = {
  address: string;
  avgRating: number;
  avgPrice: number;
  coveringType: ECoveringType;
  currentUserIsFavorite: boolean;
  description: string;
  district: TDistrict;
  facilityType: EFacilityType;
  id: number;
  images: TImage[];
  location: string;
  name: string;
  ratingCount: number;
  sportType: ESportType[];
  isWorking: boolean;
};

export type TFacility = {
  address: string;
  avgRating: number;
  avgPrice: number;
  coveringType: ECoveringType;
  currentUserIsFavorite: boolean;
  currentUserRate: TCurrentUserRate;
  userHasAttended: boolean;
  inventoryPrice: number;
  inventoryName: string;
  description: string;
  district: TDistrict;
  facilityType: EFacilityType;
  id: number;
  images: TImage[];
  location: string;
  name: string;
  owner: TFacilityOwner;
  ratingCount: number;
  sportType: ESportType[];
  isWorking: boolean;
};

export type TFacilitySchedule = {
  minBookingTime: number;
  inventoryPrice: number;
  schedule: TSchedule[];
};
