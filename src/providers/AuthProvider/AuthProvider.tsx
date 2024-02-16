"use client";

import React from "react";
import { TUser } from "@/types/public/profileTypes";

interface AuthContextType {
  user: TUser | null;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<TUser | null>(null);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
