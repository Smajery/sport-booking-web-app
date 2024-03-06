"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import FloatingField from "@/components/molecules/common/Fields/FloatingField/FloatingField";
import { Button } from "@/components/ui/button";
import { Form as FormProvider } from "@/components/ui/form";

import ErrorHandler from "@/utils/handlers/ErrorHandler";
import GoogleAuthButton from "@/components/atoms/public/Buttons/GoogleAuthButton/GoogleAuthButton";
import FacebookAuthButton from "@/components/atoms/public/Buttons/FacebookAuthButton/FacebookAuthButton";
import { LOGIN_USER_MUTATION } from "@/apollo/mutations/auth";
import ModalCard from "@/components/atoms/common/Cards/ModalCard/ModalCard";
import { useMutation } from "@apollo/client";
import { Mail, Lock } from "lucide-react";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";

interface ILoginModal {
  isLoginModal: boolean;
  setIsLoginModal: (value: boolean) => void;
}

const loginFormSchema = z.object({
  email: z.string().min(1).email().max(320),
  password: z.string().min(6).max(16),
});

const LoginModal: React.FC<ILoginModal> = ({
  isLoginModal,
  setIsLoginModal,
}) => {
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
      await loginUserMutation({
        variables: {
          loginInput: {
            email: values.email,
            password: values.password,
          },
        },
      });

      handleCloseModal();
      form.reset();
    } catch (e) {
      ErrorHandler.handle(e, { componentName: "LoginModal__onSubmit" });
    }
  };

  const handleCloseModal = () => {
    setIsLoginModal(false);
    form.reset();
  };

  const { isSubmitted, isValid, isSubmitting } = form.formState;

  if (!isLoginModal) return null;

  return (
    <ModalCard handleCloseModal={handleCloseModal} title="Welcome">
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
              labelText="Email"
              placeholder="Ex: example@gmail.com"
              IconComponent={Mail}
            />
            <FloatingField
              form={form}
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              labelText="Password"
              IconComponent={Lock}
            />
          </div>

          {error && (
            <p className="text-danger">{getApolloErrorMessage(error)}</p>
          )}
          <Button
            variant="none"
            size="lg"
            type="submit"
            disabled={isSubmitting || (isSubmitted && !isValid)}
            className="auth-btn-gradient text-white"
          >
            {!loading ? "Login" : "Loading..."}
          </Button>
        </form>
      </FormProvider>
      <div className="text-with-separators lowercase my-[16px]">Or</div>
      <div className="flex flex-col gap-y-[16px]">
        <GoogleAuthButton>Login with Google</GoogleAuthButton>
        <FacebookAuthButton>Login with Facebook</FacebookAuthButton>
      </div>
    </ModalCard>
  );
};

export default LoginModal;
