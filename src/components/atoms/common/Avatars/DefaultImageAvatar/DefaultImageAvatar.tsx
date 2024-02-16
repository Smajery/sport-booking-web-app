import React from "react";
import Image from "next/image";
import process from "process";
import { ImageIcon } from "lucide-react";

interface IDefaultImageAvatar {
  image: string | null;
  imageName: string;
  className?: string;
}

const DefaultImageAvatar: React.FC<IDefaultImageAvatar> = ({
  image,
  imageName,
  className = "",
}) => {
  switch (image) {
    case null:
      return (
        <div
          className={`relative flex items-center justify-center overflow-hidden border-1 border-background border-dashed ${className}`}
        >
          <ImageIcon className="w-unit-8 h-unit-8" color="#ffffff" />
        </div>
      );
    default:
      return (
        <div
          className={`relative flex items-center justify-center overflow-hidden ${className}`}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${image}`}
            alt={imageName}
            unoptimized
            fill
            className="object-cover object-center"
          />
        </div>
      );
  }
};

export default DefaultImageAvatar;
