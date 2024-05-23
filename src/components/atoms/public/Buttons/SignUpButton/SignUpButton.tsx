"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useModalContext } from "@/providers/ModalProvider/ModalProvider";

interface ISignUpButton {
  children: string;
  isScrolled: boolean;
}

const SignUpButton: React.FC<ISignUpButton> = ({ children, isScrolled }) => {
  const { setIsSignUpModal } = useModalContext();

  return (
    <Button
      variant={isScrolled ? "primary" : "outlinePrimary"}
      className={isScrolled ? "border-primary-foreground" : ""}
      onClick={() => setIsSignUpModal(true)}
    >
      {children}
    </Button>
  );
};

export default SignUpButton;
