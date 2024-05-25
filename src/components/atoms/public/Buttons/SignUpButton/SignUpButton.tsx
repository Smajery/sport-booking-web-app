"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useModalContext } from "@/providers/ModalProvider/ModalProvider";
import { useHeaderContext } from "@/layouts/Header/Header";

interface ISignUpButton {
  children: string;
}

const SignUpButton: React.FC<ISignUpButton> = ({ children }) => {
  const { setIsSignUpModal } = useModalContext();
  const { isHeaderScrolled } = useHeaderContext();

  return (
    <Button
      variant={isHeaderScrolled ? "primary" : "outlinePrimary"}
      className={isHeaderScrolled ? "border-primary-foreground" : ""}
      onClick={() => setIsSignUpModal(true)}
    >
      {children}
    </Button>
  );
};

export default SignUpButton;
