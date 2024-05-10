import React from "react";
import { ImageIcon } from "lucide-react";
import ImageCart from "@/components/atoms/public/Cards/ImageCard/ImageCart";

interface IImageAvatar {
  image: string | null;
  imageName: string;
  className?: string;
}

const ImageAvatar: React.FC<IImageAvatar> = ({
  image,
  imageName,
  className = "",
}) => {
  switch (image) {
    case null:
      return (
        <div
          className={`flex items-center justify-center border-1 border-primary border-dashed ${className}`}
        >
          <ImageIcon className="w-8 h-8" color="#ff8749" strokeWidth={1} />
        </div>
      );
    default:
      return (
        <div
          className={`relative flex items-center justify-center overflow-hidden ${className}`}
        >
          <ImageCart image={image} imageName={imageName} />
        </div>
      );
  }
};

export default ImageAvatar;
