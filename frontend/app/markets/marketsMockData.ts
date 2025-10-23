import type { Market, MarketDetail } from "./types";

// Mock data for markets listing
export const marketsMockData = {
  markets: [
    {
      id: "1",
      question: "Will Price of SOL exceed $200 by 31st December, 2025?",
      image: "/sol.jpg",
      yesPercentage: 0.68,
      noPercentage: 0.32,
      closingDate: new Date("2025-12-31"),
      volume: 125000,
      participants: 450,
      status: "active" as const
    },
    {
      id: "2",
      question: "Will Price of Tether REACH $1200.00 by 31st December, 2025?",
      image: "/tether.jpg",
      yesPercentage: 0.85,
      noPercentage: 0.15,
      closingDate: new Date("2025-12-31"),
      volume: 89000,
      participants: 320,
      status: "active" as const
    },
    {
      id: "3",
      question: "Will Bonk Transition to proof-of-stake by Q3 2026?",
      image: "/bonk.png",
      yesPercentage: 0.50,
      noPercentage: 0.50,
      closingDate: new Date("2026-09-30"),
      volume: 210000,
      participants: 680,
      status: "active" as const
    }
  ] as Market[],
  selectedFilter: "Popular" as const
};

// Mock data for individual market details
export const marketDetailsMockData: Record<string, MarketDetail> = {
  "1": {
    ...marketsMockData.markets[0],
    description: "This market predicts whether Solana (SOL) will exceed $200 by December 31st, 2025. The resolution will be based on the closing price on major exchanges.",
    resolutionSource: "CoinGecko API - Average price across top 5 exchanges",
    createdBy: "0x742d...89a3",
    totalLiquidity: 250000,
    underlyingAsset: "SOL"
  },
  "2": {
    ...marketsMockData.markets[1],
    description: "This market predicts whether Tether (USDT) will reach $1200.00 by December 31st, 2025. This is a highly speculative market given Tether's stablecoin nature.",
    resolutionSource: "CoinMarketCap API - Official price feed",
    createdBy: "0x8f3c...12b7",
    totalLiquidity: 180000,
    underlyingAsset: "USDT"
  },
  "3": {
    ...marketsMockData.markets[2],
    description: "This market predicts whether Bonk will successfully transition to a proof-of-stake consensus mechanism by Q3 2026. Resolution based on official announcements and network upgrade completion.",
    resolutionSource: "Official Bonk Network Documentation and GitHub",
    createdBy: "0x5a7f...43d9",
    totalLiquidity: 420000,
    underlyingAsset: "BONK"
  }
};