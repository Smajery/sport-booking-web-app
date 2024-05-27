"use client";

import React from "react";
import BookModal from "@/components/molecules/public/Modals/BookModal/BookModal";
import { Button, ButtonProps } from "@/components/ui/button";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";
import { useModalContext } from "@/providers/ModalProvider/ModalProvider";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IBookButton extends ButtonProps {
  facilityId: number;
}

const BookButton: React.FC<IBookButton> = ({ facilityId, ...props }) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const { isAuth } = useAuthContext();
  const { setIsLoginModal } = useModalContext();
  const [isBookModal, setIsBookModal] = React.useState(false);

  const handleBook = () => {
    if (isAuth) {
      setIsBookModal(true);
    } else {
      setIsLoginModal(true);
    }
  };
  return (
    <>
      <Button
        size="md"
        variant="outlineSecondary"
        onClick={handleBook}
        {...props}
      >
        {tTtl("book")}
      </Button>
      {isBookModal && (
        <BookModal setIsModal={setIsBookModal} facilityId={facilityId} />
      )}
    </>
  );
};

export default BookButton;
