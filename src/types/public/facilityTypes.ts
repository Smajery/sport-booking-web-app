import { TImage, TimeSlot } from "@/types/commonTypes";

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

export type TFacility = {
  id: number;
  name: string;
  district: string;
  address: string;
  location: string;
  sportType: ESportType;
  coveringType: ECoveringType;
  facilityType: EFacilityType;
  description: string;
  minBookingTime: number;
  images: TImage[];
  ratingCount: number;
  avgRating: number;
  _count: {
    ratings: number;
  };
  currentUserRate: {
    id: string;
    value: string;
  };
  timeSlots: TimeSlot[];
};
