"use client";

import PrivateHeader from "@/layouts/private/Header";
import PublicHeader from "@/layouts/public/Header";
import React from "react";

import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";

interface IRootLayout {
  children: React.ReactNode;
}

const RootLayout: React.FC<IRootLayout> = ({ children }) => {
  const { user } = useAuthContext();

  // if (isAuthLoading) {
  //   return <RootLayoutTemplate>{children}</RootLayoutTemplate>;
  // }

  return (
    <div className="flex flex-col min-h-screen">
      {user ? <PrivateHeader /> : <PublicHeader />}
      {children}
    </div>
  );
};

export default RootLayout;
