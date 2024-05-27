import React from "react";
import Image from "next/image";
import { getAvgRatingImagePath } from "@/utils/helpers/icon.helpers";
import { useTheme } from "next-themes";

interface IFavoritesRatingFrame {
  avgRating: number;
  ratingCount: number;
  className?: string;
}

const FavoritesRatingFrame: React.FC<IFavoritesRatingFrame> = ({
  avgRating,
  ratingCount,
  className = "",
}) => {
  const { theme } = useTheme();

  return (
    <div className={`flex items-center gap-x-2 ${className}`}>
      <div className="h-6 flex">
        <p className="text-2xl">{avgRating}</p>
        <p className="text-xs text-muted-foreground font-light">
          ({ratingCount})
        </p>
      </div>
      <div className="flex gap-x-[2px]">
        {[1, 2, 3, 4, 5].map((rating) => (
          <Image
            key={rating}
            src={`/icons/${getAvgRatingImagePath(rating, avgRating)}`}
            alt={`Rating ${rating}`}
            width={30}
            height={30}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesRatingFrame;
