export const getBinStatus = (level) => {
  if (level >= 100) return "Full";
  if (level >= 80) return "Reaching to Full";
  if (level >= 50) return "Moderate";
  return "Normal";
};

export const getBinColor = (level) => {
  if (level >= 100) return "red";
  if (level >= 80) return "orangered";
  if (level >= 50) return "gold";
  return "black";
};
