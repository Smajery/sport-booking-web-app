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
  handleLogin: () => void;
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

  // const handleLogout = () => {
  //   setIsLogoutLoading(true);
  //   logout()
  //     .then((data) => {
  //       console.log(data.message);
  //     })
  //     .catch((error) => {
  //       ErrorHandler.handle(error, {
  //         componentName: "AuthProvider__handleLogout",
  //       });
  //     })
  //     .finally(() => {
  //       setUser(null);
  //       setIsAuth(false);
  //       deleteCookie("accessToken");
  //       deleteCookie("cachedUserData");
  //
  //       setIsLogoutLoading(false);
  //     });
  // };

  const handleLogout = React.useCallback(async () => {
    setIsLogoutLoading(true);
    try {
      const data = await logout();
      console.log(data.message);
      setUser(null);
      setIsAuth(false);
      deleteCookie("accessToken");
      deleteCookie("cachedUserData");
    } catch (error) {
      ErrorHandler.handle(error, {
        componentName: "AuthProvider__handleLogout",
      });
    } finally {
      setIsLogoutLoading(false);
    }
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
    setCookie("isAuth", JSON.stringify(true));
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
    handleLogin,
    handleLogout,
  };

  React.useEffect(() => {
    const isAuthUser = getCookie("isAuth");
    if (isAuthUser) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    setIsAuthLoading(false);
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      const isAuthUser = getCookie("isAuth");
      if (isAuthUser) {
        try {
          const cachedUserData = getCookie("cachedUserData");
          if (cachedUserData) {
            setUser(JSON.parse(cachedUserData));
          } else {
            const response = await getUser();
            const userData = response.data;
            setUser(userData);
            setCookie("cachedUserData", JSON.stringify(userData));
          }
        } catch (error) {
          ErrorHandler.handle(error, { componentName: "AuthProvider" });
        }
      } else {
        // handleLogout();
      }
    };

    fetchData();
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
