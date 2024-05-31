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
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";
import { CHANGE_PASSWORD_MUTATION } from "@/apollo/mutations/private/user/user";

interface IChangePasswordModal {
  setIsModal: (value: boolean) => void;
}

const changePasswordFormSchema = z.object({
  oldPassword: z.string().min(6).max(16),
  newPassword: z.string().min(6).max(16),
});

const ChangePasswordModal: React.FC<IChangePasswordModal> = ({
  setIsModal,
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const [changePassword, { loading, error }] = useMutation(
    CHANGE_PASSWORD_MUTATION,
  );

  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof changePasswordFormSchema>) => {
    try {
      await changePassword({
        variables: values,
        context: {
          authRequired: true,
        },
      });

      handleCloseModal();
    } catch (e) {
      ErrorHandler.handle(e, {
        componentName: "ChangePasswordModal__onSubmit",
      });
    }
  };

  const handleCloseModal = () => {
    setIsModal(false);
    form.reset();
  };

  return (
    <ModalCard handleCloseModal={handleCloseModal} title="changePassword">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-[30px] flex-grow"
          noValidate
        >
          <div className="flex flex-col gap-y-[8px]">
            <FloatingField
              form={form}
              type="password"
              name="oldPassword"
              placeholder="password"
              labelText="oldPassword"
              IconComponent={Lock}
              isRequestError={!!error}
            />
            <FloatingField
              form={form}
              type="password"
              name="newPassword"
              placeholder="password"
              labelText="newPassword"
              IconComponent={Lock}
              isRequestError={!!error}
            />
          </div>
          {error && (
            <p className="text-danger">{getApolloErrorMessage(error)}</p>
          )}
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

export default ChangePasswordModal;
