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

type TOwner = {
  id: number;
};

type TBookingFacility = {
  id: number;
  name: string;
};

export type TBooking = {
  id: number;
  startTime: string;
  endTime: string;
  status: EBookingStatus;
  facility: TBookingFacility;
};
