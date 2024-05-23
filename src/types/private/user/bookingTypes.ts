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

type TCurrentUserRate = {
  id: number;
  value: string;
};

type TOwner = {
  id: number;
};

type TBookingFacility = {
  id: number;
  name: string;
  currentUserRate: TCurrentUserRate | null;
  owner: TOwner;
};

export type TBooking = {
  id: number;
  startTime: string;
  endTime: string;
  status: EBookingStatus;
  facility: TBookingFacility;
};
