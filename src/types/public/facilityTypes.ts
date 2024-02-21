import { TImage } from "@/types/commonTypes";

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
  sortBy: string;
  search: string;
  coveringType: string;
  facilityType: string;
  sportType: string;
  district: string;
};

export type TFacility = {
  id: string;
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
};
