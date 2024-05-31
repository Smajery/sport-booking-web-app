"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import FloatingField from "@/components/molecules/public/Fields/FloatingField/FloatingField";
import { Button } from "@/components/ui/button";
import { Form as FormProvider } from "@/components/ui/form";

import ErrorHandler from "@/utils/handlers/ErrorHandler";
import ModalCard from "@/components/atoms/public/Cards/ModalCard/ModalCard";
import { useMutation } from "@apollo/client";
import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";
import ApolloErrorFrame from "@/components/molecules/public/Frames/ApolloErrorFrame/ApolloErrorFrame";
import { RESET_PASSWORD_MUTATION } from "@/apollo/mutations/private/user/user";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";
import ErrorMessageField from "@/components/molecules/public/Fields/ErrorMessageField/ErrorMessageField";

interface IResetPasswordModal {
  setIsResetPasswordModal: (value: boolean) => void;
  setIsLoginModal: (value: boolean) => void;
}

const restorePasswordFormSchema = z
  .object({
    token: z.string(),
    newPassword: z.string().min(6).max(16),
    confirmPassword: z.string().min(6).max(16),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ResetPasswordModal: React.FC<IResetPasswordModal> = ({
  setIsResetPasswordModal,
  setIsLoginModal,
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const searchParams = useSearchParams();
  const { push } = useRouter();

  const [resetPassword, { loading, error }] = useMutation(
    RESET_PASSWORD_MUTATION,
  );

  const form = useForm<z.infer<typeof restorePasswordFormSchema>>({
    resolver: zodResolver(restorePasswordFormSchema),
    defaultValues: {
      token: searchParams.get("token") ?? undefined,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof restorePasswordFormSchema>,
  ) => {
    const { confirmPassword, ...otherValues } = values;
    try {
      await resetPassword({
        variables: otherValues,
      });

      handleCloseModal();

      push(routes.HOME);
      setIsLoginModal(true);
    } catch (e) {
      ErrorHandler.handle(e, { componentName: "ResetPasswordModal__onSubmit" });
    }
  };

  const handleCloseModal = () => {
    setIsResetPasswordModal(false);
    form.reset();
  };

  return (
    <ModalCard handleCloseModal={handleCloseModal} title="resetPassword">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4 flex-grow"
          noValidate
        >
          <div className="flex flex-col gap-y-[8px]">
            <FloatingField
              form={form}
              type="password"
              name="newPassword"
              placeholder="password"
              labelText="newPassword"
              IconComponent={Lock}
              isRequestError={!!error}
            />
            <FloatingField
              form={form}
              type="password"
              name="confirmPassword"
              placeholder="password"
              labelText="confirmPassword"
              IconComponent={Lock}
              isRequestError={!!error}
            />
          </div>
          <ErrorMessageField form={form} name="token" />
          <ApolloErrorFrame error={error} />
          <Button
            variant="none"
            size="lg"
            type="submit"
            disabled={loading}
            className="auth-btn-gradient text-white"
          >
            {!loading ? tTtl("confirm") : tTtl("loading")}
          </Button>
        </form>
      </FormProvider>
    </ModalCard>
  );
};

export default ResetPasswordModal;
