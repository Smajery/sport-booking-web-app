export const getCoveringTypeIcon = (coveringType: string) => {
  switch (coveringType) {
    case "artificial_lawn":
      return;
  }
};

export const getThemeIconsPath = (themeMode: string | undefined) => {
  return themeMode === "dark" ? "dark-icons" : "icons";
};

export const getRatingImagePath = (
  rating: number,
  currentUserRating: number,
) => {
  if (rating <= currentUserRating) {
    return "rating-star.svg";
  } else {
    return "no-rating-star.svg";
  }
};

export const getAvgRatingImagePath = (rating: number, avgRating: number) => {
  const isHalfStar = avgRating % 1 !== 0;
  if (rating <= avgRating) {
    return "rating-star.svg";
  } else if (isHalfStar && rating === Math.ceil(avgRating)) {
    return "half-rating-star.svg";
  } else {
    return "no-rating-star.svg";
  }
};
