"use client";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";

const ProfileSection = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  const { fullname } = user;

  return <section>{fullname}</section>;
};

export default ProfileSection;
