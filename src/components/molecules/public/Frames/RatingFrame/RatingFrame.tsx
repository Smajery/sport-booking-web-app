import React from "react";
import Image from "next/image";

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
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative flex">
        <p className="text-2xl">{avgRating}</p>
        <p className="absolute left-full text-xs text-muted-foreground font-light">
          ({ratingCount})
        </p>
      </div>
      <div className="flex gap-x-[2px]">
        {[1, 2, 3, 4, 5].map((rate) => (
          <Image
            key={rate}
            src="/icons/rating-star.svg"
            alt={`Rating ${rate}`}
            width={12}
            height={12}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingFrame;
