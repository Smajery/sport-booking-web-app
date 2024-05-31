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
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";
import ApolloErrorFrame from "@/components/molecules/public/Frames/ApolloErrorFrame/ApolloErrorFrame";
import { RESTORE_PASSWORD_MUTATION } from "@/apollo/mutations/private/user/user";

interface IRestorePasswordModal {
  setIsRestorePasswordModal: (value: boolean) => void;
}

const restorePasswordFormSchema = z.object({
  email: z.string().min(1).email().max(320),
});

const RestorePasswordModal: React.FC<IRestorePasswordModal> = ({
  setIsRestorePasswordModal,
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const [restorePassword, { loading, error }] = useMutation(
    RESTORE_PASSWORD_MUTATION,
  );

  const form = useForm<z.infer<typeof restorePasswordFormSchema>>({
    resolver: zodResolver(restorePasswordFormSchema),
  });

  const onSubmit = async (
    values: z.infer<typeof restorePasswordFormSchema>,
  ) => {
    try {
      await restorePassword({
        variables: values,
      });

      handleCloseModal();
    } catch (e) {
      ErrorHandler.handle(e, { componentName: "ResetPasswordModal__onSubmit" });
    }
  };

  const handleCloseModal = () => {
    setIsRestorePasswordModal(false);
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
          <FloatingField
            form={form}
            type="email"
            name="email"
            labelText="email"
            placeholder="email"
            IconComponent={Mail}
            isRequestError={!!error}
          />
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

export default RestorePasswordModal;
