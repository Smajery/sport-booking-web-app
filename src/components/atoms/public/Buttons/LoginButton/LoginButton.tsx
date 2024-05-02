"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useModalContext } from "@/providers/ModalProvider/ModalProvider";

interface ILoginButton {
  children: string;
}

const LoginButton: React.FC<ILoginButton> = ({ children }) => {
  const { setIsLoginModal } = useModalContext();

  return (
    <Button variant="outlinePrimary" onClick={() => setIsLoginModal(true)}>
      {children}
    </Button>
  );
};

export default LoginButton;
