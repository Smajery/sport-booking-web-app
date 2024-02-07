"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/molecules/Modals/public/LoginModal/LoginModal";

interface ILoginButton {
  children: string;
}

const LoginButton: React.FC<ILoginButton> = ({ children }) => {
  const [isLoginModal, setIsLoginModal] = React.useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setIsLoginModal(true)}>{children}</Button>
      <LoginModal
        isLoginModal={isLoginModal}
        setIsLoginModal={setIsLoginModal}
      />
    </>
  );
};

export default LoginButton;
