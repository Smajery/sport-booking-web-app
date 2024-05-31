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
  dateOfBirth: string | null;
  googleId: string | null;
  email: string;
  fullname: string | null;
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
