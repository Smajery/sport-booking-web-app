import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface IAvgRatingFrame {
  avgRating: number;
  ratingCount: number;
}

const AvgRatingFrame: React.FC<IAvgRatingFrame> = ({
  avgRating,
  ratingCount,
}) => {
  return (
    <div className="flex">
      <p className="text-xl mr-unit-1">{avgRating}</p>
      <Image
        width="16"
        height="16"
        src="/icons/rating-star.svg"
        alt="Average rating"
      />
      <p className="mb-auto text-xs text-muted-foreground">({ratingCount})</p>
    </div>
  );
};

export default AvgRatingFrame;
