"use client";

import { redirect } from "next/navigation";
import React from "react";

import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";

import { ROUTE_LOGIN } from "@/utils/constants/routes.constants";

interface IMain {
  children: React.ReactNode;
}

const Main: React.FC<IMain> = ({ children }) => {
  const { isAuth, isAuthLoading } = useAuthContext();

  React.useEffect(() => {
    if (!isAuth && !isAuthLoading) {
      redirect(ROUTE_LOGIN);
    }
  }, [isAuth, isAuthLoading]);

  return <main className="flex flex-1">{children}</main>;
};

export default Main;
