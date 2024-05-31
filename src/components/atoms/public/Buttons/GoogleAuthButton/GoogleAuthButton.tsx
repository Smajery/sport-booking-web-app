"use client";

import React from "react";

import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";
import { useModalContext } from "@/providers/ModalProvider/ModalProvider";

import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { Button, ButtonProps } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { GOOGLE_AUTH_MUTATION } from "@/apollo/mutations/auth";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "@/utils/helpers/cookie.helpers";
import { useGoogleLogin } from "@react-oauth/google";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";
import { cn } from "@/lib/utils";

interface IGoogleAuthButton extends ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const GoogleAuthButton: React.FC<IGoogleAuthButton> = ({
  children,
  className = "",
  ...props
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const { setIsAuth } = useAuthContext();
  const { setIsLoginModal, setIsSignUpModal, isSignUpModal, isLoginModal } =
    useModalContext();

  const [googleAuth, { loading }] = useMutation(GOOGLE_AUTH_MUTATION);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (credentialsResponse) => {
      try {
        const { data } = await googleAuth({
          variables: {
            token: credentialsResponse.access_token,
          },
        });
        const accessToken = data.googleAuth.accessToken;
        const refreshToken = data.googleAuth.refreshToken;

        const decodedAccessToken: { exp: number } = jwtDecode(accessToken);
        const decodedRefreshToken: { exp: number } = jwtDecode(refreshToken);

        setCookie("accessToken", accessToken, decodedAccessToken.exp);
        setCookie("refreshToken", refreshToken, decodedRefreshToken.exp);

        setIsAuth(true);
        if (isSignUpModal) {
          setIsSignUpModal(false);
        }
        if (isLoginModal) {
          setIsLoginModal(false);
        }
      } catch (e) {
        ErrorHandler.handle(e, {
          componentName: "GoogleAuthButton__handleGoogleLogin",
        });
      }
    },
    onError: (error) => {
      ErrorHandler.handle(error, { componentName: "GoogleAuthButton__login" });
    },
  });

  return (
    <Button
      variant="none"
      size="lg"
      className={cn("google-gradient text-white", className)}
      onClick={() => handleGoogleLogin()}
      {...props}
    >
      {!loading ? children : tTtl("loading")}
    </Button>
  );
};

export default GoogleAuthButton;
