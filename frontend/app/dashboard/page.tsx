"use client";

import { useState } from "react";
import Header from "@/components/Header";
import StatCard from "@/components/dashboard/StatCard";
import TabNavigation from "@/components/dashboard/TabNavigation";
import ActiveBetCard from "@/components/dashboard/ActiveBetCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import { Target, Trophy, DollarSign, Wallet } from "lucide-react";
import { dashboardMockData } from "./dashboardMockData";
import type { DashboardTab } from "./types";

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState<DashboardTab>("Active Bets");

  const { userStats, activeBets, recentActivity } = dashboardMockData;

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
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 text-glow">
              Dashboard
            </h1>
            <p className="text-text-muted text-lg">
              Track your predictions and earnings
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              title="Total Bets"
              value={userStats.totalBets.toString()}
              icon={<Target className="w-8 h-8" />}
              iconColor="text-cosmic-purple"
              iconBgColor="bg-cosmic-purple/20"
            />
            <StatCard
              title="Win Rate"
              value={`${Math.round(userStats.winRate * 100)}%`}
              icon={<Trophy className="w-8 h-8" />}
              iconColor="text-green-400"
              iconBgColor="bg-green-400/20"
            />
            <StatCard
              title="Total Earnings"
              value={`${userStats.totalEarnings.toFixed(1)} CORE`}
              icon={<DollarSign className="w-8 h-8" />}
              iconColor="text-yellow-400"
              iconBgColor="bg-yellow-400/20"
            />
            <StatCard
              title="Current Balance"
              value={`${userStats.currentBalance.toFixed(9)} CORE`}
              icon={<Wallet className="w-8 h-8" />}
              iconColor="text-cosmic-blue"
              iconBgColor="bg-cosmic-blue/20"
            />
          </div>

          {/* Tab Navigation */}
          <TabNavigation
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            activeBetsCount={activeBets.length}
          />

          {/* Content based on selected tab */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Left column - Active Bets / Bet History / Achievements */}
            <div className="lg:col-span-2">
              {selectedTab === "Active Bets" && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Your Active Bets
                  </h2>
                  <div className="space-y-6">
                    {activeBets.length > 0 ? (
                      activeBets.map((bet) => (
                        <ActiveBetCard key={bet.id} bet={bet} />
                      ))
                    ) : (
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
                        <p className="text-text-muted text-lg">
                          No active bets yet. Start predicting!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedTab === "Bet History" && (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
                  <p className="text-text-muted text-lg">
                    Bet history coming soon
                  </p>
                </div>
              )}

              {selectedTab === "Achievements" && (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
                  <p className="text-text-muted text-lg">
                    Achievements coming soon
                  </p>
                </div>
              )}
            </div>

            {/* Right column - Recent Activity */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-white mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))
                ) : (
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                    <p className="text-text-muted">No recent activity</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}