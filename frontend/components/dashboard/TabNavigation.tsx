"use client";

import type { DashboardTab } from "@/app/dashboard/types";

interface TabNavigationProps {
  selectedTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  activeBetsCount: number;
}

const tabs: DashboardTab[] = ["Active Bets", "Bet History", "Achievements"];

export default function TabNavigation({
  selectedTab,
  onTabChange,
  activeBetsCount,
}: TabNavigationProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            selectedTab === tab
              ? "bg-cosmic-purple text-white"
              : "bg-white/5 text-text-muted hover:bg-white/10 hover:text-white"
          }`}
        >
          {tab}
          {tab === "Active Bets" && activeBetsCount > 0 && (
            <span className="ml-2">({activeBetsCount})</span>
          )}
        </button>
      ))}
    </div>
  );
}