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

interface ILoginModal {
  setIsLoginModal: (value: boolean) => void;
}

const loginFormSchema = z.object({
  email: z.string().min(1).email().max(320),
  password: z.string().min(6).max(16),
});

const LoginModal: React.FC<ILoginModal> = ({ setIsLoginModal }) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const { setIsAuth } = useAuthContext();

  const [loginUserMutation, { loading, error }] =
    useMutation(LOGIN_USER_MUTATION);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const { data } = await loginUserMutation({
        variables: {
          loginInput: {
            email: values.email,
            password: values.password,
          },
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

  const handleCloseModal = () => {
    setIsLoginModal(false);
    form.reset();
  };

  const { isSubmitted, isValid, isSubmitting } = form.formState;

  return (
    <ModalCard handleCloseModal={handleCloseModal} title="welcome">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-[30px] flex-grow"
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
          {error && (
            <p className="text-danger">{getApolloErrorMessage(error)}</p>
          )}
          <Button
            variant="outlineSecondary"
            size="lg"
            type="submit"
            disabled={isSubmitting || (isSubmitted && !isValid)}
          >
            {!loading ? tTtl("login") : tTtl("loading")}
          </Button>
        </form>
      </FormProvider>
      <div className="text-with-separators lowercase my-[16px]">
        {tTtl("or")}
      </div>
      <div className="flex flex-col gap-y-[16px]">
        <GoogleAuthButton>{tTtl("loginWithGoogle")}</GoogleAuthButton>
      </div>
    </ModalCard>
  );
};

export default LoginModal;
