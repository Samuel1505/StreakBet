import type { LeaderboardEntry } from "./types";

// Mock data for leaderboard
export const leaderboardMockData = {
  entries: [
    {
      rank: 1,
      wallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f0b89a3",
      ensName: "cryptoking.eth",
      points: 15420
    },
    {
      rank: 2,
      wallet: "0x8f3c2A1B7E9D4C5F6A8B3C2D1E0F9A8B7C6D5E4F",
      ensName: "predictor.eth",
      points: 12850
    },
    {
      rank: 3,
      wallet: "0x5a7f9B3C8D2E1F0A9B8C7D6E5F4A3B2C1D0E9F8A",
      ensName: "moonshot.eth",
      points: 10230
    },
    {
      rank: 4,
      wallet: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
      points: 8950
    },
    {
      rank: 5,
      wallet: "0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e",
      ensName: "whale.eth",
      points: 7680
    },
    {
      rank: 6,
      wallet: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
      points: 6420
    },
    {
      rank: 7,
      wallet: "0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
      points: 5890
    },
    {
      rank: 8,
      wallet: "0x2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e",
      ensName: "degen.eth",
      points: 4750
    },
    {
      rank: 9,
      wallet: "0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a",
      points: 3920
    },
    {
      rank: 10,
      wallet: "0x0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c",
      points: 3150
    }
  ] as LeaderboardEntry[]
};