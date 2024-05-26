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
import { REGISTER_USER_MUTATION } from "@/apollo/mutations/auth";
import ModalCard from "@/components/atoms/public/Cards/ModalCard/ModalCard";
import { useMutation } from "@apollo/client";
import { Mail, Lock } from "lucide-react";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface ISignUpModal {
  setIsSignUpModal: (value: boolean) => void;
  setIsLoginModal: (value: boolean) => void;
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
  setIsSignUpModal,
  setIsLoginModal,
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const [registerUserMutation, { loading, error }] = useMutation(
    REGISTER_USER_MUTATION,
  );

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    try {
      await registerUserMutation({
        variables: {
          registerInput: {
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
          },
        },
      });
      setIsSignUpModal(false);
      setIsLoginModal(true);

      form.reset();
    } catch (e) {
      ErrorHandler.handle(e, { componentName: "SignUpModal__onSubmit" });
    }
  };

  const handleCloseModal = () => {
    setIsSignUpModal(false);
    form.reset();
  };

  const { isSubmitted, isValid, isSubmitting } = form.formState;

  return (
    <ModalCard handleCloseModal={handleCloseModal} title="signUp">
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
            />
            <FloatingField
              form={form}
              type="password"
              name="password"
              placeholder="password"
              labelText="password"
              IconComponent={Lock}
            />
            <FloatingField
              form={form}
              type="password"
              name="confirmPassword"
              placeholder="password"
              labelText="confirmPassword"
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
            {!loading ? tTtl("signUp") : tTtl("loading")}
          </Button>
        </form>
      </FormProvider>
      <div className="text-with-separators lowercase my-[16px]">
        {tTtl("or")}
      </div>
      <div className="flex flex-col gap-y-[16px]">
        <GoogleAuthButton>{tTtl("signUpWithGoogle")}</GoogleAuthButton>
      </div>
    </ModalCard>
  );
};

export default SignUpModal;
