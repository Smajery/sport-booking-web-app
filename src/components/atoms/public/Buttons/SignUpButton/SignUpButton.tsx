"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import SignUpModal from "@/components/molecules/public/Modals/SignUpModal/SignUpModal";

interface ISignUpButton {
  children: string;
}

const SignUpButton: React.FC<ISignUpButton> = ({ children }) => {
  const [isSignUpModal, setIsSignUpModal] = React.useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setIsSignUpModal(true)}>{children}</Button>
      <SignUpModal
        isSignUpModal={isSignUpModal}
        setIsSignUpModal={setIsSignUpModal}
      />
    </>
  );
};

export default SignUpButton;
