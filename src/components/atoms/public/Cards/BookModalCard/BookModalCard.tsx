"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface IBookModal {
  handleCloseModal: () => void;
  children: React.ReactNode;
}

const BookModalCard: React.FC<IBookModal> = ({
  handleCloseModal,
  children,
}) => {
  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen bg-black/30 flex items-center justify-center z-[2000]"
      onClick={handleCloseModal}
    >
      <Card
        className="bg-background overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-0">{children}</CardContent>
      </Card>
    </div>
  );
};

export default BookModalCard;
