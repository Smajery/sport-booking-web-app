"use client";

import React from "react";
import BookModal from "@/components/molecules/public/Modals/BookModal/BookModal";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";
import { useModalContext } from "@/providers/ModalProvider/ModalProvider";

interface IBookButton {
  facilityId: number;
}

const BookButton: React.FC<IBookButton> = ({ facilityId }) => {
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
      <Button size="md" className="variant-gradient" onClick={handleBook}>
        Book
      </Button>
      {isBookModal && (
        <BookModal setIsModal={setIsBookModal} facilityId={facilityId} />
      )}
    </>
  );
};

export default BookButton;
