export type TUser = {
  id: string;
  fullname: string | null;
  email: string;
  dateOfBirth: string | null;
  avatar: string | null;
  activationLink: string;
  roles: [];
  isActivated: boolean;
};
