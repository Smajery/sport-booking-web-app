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
  const [requestErrorMessage, setRequestErrorMessage] = React.useState<
    string | null
  >(null);
  const [requestErrors, setRequestErrors] = React.useState<{}>({});
  const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setIsRequestLoading(true);

    try {
      useMutation(LOGIN_USER_MUTATION, {
        variables: {
          loginInput: {
            email: values.email,
            password: values.password,
          },
        },
      });

      setRequestErrorMessage(null);
      setRequestErrors([]);
      form.reset();
    } catch (error) {
      ErrorHandler.handle(error, { componentName: "LoginModal__onSubmit" });
      setRequestErrorMessage(error.response?.data?.message);
      setRequestErrors(error.response?.data?.errors || []);
    } finally {
      setIsRequestLoading(false);
    }
  };

  const handleSetModal = (value: boolean) => {
    setIsLoginModal(value);
    form.reset();
  };

  const { isSubmitted, isValid, isSubmitting } = form.formState;

  if (!isLoginModal) return null;

  return (
    <ModalCard setIsModal={handleSetModal} title="Welcome">
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
              iconName="mail"
            />
            <FloatingField
              form={form}
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              labelText="Password"
              iconName="lock"
            />
          </div>
          {Object.keys(requestErrors).length > 0
            ? Object.keys(requestErrors).map((requestError) => (
                <p key={requestError} className="text-danger">
                  {requestErrors[requestError]}
                </p>
              ))
            : requestErrorMessage && (
                <p className="text-danger">{requestErrorMessage}</p>
              )}
          <Button
            variant="none"
            size="lg"
            type="submit"
            disabled={isSubmitting || (isSubmitted && !isValid)}
            className="auth-btn-gradient text-white"
          >
            {!isRequestLoading ? "Login" : "Loading..."}
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
