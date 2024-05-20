import { TFacility } from "@/types/public/facilityTypes";
import { TBooking } from "@/types/commonTypes";

type TUserOwner = {
  id: number;
  organizationName: string;
  phone: string;
  userId: number;
};

type Role = {
  value: string;
};

export type TUser = {
  activationLink: string;
  avatar: string | null;
  bookings: TBooking[];
  createdAt: string;
  dateOfBirth: string | null;
  email: string;
  facebookId: string | null;
  facilities: TFacility[];
  fullname: string | null;
  googleId: string | null;
  id: number;
  isActivated: boolean;
  userOwner: TUserOwner | null;
};

export type TUserInfo = {
  id: number;
  email: string;
  roles: Role[];
};

export type TUserAvatar = {
  avatar: string | null;
  fullname: string | null;
};
