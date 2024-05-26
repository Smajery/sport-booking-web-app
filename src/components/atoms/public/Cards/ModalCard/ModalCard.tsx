"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IModalCard {
  handleCloseModal: () => void;
  children: React.ReactNode;
  title: string;
}

const ModalCard: React.FC<IModalCard> = ({
  handleCloseModal,
  children,
  title,
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen bg-black/30 flex items-center justify-center z-[2000]"
      onClick={handleCloseModal}
    >
      <Card
        className="bg-background w-[568px]"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="relative flex flex-row items-center justify-center">
          <CardTitle>{tTtl(title)}</CardTitle>
          <Button
            size="none"
            variant="none"
            asChild
            className="absolute right-6 cursor-pointer"
            onClick={handleCloseModal}
          >
            <X className="w-6 h-6" color="#222222" />
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">{children}</CardContent>
      </Card>
    </div>
  );
};

export default ModalCard;
