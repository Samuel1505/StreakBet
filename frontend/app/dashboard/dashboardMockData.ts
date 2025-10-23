import type { UserStats, ActiveBet, RecentActivity } from "./types";

// Mock data for dashboard
export const dashboardMockData = {
  userStats: {
    totalBets: 1,
    winRate: 0,
    totalEarnings: 0.0,
    currentBalance: 1.066984508
  } as UserStats,
  activeBets: [
    {
      id: "bet-1",
      marketId: "1",
      question: "will simi give woman bele this year?",
      status: "Losing" as const,
      isEnded: true,
      userBet: {
        position: "Yes" as const,
        amount: 0.01,
        currency: "CORE" as const
      },
      currentOdds: 0.50,
      potentialPayout: 0.114,
      placedAt: new Date(Date.now() - 1692 * 60 * 60 * 1000)
    }
  ] as ActiveBet[],
  recentActivity: [
    {
      id: "activity-1",
      type: "bet_placed" as const,
      marketQuestion: "will simi give woman bele this year?",
      position: "Yes" as const,
      amount: 0.01,
      currency: "CORE" as const,
      timestamp: new Date(Date.now() - 1692 * 60 * 60 * 1000)
    }
  ] as RecentActivity[]
};