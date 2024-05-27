import React from "react";
import Image from "next/image";
import { getAvgRatingImagePath } from "@/utils/helpers/icon.helpers";
import { useTheme } from "next-themes";

interface IRatingFrame {
  avgRating: number;
  ratingCount: number;
  className?: string;
}

const RatingFrame: React.FC<IRatingFrame> = ({
  avgRating,
  ratingCount,
  className = "",
}) => {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative flex">
        <p className="text-2xl">{avgRating}</p>
        <p className="absolute left-full text-xs text-muted-foreground font-light">
          ({ratingCount})
        </p>
      </div>
      <div className="flex gap-x-[2px]">
        {[1, 2, 3, 4, 5].map((rating) => (
          <Image
            key={rating}
            src={`/icons/${getAvgRatingImagePath(rating, avgRating)}`}
            alt={`Rating ${rating}`}
            width={20}
            height={20}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingFrame;
