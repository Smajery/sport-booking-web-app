"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";
import { useModalContext } from "@/providers/ModalProvider/ModalProvider";
import { routes } from "@/utils/constants/routes.constants";

interface IAdminProtectRoute {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RolesProtectRoute: React.FC<IAdminProtectRoute> = ({
  children,
  allowedRoles,
}) => {
  const { user, isUserLoading } = useAuthContext();
  const { setIsLoginModal } = useModalContext();
  const router = useRouter();

  const checkUserRoles = (userRoles: { value: string }[]) => {
    const userRoleValues = userRoles.map((role) => role.value);
    return allowedRoles.every((role) => userRoleValues.includes(role));
  };

  const isUserHasCorrectRoles = user && checkUserRoles(user.roles);

  React.useEffect(() => {
    if (isUserLoading) return;
    if (!isUserHasCorrectRoles) {
      router.push(routes.HOME);
    }
  }, [router, user, setIsLoginModal]);

  return !isUserLoading && isUserHasCorrectRoles ? children : null;
};

export default RolesProtectRoute;
