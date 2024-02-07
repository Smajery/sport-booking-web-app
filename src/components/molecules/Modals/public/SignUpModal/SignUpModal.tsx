"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import FloatingField from "@/components/molecules/Fields/FloatingField/FloatingField";
import { Button } from "@/components/ui/button";
import { Form as FormProvider } from "@/components/ui/form";

import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";

import ErrorHandler from "@/utils/handlers/ErrorHandler";
import GoogleAuthButton from "@/components/atoms/Buttons/public/GoogleAuthButton/GoogleAuthButton";
import FacebookAuthButton from "@/components/atoms/Buttons/public/FacebookAuthButton/FacebookAuthButton";
import { REGISTER_USER_MUTATION } from "@/apollo/mutations/auth";
import apolloClient from "@/apollo-client";
import ModalCard from "@/components/atoms/Cards/ModalCard/ModalCard";

interface ISignUpModal {
  isSignUpModal: boolean;
  setIsSignUpModal: (value: boolean) => void;
}

const signUpFormSchema = z
  .object({
    email: z.string().min(1).email().max(320),
    password: z.string().min(6).max(16),
    confirmPassword: z.string().min(6).max(16),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUpModal: React.FC<ISignUpModal> = ({
  isSignUpModal,
  setIsSignUpModal,
}) => {
  const { handleLogin } = useAuthContext();
  const [requestErrorMessage, setRequestErrorMessage] = React.useState<
    string | null
  >(null);
  const [requestErrors, setRequestErrors] = React.useState<{}>({});
  const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    setIsRequestLoading(true);

    const variables = {
      registerInput: {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      },
    };

    try {
      await apolloClient.mutate({
        mutation: REGISTER_USER_MUTATION,
        variables,
      });

      setRequestErrorMessage(null);
      setRequestErrors([]);

      form.reset();
    } catch (error) {
      ErrorHandler.handle(error, { componentName: "SignUpModal__onSubmit" });
      setRequestErrorMessage(error.response?.data?.message);
      setRequestErrors(error.response?.data?.errors || []);
    } finally {
      setIsRequestLoading(false);
    }
  };

  const handleSetModal = (value: boolean) => {
    setIsSignUpModal(value);
    form.reset();
  };

  const { isSubmitted, isValid, isSubmitting } = form.formState;

  if (!isSignUpModal) return null;

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
            <FloatingField
              form={form}
              type="password"
              name="confirmPassword"
              placeholder="Minimum 6 characters"
              labelText="Confirm password"
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
            {!isRequestLoading ? "Sign up" : "Loading..."}
          </Button>
        </form>
      </FormProvider>
      <div className="text-with-separators lowercase my-[16px]">Or</div>
      <div className="flex flex-col gap-y-[16px]">
        <GoogleAuthButton>Sign up with Google</GoogleAuthButton>
        <FacebookAuthButton>Sign up with Facebook</FacebookAuthButton>
      </div>
    </ModalCard>
  );
};

export default SignUpModal;
