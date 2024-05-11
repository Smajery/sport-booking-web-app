import React from "react";
import Image from "next/image";

interface IAvgRatingFrame {
  avgRating: number;
  ratingCount: number;
  className?: string;
}

const CompactRatingFrame: React.FC<IAvgRatingFrame> = ({
  avgRating,
  ratingCount,
  className = "",
}) => {
  return (
    <div
      className={`flex rounded-lg px-2 py-1 border-1 border-transparent bg-background text-foreground ${className}`}
    >
      <p className="mr-1">{avgRating}</p>
      <Image
        width={12}
        height={12}
        src="/icons/rating-star.svg"
        alt="Average rating"
        className="mb-[2px]"
      />
      <p className="mb-auto text-xs text-muted-foreground font-light">
        ({ratingCount})
      </p>
    </div>
  );
};

export default CompactRatingFrame;
