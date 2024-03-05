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
import { REGISTER_USER_MUTATION } from "@/apollo/mutations/auth";
import ModalCard from "@/components/atoms/common/Cards/ModalCard/ModalCard";
import { useMutation } from "@apollo/client";
import { Mail, Lock } from "lucide-react";

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

    try {
      useMutation(REGISTER_USER_MUTATION, {
        variables: {
          registerInput: {
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
          },
        },
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

  const handleCloseModal = () => {
    setIsSignUpModal(false);
    form.reset();
  };

  const { isSubmitted, isValid, isSubmitting } = form.formState;

  if (!isSignUpModal) return null;

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
            <FloatingField
              form={form}
              type="password"
              name="confirmPassword"
              placeholder="Minimum 6 characters"
              labelText="Confirm password"
              IconComponent={Lock}
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
