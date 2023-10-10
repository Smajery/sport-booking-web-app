"use client";

import React from "react";

import ErrorHandler from "@/utils/handlers/ErrorHandler";

import { logout } from "@/api/auth";
import { getUser } from "@/api/user";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@/utils/helpers/cookie.helpers";

type AuthUser = {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
};

type AuthContextData = {
  isLogoutLoading: boolean;
  isAuthLoading: boolean;
  isAuth: boolean;
  user: AuthUser | null;
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
  const [isAuthLoading, setIsAuthLoading] = React.useState<boolean>(true);
  const [isLogoutLoading, setIsLogoutLoading] = React.useState<boolean>(false);
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<AuthUser | null>(null);

  const handleLogout = () => {
    setIsLogoutLoading(true);
    logout()
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        ErrorHandler.handle(error, {
          componentName: "AuthProvider__handleLogout",
        });
      })
      .finally(() => {
        setUser(null);
        setIsAuth(false);
        deleteCookie("accessToken");
        deleteCookie("cachedUserData");

        setIsLogoutLoading(false);
      });
  };

  const authContextData: AuthContextData = {
    isAuthLoading,
    isLogoutLoading,
    isAuth,
    user,
  };

  const authActions: AuthActions = {
    setIsLogoutLoading,
    setIsAuthLoading,
    setIsAuth,
    handleLogout,
  };

  React.useEffect(() => {
    const token = getCookie("accessToken");
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    setIsAuthLoading(false);
  }, []);

  React.useEffect(() => {
    const token = getCookie("accessToken");
    if (token) {
      const cachedUserData = getCookie("cachedUserData");
      if (cachedUserData) {
        setUser(JSON.parse(cachedUserData));
      } else {
        getUser()
          .then((response) => {
            const userData = response.data;
            setUser(userData);
            setCookie(
              "cachedUserData",
              JSON.stringify(userData),
              token.expires_in,
            );
          })
          .catch((error) =>
            ErrorHandler.handle(error, { componentName: "AuthProvider" }),
          );
      }
    } else {
      // handleLogout();
    }
  }, [isAuth]);

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
