"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import FloatingField from "@/components/molecules/Fields/FloatingField/FloatingField";
import { Button } from "@/components/ui/button";
import { Form as FormProvider } from "@/components/ui/form";

import ErrorHandler from "@/utils/handlers/ErrorHandler";

import { REGISTER_USER_MUTATION } from "@/apollo/mutations/auth";
import apolloClient from "@/apollo-client";
import GoogleAuthButton from "@/components/atoms/Buttons/public/GoogleAuthButton/GoogleAuthButton";
import FacebookAuthButton from "@/components/atoms/Buttons/public/FacebookAuthButton/FacebookAuthButton";
import { useRouter } from "next/navigation";

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

const SignupSection = () => {
  const { push } = useRouter();
  const [requestErrorMessage, setRequestErrorMessage] = React.useState<
    string | null
  >(null);
  const [requestErrors, setRequestErrors] = React.useState<{}>({});
  const [isRequestLoading, setIsRequestLoading] =
    React.useState<boolean>(false);

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpFormSchema>) => {
    setIsRequestLoading(true);

    const variables = {
      registerInput: {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      },
    };

    apolloClient
      .mutate({
        mutation: REGISTER_USER_MUTATION,
        variables,
      })
      .then(() => {
        setRequestErrorMessage(null);
        setRequestErrors([]);

        form.reset();
      })
      .catch((error) => {
        ErrorHandler.handle(error, {
          componentName: "SignupSection__onSubmit",
        });
      })
      .finally(() => setIsRequestLoading(false));
  };

  const { isSubmitted, isValid, isSubmitting } = form.formState;

  return (
    <section className="flex items-center justify-center">
      <div className="flex flex-col w-[400px] border-2 gap-y-[12px] border-foreground rounded-xs p-[10px]">
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
                labelText="Е-пошта"
                placeholder="Приклад: example@gmail.com"
                requestError={requestErrors?.email}
                iconName="mail"
              />
              <FloatingField
                form={form}
                type="password"
                name="password"
                placeholder="Мінімум 6 символів"
                labelText="Пароль"
                iconName="lock"
              />
              <FloatingField
                form={form}
                type="password"
                name="confirmPassword"
                placeholder="Мінімум 6 символів"
                labelText="Підтвердження пароля"
                iconName="lock"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || (isSubmitted && !isValid)}
              className="mx-auto"
            >
              {!isRequestLoading ? "Зареєструватись" : "Завантаження..."}
            </Button>
            {Object.keys(requestErrors).length > 0
              ? Object.keys(requestErrors).map((requestError) => (
                  <p key={requestError} className="ml-unit-8 text-danger">
                    {requestErrors[requestError]}
                  </p>
                ))
              : requestErrorMessage && (
                  <p className="ml-unit-8 text-danger">{requestErrorMessage}</p>
                )}
          </form>
        </FormProvider>
        <p className="text-center p4 uppercase">Або</p>
        <div className="flex flex-col gap-y-[12px] mx-auto">
          <GoogleAuthButton>Зареєструватись з Google</GoogleAuthButton>
          <FacebookAuthButton>Зареєструватись з Facebook</FacebookAuthButton>
        </div>
      </div>
    </section>
  );
};

export default SignupSection;
