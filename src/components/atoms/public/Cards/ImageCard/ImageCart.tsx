"use client";

import { ImageOff, Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

interface IImageCart {
  image: string;
  imageName: string;
  iconClassname?: string;
  iconStrokeWidth?: number;
}

const ImageCart: React.FC<IImageCart> = ({
  image,
  imageName,
  iconClassname = "w-8 h-8",
  iconStrokeWidth = 1,
}) => {
  const [isImageLoading, setIsImageLoading] = React.useState<boolean>(true);
  const [isImageError, setIsImageError] = React.useState<boolean>(false);

  return (
    <>
      {isImageLoading && !isImageError && (
        <Loader2
          className={`m-auto animate-spin ${iconClassname}`}
          strokeWidth={iconStrokeWidth}
        />
      )}
      {!isImageError ? (
        <Image
          unoptimized
          src={`${process.env.NEXT_PUBLIC_IMG_URL}/${image}`}
          alt={imageName}
          fill
          className="object-cover object-center"
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageError(true)}
        />
      ) : (
        <ImageOff
          className={`m-auto ${iconClassname}`}
          strokeWidth={iconStrokeWidth}
        />
      )}
    </>
  );
};

export default ImageCart;
