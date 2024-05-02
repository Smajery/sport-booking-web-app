"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useModalContext } from "@/providers/ModalProvider/ModalProvider";

interface ISignUpButton {
  children: string;
}

const SignUpButton: React.FC<ISignUpButton> = ({ children }) => {
  const { setIsSignUpModal } = useModalContext();

  return (
    <Button variant="outlinePrimary" onClick={() => setIsSignUpModal(true)}>
      {children}
    </Button>
  );
};

export default SignUpButton;
