"use client";

import PrivateHeader from "@/layouts/Private/Header";
import PublicHeader from "@/layouts/Public/Header";
import RootLayoutTemplate from "@/layouts/RootLayout/templates/RootLayoutTemplate/RootLayoutTemplate";
import React from "react";

import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";

interface IRootLayout {
  children: React.ReactNode;
}

const RootLayout: React.FC<IRootLayout> = ({ children }) => {
  const { isAuthLoading, isAuth } = useAuthContext();

  if (isAuthLoading) {
    return <RootLayoutTemplate>{children}</RootLayoutTemplate>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isAuth ? <PrivateHeader /> : <PublicHeader />}
      {children}
    </div>
  );
};

export default RootLayout;
