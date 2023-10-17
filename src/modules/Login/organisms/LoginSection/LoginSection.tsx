"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import FacebookAuthButton from "@/components/atoms/Buttons/FacebookAuthButton/FacebookAuthButton";
import GoogleAuthButton from "@/components/atoms/Buttons/GoogleAuthButton/GoogleAuthButton";
import DefaultField from "@/components/molecules/Fields/DefaultField/DefaultField";
import { Button } from "@/components/ui/button";
import { Form as FormProvider } from "@/components/ui/form";

import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";

import ErrorHandler from "@/utils/handlers/ErrorHandler";
import apolloClient from "@/apollo-client";
import { LOGIN_USER_MUTATION } from "@/apollo/mutations/auth";

const signInFormSchema = z.object({
  email: z.string().min(1).email().max(320),
  password: z.string().min(6).max(16),
});

const LoginSection = () => {
  const { handleLogin } = useAuthContext();
  const [requestErrorMessage, setRequestErrorMessage] = React.useState<
    string | null
  >(null);
  const [requestErrors, setRequestErrors] = React.useState<{}>({});
  const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signInFormSchema>) => {
    setIsRequestLoading(true);

    const variables = {
      loginInput: {
        email: values.email,
        password: values.password,
      },
    };

    apolloClient
      .mutate({
        mutation: LOGIN_USER_MUTATION,
        variables,
      })
      .then(() => {
        setRequestErrorMessage(null);
        setRequestErrors([]);
        handleLogin();
        form.reset();
      })
      .catch((error) => {
        ErrorHandler.handle(error, { componentName: "SignInModal__onSubmit" });
        setRequestErrorMessage(
          error.response?.data?.message ||
            "Something went wrong. Please check your email or password.",
        );
        setRequestErrors(error.response?.data?.errors || []);
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
              <DefaultField
                form={form}
                type="email"
                name="email"
                labelText="Email"
                placeholder="Приклад: example@gmail.com"
                requestError={requestErrors?.email}
                iconName="mail"
              />
              <DefaultField
                form={form}
                type="password"
                name="password"
                placeholder="Мінімум 6 символів"
                labelText="Пароль"
                iconName="lock"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || (isSubmitted && !isValid)}
              className="mx-auto"
            >
              {!isRequestLoading ? "Вхід" : "Завантаження..."}
            </Button>
            {Object.keys(requestErrors).length > 0
              ? Object.keys(requestErrors).map((requestError) => (
                  <p key={requestError} className="text-danger">
                    {requestErrors[requestError]}
                  </p>
                ))
              : requestErrorMessage && (
                  <p className="text-danger">{requestErrorMessage}</p>
                )}
          </form>
        </FormProvider>
        <p className="text-center p4 uppercase">Or</p>
        <div className="flex flex-col gap-y-[12px] mx-auto">
          <GoogleAuthButton>Вхід з Google</GoogleAuthButton>
          <FacebookAuthButton>Вхід з Facebook</FacebookAuthButton>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
