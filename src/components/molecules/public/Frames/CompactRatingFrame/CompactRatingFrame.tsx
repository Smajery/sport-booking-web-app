import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();
  return (
    <div className={`flex h-[30px] ${className}`}>
      <p className="text-xl mr-1">{avgRating}</p>
      <Image
        width={12}
        height={12}
        src={`/icons/rating-star.svg`}
        alt="Average rating"
      />
      <p className="mb-auto text-xs text-muted-foreground font-light">
        ({ratingCount})
      </p>
    </div>
  );
};

export default CompactRatingFrame;
