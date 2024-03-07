export const getTitle = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getCapitalFirstLetter = (text: string) => {
  const firstLetter = text.charAt(0).toUpperCase();
  return `${firstLetter}.`;
};

export const getFormattedText = (text: string) => {
  const formattedText = text.replace(/_/g, " ");
  return getTitle(formattedText);
};

export const getDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} m`;
  } else if (hours === 1) {
    return remainingMinutes === 0 ? "1 h" : `1 h ${remainingMinutes} m`;
  } else {
    return remainingMinutes === 0
      ? `${hours} h`
      : `${hours} h ${remainingMinutes} m`;
  }
};
