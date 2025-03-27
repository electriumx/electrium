
export const formatText = (text: string): string => {
  return text
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

export const generateProductId = (): number => {
  return Math.floor(10000 + Math.random() * 90000);
};

export const randomPrice = (min: number, max: number): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

export const randomRating = (): number => {
  return parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
};

export const randomReviews = (): number => {
  return Math.floor(Math.random() * 300) + 10;
};
