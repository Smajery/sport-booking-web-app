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
