"use client";

import React from "react";
import BookModal from "@/components/molecules/public/Modals/BookModal/BookModal";
import { Button } from "@/components/ui/button";

interface IBookButton {
  facilityId: number;
}

const BookButton: React.FC<IBookButton> = ({ facilityId }) => {
  const [isBookModal, setIsBookModal] = React.useState(false);
  return (
    <>
      <Button
        size="md"
        className="book-gradient"
        onClick={() => setIsBookModal(true)}
      >
        Book
      </Button>
      <BookModal
        setIsModal={setIsBookModal}
        isModal={isBookModal}
        facilityId={facilityId}
      />
    </>
  );
};

export default BookButton;
