"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface IModalCard {
  setIsModal: (value: boolean) => void;
  children: React.ReactNode;
  title: string;
}

const ModalCard: React.FC<IModalCard> = ({ setIsModal, children, title }) => {
  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen bg-black/30 flex items-center justify-center z-[2000]"
      onClick={() => setIsModal(false)}
    >
      <Card
        className="bg-background w-[568px]"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="relative flex flex-row items-center justify-center">
          <CardTitle>{title}</CardTitle>
          <Button
            size="none"
            variant="none"
            asChild
            className="absolute right-unit-6 cursor-pointer"
            onClick={() => setIsModal(false)}
          >
            <X className="w-unit-6 h-unit-6" color="#222222" />
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="pt-unit-6">{children}</CardContent>
      </Card>
    </div>
  );
};

export default ModalCard;
