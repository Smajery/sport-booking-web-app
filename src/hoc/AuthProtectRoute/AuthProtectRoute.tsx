"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";
import { useModalContext } from "@/providers/ModalProvider/ModalProvider";
import { routes } from "@/utils/constants/routes.constants";

interface ICommonProtectRoute {
  children: React.ReactNode;
}

const AuthProtectRoute: React.FC<ICommonProtectRoute> = ({ children }) => {
  const router = useRouter();
  const { isAuth, isAuthLoading } = useAuthContext();
  const { setIsLoginModal } = useModalContext();

  React.useEffect(() => {
    if (isAuthLoading) return;
    if (!isAuth) {
      setIsLoginModal(true);
      router.push(routes.HOME);
    }
  }, [isAuth, router, isAuthLoading, setIsLoginModal]);

  return !isAuthLoading && isAuth ? children : null;
};

export default AuthProtectRoute;
