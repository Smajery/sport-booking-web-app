"use client";

import React from "react";
import SignUpModal from "@/components/molecules/public/Modals/SignUpModal/SignUpModal";
import RestorePasswordModal from "@/components/molecules/public/Modals/RestorePasswordModal/RestorePasswordModal";
import LoginModal from "@/components/molecules/public/Modals/LoginModal/LoginModal";
import ResetPasswordModal from "@/components/molecules/public/Modals/ResetPasswordModal/ResetPasswordModal";

type ModalContextData = {
  isSignUpModal: boolean;
  isLoginModal: boolean;
  isResetPasswordModal: boolean;
};

type ModalActions = {
  setIsSignUpModal: (value: boolean) => void;
  setIsLoginModal: (value: boolean) => void;
  setIsResetPasswordModal: (value: boolean) => void;
};

const ModalContext = React.createContext<
  (ModalContextData & ModalActions) | undefined
>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignUpModal, setIsSignUpModal] = React.useState<boolean>(false);
  const [isLoginModal, setIsLoginModal] = React.useState<boolean>(false);
  const [isRestorePasswordModal, setIsRestorePasswordModal] =
    React.useState<boolean>(false);
  const [isResetPasswordModal, setIsResetPasswordModal] =
    React.useState<boolean>(false);

  const modalContextData: ModalContextData = {
    isSignUpModal,
    isLoginModal,
    isResetPasswordModal,
  };

  const modalActions: ModalActions = {
    setIsSignUpModal,
    setIsLoginModal,
    setIsResetPasswordModal,
  };

  return (
    <ModalContext.Provider value={{ ...modalActions, ...modalContextData }}>
      {children}
      {isSignUpModal && (
        <SignUpModal
          setIsSignUpModal={setIsSignUpModal}
          setIsLoginModal={setIsLoginModal}
        />
      )}
      {isLoginModal && (
        <LoginModal
          setIsLoginModal={setIsLoginModal}
          setIsRestorePasswordModal={setIsRestorePasswordModal}
        />
      )}
      {isRestorePasswordModal && (
        <RestorePasswordModal
          setIsRestorePasswordModal={setIsRestorePasswordModal}
        />
      )}
      {isResetPasswordModal && (
        <ResetPasswordModal
          setIsResetPasswordModal={setIsResetPasswordModal}
          setIsLoginModal={setIsLoginModal}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextData & ModalActions => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within an ModalProvider");
  }
  return context;
};
