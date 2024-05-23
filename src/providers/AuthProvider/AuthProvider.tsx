"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { routes } from "@/utils/constants/routes.constants";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@/utils/helpers/cookie.helpers";
import { useMutation, useQuery } from "@apollo/client";
import {
  LOGOUT_USER_MUTATION,
  REFRESH_TOKEN_MUTATION,
} from "@/apollo/mutations/auth";
import { TUserInfo } from "@/types/private/user/profileTypes";
import { GET_USER_INFO_QUERY } from "@/apollo/query/private/user/profile";
import { jwtDecode } from "jwt-decode";

type AuthContextData = {
  isLogoutLoading: boolean;
  isAuthLoading: boolean;
  isAuth: boolean;
  user: TUserInfo | null;
  isUserLoading: boolean;
};

type AuthActions = {
  setIsAuthLoading: (value: boolean) => void;
  setIsAuth: (value: boolean) => void;
  handleLogout: () => void;
};

const AuthContext = React.createContext<
  (AuthContextData & AuthActions) | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter();

  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = React.useState<boolean>(true);

  const [user, setUser] = React.useState<TUserInfo | null>(null);
  const [isUserLoading, setIsUserLoading] = React.useState<boolean>(true);

  const [logoutUserMutation, { loading: logoutLoading }] =
    useMutation(LOGOUT_USER_MUTATION);
  const [refreshTokenMutation] = useMutation(REFRESH_TOKEN_MUTATION);

  const {} = useQuery(GET_USER_INFO_QUERY, {
    skip: !isAuth,
    context: {
      authRequired: true,
    },
    onCompleted: (data) => {
      setUser(data.getProfile);
      setIsUserLoading(false);
    },
  });

  const handleLogout = async () => {
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
    }
  };

  const getRefreshedAccessToken = async (refreshToken: string) => {
    try {
      const { data } = await refreshTokenMutation({
        variables: { refresh: refreshToken },
      });
      const accessToken = data.accessToken;
      const decodedAccessToken: { exp: number } = jwtDecode(accessToken);
      setCookie("accessToken", accessToken, decodedAccessToken.exp);
      return accessToken;
    } catch (e) {
      ErrorHandler.handle(e, {
        componentName: "AuthProvider__refreshAccessToken",
      });
      return null;
    }
  };

  React.useEffect(() => {
    const handleCheckAuthStatus = async () => {
      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");

      if (accessToken) {
        setIsAuth(true);
      } else if (refreshToken) {
        const newAccessToken = await getRefreshedAccessToken(refreshToken);
        setIsAuth(!!newAccessToken);
      } else {
        setIsAuth(false);
      }
      setIsAuthLoading(false);
    };

    handleCheckAuthStatus().catch((e) =>
      ErrorHandler.handle(e, {
        componentName: "AuthProvider__handleCheckAuthStatus",
      }),
    );
  }, []);

  const authContextData: AuthContextData = {
    isAuthLoading,
    isLogoutLoading: logoutLoading,
    isAuth,
    user,
    isUserLoading,
  };

  const authActions: AuthActions = {
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
