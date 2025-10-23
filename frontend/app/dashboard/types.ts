// Dashboard tab types
export type DashboardTab = "Active Bets" | "Bet History" | "Achievements";

// Bet status types
export type BetStatus = "Winning" | "Losing" | "Ended" | "Active";

// Dashboard data types
export interface UserStats {
  totalBets: number;
  winRate: number;
  totalEarnings: number;
  currentBalance: number;
}

export interface UserBet {
  position: "Yes" | "No";
  amount: number;
  currency: string;
}

export interface ActiveBet {
  id: string;
  marketId: string;
  question: string;
  status: BetStatus;
  isEnded: boolean;
  userBet: UserBet;
  currentOdds: number;
  potentialPayout: number;
  placedAt: Date;
}

export interface RecentActivity {
  id: string;
  type: "bet_placed" | "bet_won" | "bet_lost" | "market_resolved";
  marketQuestion: string;
  position: "Yes" | "No";
  amount: number;
  currency: string;
  timestamp: Date;
}

// Props types
export interface DashboardPageProps {
  userStats: UserStats;
  activeBets: ActiveBet[];
  recentActivity: RecentActivity[];
  selectedTab: DashboardTab;
}