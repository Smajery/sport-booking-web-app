"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { routes } from "@/utils/constants/routes.constants";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { deleteCookie, getCookie } from "@/utils/helpers/cookie.helpers";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER_MUTATION } from "@/apollo/mutations/auth";

type AuthContextData = {
  isLogoutLoading: boolean;
  isAuthLoading: boolean;
  isAuth: boolean;
};

type AuthActions = {
  setIsLogoutLoading: (value: boolean) => void;
  setIsAuthLoading: (value: boolean) => void;
  setIsAuth: (value: boolean) => void;
  handleLogout: () => void;
};

const AuthContext = React.createContext<
  (AuthContextData & AuthActions) | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter();
  const [isAuthLoading, setIsAuthLoading] = React.useState<boolean>(true);
  const [isLogoutLoading, setIsLogoutLoading] = React.useState<boolean>(false);
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const [logoutUserMutation] = useMutation(LOGOUT_USER_MUTATION);

  const handleLogout = async () => {
    setIsLogoutLoading(true);
    try {
      await logoutUserMutation();
      setIsAuth(false);
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      push(routes.HOME);
    } catch (e) {
      ErrorHandler.handle(e, {
        componentName: "AuthProvider__handleLogout",
      });
    } finally {
      setIsLogoutLoading(false);
    }
  };

  React.useEffect(() => {
    const token = getCookie("accessToken");
    setIsAuth(!!token);
    setIsAuthLoading(false);
  }, []);

  const authContextData: AuthContextData = {
    isAuthLoading,
    isLogoutLoading,
    isAuth,
  };

  const authActions: AuthActions = {
    setIsLogoutLoading,
    setIsAuthLoading,
    setIsAuth,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={{ ...authContextData, ...authActions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextData & AuthActions => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
