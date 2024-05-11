import { TFacility } from "@/types/public/facilityTypes";
import { TBooking } from "@/types/commonTypes";

type TUserOwner = {
  id: string;
  organizationName: string;
  phone: string;
  userId: string;
};

type Role = {
  description: string;
  id: string;
  values: string;
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
  id: string;
  isActivated: boolean;
  roles: Role[];
  userOwner: TUserOwner;
};

export type TUserAvatar = {
  avatar: string | null;
  fullname: string | null;
};
