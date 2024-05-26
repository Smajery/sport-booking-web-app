"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useModalContext } from "@/providers/ModalProvider/ModalProvider";
import { useHeaderContext } from "@/layouts/Header/Header";
import { clsx } from "clsx";

interface ISignUpButton {
  children: string;
}

const SignUpButton: React.FC<ISignUpButton> = ({ children }) => {
  const { setIsSignUpModal } = useModalContext();
  const { isHeaderScrolled } = useHeaderContext();

  return (
    <Button
      variant="outlinePrimary"
      className={clsx("bg-background", {
        "hover:border-primary-foreground": isHeaderScrolled,
      })}
      onClick={() => setIsSignUpModal(true)}
    >
      {children}
    </Button>
  );
};

export default SignUpButton;
