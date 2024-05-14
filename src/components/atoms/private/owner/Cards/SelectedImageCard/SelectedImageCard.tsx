"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ISelectedImageCard {
  file: File;
  imageName: string;
  handleRemoveFile: () => void;
}

const SelectedImageCard: React.FC<ISelectedImageCard> = ({
  file,
  imageName,
  handleRemoveFile,
}) => {
  const [isImageHovered, setIsImageHovered] = React.useState<boolean>(false);
  return (
    <div
      className="flex relative grow"
      onMouseEnter={() => setIsImageHovered(true)}
      onMouseLeave={() => setIsImageHovered(false)}
    >
      <Image
        unoptimized
        src={URL.createObjectURL(file)}
        alt={imageName}
        fill
        className="object-cover object-center"
      />
      {isImageHovered && (
        <div className="absolute flex top-0 left-0 w-full h-full bg-black/50 z-10 p-2">
          <Button
            variant="none"
            size="none"
            type="button"
            onClick={handleRemoveFile}
            asChild
            className="cursor-pointer ml-auto"
          >
            <div className="flex rounded-md bg-background items-center justify-center w-8 h-8">
              <X />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectedImageCard;
