export const formatCurrency = (amount: number, currency: string = "ETH"): string => {
  return `${amount.toFixed(2)} ${currency}`;
};

export const formatLargeCurrency = (amount: number, currency: string = "ETH"): string => {
  return `${amount.toFixed(9)} ${currency}`;
};

export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value * 100)}%`;
};