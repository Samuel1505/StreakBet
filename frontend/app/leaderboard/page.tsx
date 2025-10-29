"use client";

import Header from "@/components/Header";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import { leaderboardMockData } from "./leaderboardMockData";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-cosmic-dark relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 cosmic-gradient" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cosmic-purple/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cosmic-blue/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Header />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-glow">
              Leaderboard
            </h1>
            <p className="text-text-muted text-lg">
              Top predictors competing for glory and rewards
            </p>
          </div>

          {/* Leaderboard Table */}
          <LeaderboardTable entries={leaderboardMockData.entries} />
        </div>
      </main>
    </div>
  );
}