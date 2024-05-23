"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useModalContext } from "@/providers/ModalProvider/ModalProvider";

interface ILoginButton {
  children: string;
  isScrolled: boolean;
}

const LoginButton: React.FC<ILoginButton> = ({ children, isScrolled }) => {
  const { setIsLoginModal } = useModalContext();

  return (
    <Button
      variant={isScrolled ? "primary" : "outlinePrimary"}
      className={isScrolled ? "border-primary-foreground" : ""}
      onClick={() => setIsLoginModal(true)}
    >
      {children}
    </Button>
  );
};

export default LoginButton;
