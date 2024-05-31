"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useModalContext } from "@/providers/ModalProvider/ModalProvider";
import { routes } from "@/utils/constants/routes.constants";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const { setIsResetPasswordModal } = useModalContext();
  const { push } = useRouter();

  React.useEffect(() => {
    const resetPasswordToken = searchParams.get("token");

    if (resetPasswordToken) {
      setIsResetPasswordModal(true);
    } else {
      push(routes.HOME);
    }
  }, [searchParams]);
  return null;
};

export default ResetPassword;
