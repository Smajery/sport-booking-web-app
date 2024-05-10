import React from "react";
import { TImage } from "@/types/commonTypes";
import ImageCart from "@/components/atoms/public/Cards/ImageCard/ImageCart";
import { ImageIcon } from "lucide-react";

interface IMultiImageAvatar {
  images: TImage[] | null;
  imagesName: string;
  className?: string;
}

const MultiImageAvatar: React.FC<IMultiImageAvatar> = ({
  images,
  imagesName,
  className = "",
}) => {
  if (!images || images.length === 0) {
    return (
      <div
        className={`flex items-center justify-center border-1 border-primary border-dashed ${className}`}
      >
        <ImageIcon
          className="w-[60px] h-[60px]"
          color="#ff8749"
          strokeWidth={0.5}
        />
      </div>
    );
  }

  const mainImage = images.find((image) => image.isMain) || images[0];
  const otherImages = images.filter((image) => !image.isMain);

  const renderSingleImage = () => (
    <ImageCart
      image={mainImage.image}
      imageName={imagesName}
      iconClassname="w-[60px] h-[60px]"
      iconStrokeWidth={0.5}
    />
  );

  const renderTwoImages = () => (
    <>
      <div className="flex relative grow">
        <ImageCart image={mainImage.image} imageName={imagesName} />
      </div>
      <div className="flex relative grow">
        <ImageCart image={otherImages[0].image} imageName={`${imagesName}-2`} />
      </div>
    </>
  );

  const renderThreeImages = () => (
    <>
      <div className="flex relative grow">
        <ImageCart image={mainImage.image} imageName={imagesName} />
      </div>
      <div className="flex flex-col justify-between gap-y-2 grow">
        <div className="flex relative grow">
          <ImageCart
            image={otherImages[0].image}
            imageName={`${imagesName}-2`}
          />
        </div>
        <div className="flex relative grow">
          <ImageCart
            image={otherImages[1].image}
            imageName={`${imagesName}-3`}
          />
        </div>
      </div>
    </>
  );

  const renderImagesContent = () => {
    switch (images.length) {
      case 1:
        return renderSingleImage();
      case 2:
        return renderTwoImages();
      case 3:
        return renderThreeImages();
      default:
        return renderThreeImages();
    }
  };

  return (
    <div
      className={`relative flex gap-x-2 justify-between overflow-hidden ${className}`}
    >
      {renderImagesContent()}
    </div>
  );
};

export default MultiImageAvatar;
