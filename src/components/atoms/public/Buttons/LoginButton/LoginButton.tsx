"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useModalContext } from "@/providers/ModalProvider/ModalProvider";
import { useHeaderContext } from "@/layouts/Header/Header";
import { clsx } from "clsx";

interface ILoginButton {
  children: string;
}

const LoginButton: React.FC<ILoginButton> = ({ children }) => {
  const { isHeaderScrolled } = useHeaderContext();
  const { setIsLoginModal } = useModalContext();

  return (
    <Button
      variant="primary"
      className={clsx("", {
        "border-primary-foreground": isHeaderScrolled,
      })}
      onClick={() => setIsLoginModal(true)}
    >
      {children}
    </Button>
  );
};

export default LoginButton;
