// Market filter types
export type MarketFilter = "Popular" | "Closing Soon" | "Highest volume" | "Newest";

// Market status
export type MarketStatus = "active" | "closed" | "resolved";

// Market data types
export interface Market {
  id: string;
  question: string;
  image: string;
  yesPercentage: number;
  noPercentage: number;
  closingDate: Date;
  volume: number;
  participants: number;
  status: MarketStatus;
  category: "Crypto" | "Sports" | "Politics" | "Entertainment";
}

// Extended market with additional details
export interface MarketDetail extends Market {
  description: string;
  resolutionSource: string;
  createdBy: string;
  totalLiquidity: number;
  underlyingAsset: string;
}

// Props types
export interface MarketsPageProps {
  markets: Market[];
  selectedFilter: MarketFilter;
}

export interface MarketDetailProps {
  market: MarketDetail;
}