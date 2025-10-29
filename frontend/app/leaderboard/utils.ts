// Truncate wallet address to show first 6 and last 4 characters
export const truncateAddress = (address: string): string => {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Format points with commas
export const formatPoints = (points: number): string => {
  return points.toLocaleString();
};