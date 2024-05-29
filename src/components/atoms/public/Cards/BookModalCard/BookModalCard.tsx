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
  const modalContentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleOnModalMouseDown = (e: React.MouseEvent) => {
    if (
      !e.nativeEvent.composedPath().includes(modalContentRef.current as Node)
    ) {
      handleCloseModal();
    }
  };

  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen bg-black/30 flex items-center justify-center z-[2000]"
      onMouseDown={handleOnModalMouseDown}
    >
      <Card
        ref={modalContentRef}
        className="bg-background overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-0">{children}</CardContent>
      </Card>
    </div>
  );
};

export default BookModalCard;
