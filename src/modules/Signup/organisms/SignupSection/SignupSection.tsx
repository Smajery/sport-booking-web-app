"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import DefaultField from "@/components/molecules/Fields/DefaultField/DefaultField";
import { Button } from "@/components/ui/button";
import { Form as FormProvider } from "@/components/ui/form";

import ErrorHandler from "@/utils/handlers/ErrorHandler";

import { register } from "@/api/auth";
import GoogleAuthButton from "@/components/atoms/Buttons/GoogleAuthButton/GoogleAuthButton";
import FacebookAuthButton from "@/components/atoms/Buttons/FacebookAuthButton/FacebookAuthButton";

const signUpFormSchema = z
  .object({
    email: z.string().min(1).email().max(320),
    first_name: z
      .string()
      .min(1)
      .max(50)
      .refine(
        (value) => /^\D+$/.test(value),
        "First name must contain letters",
      ),
    last_name: z
      .string()
      .min(1)
      .max(50)
      .refine((value) => /^\D+$/.test(value), "Last name must contain letters"),
    password: z.string().min(6).max(16),
    confirmPassword: z.string().min(6).max(16),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignupSection = () => {
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
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpFormSchema>) => {
    setIsRequestLoading(true);
    register(values)
      .then(() => {
        setRequestErrorMessage(null);
        setRequestErrors([]);
        form.reset();
      })
      .catch((error) => {
        ErrorHandler.handle(error, {
          componentName: "SignupSection__onSubmit",
        });
        setRequestErrorMessage(
          error.response?.data?.message || "Something went wrong. ",
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
            <div className="flex flex-col gap-y-unit-2">
              <DefaultField
                form={form}
                type="email"
                name="email"
                labelText="Е-пошта"
                placeholder="Приклад: example@gmail.com"
                requestError={requestErrors?.email}
                Icon={Mail}
              />
              <DefaultField
                form={form}
                type="password"
                name="password"
                placeholder="Мінімум 6 символів"
                labelText="Пароль"
                Icon={Lock}
              />
              <DefaultField
                form={form}
                type="password"
                name="confirmPassword"
                placeholder="Мінімум 6 символів"
                labelText="Підтвердження пароля"
                Icon={Lock}
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
