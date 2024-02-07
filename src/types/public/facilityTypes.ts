import { TImage } from "@/types/commonTypes";

export type TFacility = {
  id: string;
  name: string;
  district: string;
  address: string;
  sportType: string;
  coveringType: string;
  facilityType: string;
  description: string;
  minBookingTime: number;
  images: TImage[];
  ratingCount: number;
  avgRating: number;
  _count: {
    ratings: number;
  };
};
