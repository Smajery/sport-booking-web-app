"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import FloatingField from "@/components/molecules/public/Fields/FloatingField/FloatingField";
import { Button } from "@/components/ui/button";
import { Form as FormProvider } from "@/components/ui/form";

import ErrorHandler from "@/utils/handlers/ErrorHandler";
import GoogleAuthButton from "@/components/atoms/public/Buttons/GoogleAuthButton/GoogleAuthButton";
import { LOGIN_USER_MUTATION } from "@/apollo/mutations/auth";
import ModalCard from "@/components/atoms/public/Cards/ModalCard/ModalCard";
import { useMutation } from "@apollo/client";
import { Mail, Lock } from "lucide-react";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "@/utils/helpers/cookie.helpers";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";
import ApolloErrorFrame from "@/components/molecules/public/Frames/ApolloErrorFrame/ApolloErrorFrame";

interface ILoginModal {
  setIsLoginModal: (value: boolean) => void;
  setIsRestorePasswordModal: (value: boolean) => void;
}

const loginFormSchema = z.object({
  email: z.string().min(1).email().max(320),
  password: z.string().min(6).max(16),
});

const LoginModal: React.FC<ILoginModal> = ({
  setIsLoginModal,
  setIsRestorePasswordModal,
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const { setIsAuth } = useAuthContext();

  const [login, { loading, error }] = useMutation(LOGIN_USER_MUTATION);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const { data } = await login({
        variables: {
          loginInput: values,
        },
      });
      const accessToken = data.login.accessToken;
      const refreshToken = data.login.refreshToken;

      const decodedAccessToken: { exp: number } = jwtDecode(accessToken);
      const decodedRefreshToken: { exp: number } = jwtDecode(refreshToken);

      setCookie("accessToken", accessToken, decodedAccessToken.exp);
      setCookie("refreshToken", refreshToken, decodedRefreshToken.exp);

      setIsAuth(true);

      handleCloseModal();
    } catch (e) {
      ErrorHandler.handle(e, { componentName: "LoginModal__onSubmit" });
    }
  };

  const handleResetPassword = () => {
    setIsLoginModal(false);
    setIsRestorePasswordModal(true);
  };

  const handleCloseModal = () => {
    setIsLoginModal(false);
    form.reset();
  };

  return (
    <ModalCard handleCloseModal={handleCloseModal} title="welcome">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4 flex-grow"
          noValidate
        >
          <div className="flex flex-col gap-y-[8px]">
            <FloatingField
              form={form}
              type="email"
              name="email"
              labelText="email"
              placeholder="email"
              IconComponent={Mail}
              isRequestError={!!error}
            />
            <FloatingField
              form={form}
              type="password"
              name="password"
              placeholder="password"
              labelText="password"
              IconComponent={Lock}
              isRequestError={!!error}
            />
          </div>
          <Button
            variant="none"
            size="none"
            type="button"
            className="ml-auto underline text-sm text-secondary"
            onClick={handleResetPassword}
          >
            {tTtl("forgotPassword")}
          </Button>
          <ApolloErrorFrame error={error} />
          <Button
            variant="none"
            size="lg"
            type="submit"
            disabled={loading}
            className="auth-btn-gradient text-white"
          >
            {!loading ? tTtl("login") : tTtl("loading")}
          </Button>
        </form>
      </FormProvider>
      <div className="text-with-separators lowercase my-4">{tTtl("or")}</div>
      <GoogleAuthButton disabled={loading} className="w-full">
        {tTtl("loginWithGoogle")}
      </GoogleAuthButton>
    </ModalCard>
  );
};

export default LoginModal;
