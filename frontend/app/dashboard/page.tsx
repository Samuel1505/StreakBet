"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Header from "@/components/Header";
import EnhancedStatCard from "@/components/dashboard/EnhancedStatCard";
import TabNavigation from "@/components/dashboard/TabNavigation";
import ActivityItem from "@/components/dashboard/ActivityItem";
import BetCard from "@/components/dashboard/BetCard";
import AchievementCard from "@/components/dashboard/AchievementCard";
import EmptyState from "@/components/dashboard/EmptyState";
import ProgressRing from "@/components/dashboard/ProgressRing";
import { Target, Trophy, DollarSign, Wallet, TrendingUp, Award, Sparkles, Activity } from "lucide-react";
import type { DashboardTab, RecentActivity } from "./types";
import { PrizePredictionContract } from "../../app/ABIs/index";
import PrizePoolPredictionABI from "../../app/ABIs/Prediction.json";
import Link from "next/link";

interface UserStats {
  totalPredictions: number;
  correctPredictions: number;
  currentStreak: number;
  longestStreak: number;
  totalWinnings: string;
  accuracyPercentage: number;
  hasStreakSaver: boolean;
  totalPoints: number;
  walletBalance: string;
}

interface ActiveBet {
  id: string;
  question: string;
  selectedOption: string;
  optionIndex: number;
  entryFee: string;
  timestamp: Date;
  endTime: Date;
  status: "active" | "closed" | "won" | "lost";
  prizeAmount?: string;
  claimed?: boolean;
  totalParticipants: number;
}

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState<DashboardTab>("Active Bets");
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [activeBets, setActiveBets] = useState<ActiveBet[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    connectAndFetchData();
  }, []);

  const connectAndFetchData = async () => {
    try {
      setLoading(true);
      setError("");

      if (typeof window.ethereum === "undefined") {
        setError("Please install MetaMask to view your dashboard");
        setLoading(false);
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum as any);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);

      console.log("Connected wallet:", address);

      const contract = new ethers.Contract(
        PrizePredictionContract.address,
        PrizePoolPredictionABI.abi,
        provider
      );

      // Fetch user stats from contract
      const stats = await contract.getUserStats(address);
      
      // Fetch wallet balance
      const balance = await provider.getBalance(address);

      const userStatsData: UserStats = {
        totalPredictions: Number(stats.totalPredictions),
        correctPredictions: Number(stats.correctPredictions),
        currentStreak: Number(stats.currentStreak),
        longestStreak: Number(stats.longestStreak),
        totalWinnings: ethers.formatEther(stats.totalWinnings),
        accuracyPercentage: Number(stats.accuracyPercentage) / 100, // Convert from basis points
        hasStreakSaver: stats.hasStreakSaver,
        totalPoints: Number(stats.totalPoints),
        walletBalance: ethers.formatEther(balance),
      };

      console.log("User stats:", userStatsData);
      setUserStats(userStatsData);

      // Fetch user's participated predictions
      const participatedPredictionIds = await contract.getUserParticipatedPredictions(address);
      console.log("Participated predictions:", participatedPredictionIds);

      // Fetch details for each participated prediction
      const betsPromises = participatedPredictionIds.map((id: bigint) =>
        fetchBetDetails(contract, Number(id), address)
      );
      const bets = await Promise.all(betsPromises);
      const validBets = bets.filter((bet): bet is ActiveBet => bet !== null);

      // Sort by timestamp (newest first)
      validBets.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

      setActiveBets(validBets);

      // Generate activities from bets
      const generatedActivities = generateActivities(validBets);
      setActivities(generatedActivities);

    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBetDetails = async (
    contract: ethers.Contract,
    predictionId: number,
    userAddress: string
  ): Promise<ActiveBet | null> => {
    try {
      // Fetch prediction details
      const prediction = await contract.getPrediction(predictionId);
      
      // Fetch user's prediction
      const userPrediction = await contract.getUserPrediction(predictionId, userAddress);
      
      if (userPrediction.timestamp === BigInt(0)) {
        return null; // User hasn't predicted on this market
      }

      // Fetch user's prize status
      const prizeStatus = await contract.getUserPrizeStatus(predictionId, userAddress);

      const endTime = new Date(Number(prediction.endTime) * 1000);
      const now = new Date();
      
      let status: "active" | "closed" | "won" | "lost";
      if (prediction.resolved) {
        status = prizeStatus.hasWon ? "won" : "lost";
      } else if (now > endTime) {
        status = "closed";
      } else {
        status = "active";
      }

      return {
        id: prediction.id.toString(),
        question: prediction.question,
        selectedOption: prediction.options[Number(userPrediction.option)],
        optionIndex: Number(userPrediction.option),
        entryFee: ethers.formatEther(prediction.entryFee),
        timestamp: new Date(Number(userPrediction.timestamp) * 1000),
        endTime,
        status,
        prizeAmount: prizeStatus.hasWon ? ethers.formatEther(prizeStatus.prizeAmount) : undefined,
        claimed: userPrediction.claimed,
        totalParticipants: Number(prediction.totalParticipants),
      };
    } catch (err) {
      console.error(`Error fetching bet ${predictionId}:`, err);
      return null;
    }
  };

  const generateActivities = (bets: ActiveBet[]): RecentActivity[] => {
  return bets.slice(0, 10).map((bet) => {
    const position = bet.selectedOption as "Yes" | "No";
    return {
      id: bet.id,
      type: bet.status === "won" ? "bet_won" : bet.status === "lost" ? "bet_lost" : "bet_placed",
      marketQuestion: bet.question,
      amount: parseFloat(
        bet.status === "won" && bet.prizeAmount 
          ? bet.prizeAmount 
          : bet.entryFee
      ),
      timestamp: bet.timestamp,
      position,
      currency: "ETH",
    };
  });
};

  const activeBetsOnly = activeBets.filter(bet => bet.status === "active" || bet.status === "closed");
  const winRate = userStats && userStats.totalPredictions > 0
    ? (userStats.correctPredictions / userStats.totalPredictions) * 100
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-cosmic-dark relative overflow-hidden">
        <div className="absolute inset-0 cosmic-gradient" />
        <Header />
        <main className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <div className="h-12 bg-white/10 rounded-lg w-64 mb-4 animate-pulse" />
              <div className="h-6 bg-white/10 rounded-lg w-96 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl" />
                    <div className="w-16 h-4 bg-white/10 rounded" />
                  </div>
                  <div className="h-8 bg-white/10 rounded w-1/2 mb-2" />
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-pulse">
                    <div className="h-6 bg-white/10 rounded w-1/3 mb-4" />
                    <div className="h-4 bg-white/10 rounded w-full mb-2" />
                    <div className="h-4 bg-white/10 rounded w-5/6" />
                  </div>
                ))}
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-pulse">
                  <div className="h-6 bg-white/10 rounded w-1/2 mb-4" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-16 bg-white/10 rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-cosmic-purple" />
              <h1 className="text-5xl md:text-6xl font-bold text-white text-glow">
                Dashboard
              </h1>
            </div>
            <p className="text-text-muted text-lg mb-2">
              Track your predictions and earnings
            </p>
            {userAddress && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-text-muted text-sm font-mono">
                  {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-8 bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Statistics Cards */}
          {userStats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <EnhancedStatCard
                title="Total Predictions"
                value={userStats.totalPredictions.toString()}
                icon={<Target className="w-8 h-8" />}
                iconColor="text-cosmic-purple"
                iconBgColor="bg-cosmic-purple/20"
                gradient="from-cosmic-purple to-purple-600"
              />
              <EnhancedStatCard
                title="Win Rate"
                value={`${Math.round(winRate)}%`}
                subtitle={`${userStats.correctPredictions} / ${userStats.totalPredictions} correct`}
                icon={<Trophy className="w-8 h-8" />}
                iconColor="text-emerald-400"
                iconBgColor="bg-emerald-400/20"
                gradient="from-emerald-500 to-green-600"
              />
              <EnhancedStatCard
                title="Total Winnings"
                value={`${parseFloat(userStats.totalWinnings).toFixed(4)} ETH`}
                icon={<DollarSign className="w-8 h-8" />}
                iconColor="text-yellow-400"
                iconBgColor="bg-yellow-400/20"
                gradient="from-yellow-500 to-orange-500"
              />
              <EnhancedStatCard
                title="Wallet Balance"
                value={`${parseFloat(userStats.walletBalance).toFixed(4)} ETH`}
                icon={<Wallet className="w-8 h-8" />}
                iconColor="text-cosmic-blue"
                iconBgColor="bg-cosmic-blue/20"
                gradient="from-cosmic-blue to-blue-600"
              />
            </div>
          )}

          {/* Performance Overview */}
          {userStats && (
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-cosmic-purple" />
                Performance Overview
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Current Streak */}
                {/* @ts-ignore - bg-gradient-to-br is correct Tailwind class */}
                <div className="group relative bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-xl bg-orange-400/20 group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-6 h-6 text-orange-400" />
                    </div>
                    {userStats.currentStreak > 0 && (
                      <span className="text-2xl">🔥</span>
                    )}
                  </div>
                  <p className="text-text-muted text-sm mb-1">Current Streak</p>
                  <p className="text-3xl font-bold text-white text-glow">{userStats.currentStreak}</p>
                </div>

                {/* Longest Streak */}
                {/* @ts-ignore - bg-gradient-to-br is correct Tailwind class */}
                <div className="group relative bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-xl bg-purple-400/20 group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-6 h-6 text-purple-400" />
                    </div>
                    {userStats.longestStreak >= 5 && (
                      <span className="text-2xl">⭐</span>
                    )}
                  </div>
                  <p className="text-text-muted text-sm mb-1">Longest Streak</p>
                  <p className="text-3xl font-bold text-white text-glow">{userStats.longestStreak}</p>
                </div>

                {/* Accuracy with Progress Ring */}
                {/* @ts-ignore - bg-gradient-to-br is correct Tailwind class */}
                <div className="group relative bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-muted text-sm mb-1">Accuracy</p>
                      <p className="text-3xl font-bold text-white text-glow mb-2">
                        {userStats.accuracyPercentage.toFixed(1)}%
                      </p>
                      <div className="flex items-center gap-1 text-xs text-blue-400">
                        <Target className="w-3 h-3" />
                        <span>Precision Rate</span>
                      </div>
                    </div>
                    <div className="scale-75">
                      <ProgressRing 
                        percentage={userStats.accuracyPercentage} 
                        size={80}
                        strokeWidth={6}
                        color="#3b82f6"
                      />
                    </div>
                  </div>
                </div>

                {/* Total Points */}
                {/* eslint-disable-next-line */}
                <div className="group relative bg-gradient-to-br from-cosmic-purple/10 to-cosmic-blue/5 border border-cosmic-purple/20 rounded-2xl p-6 hover:border-cosmic-purple/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-xl bg-cosmic-purple/20 group-hover:scale-110 transition-transform duration-300">
                      <Trophy className="w-6 h-6 text-cosmic-purple" />
                    </div>
                    {userStats.totalPoints >= 100 && (
                      <span className="text-2xl">🏆</span>
                    )}
                  </div>
                  <p className="text-text-muted text-sm mb-1">Total Points</p>
                  <p className="text-3xl font-bold text-white text-glow">{userStats.totalPoints}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <TabNavigation
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            activeBetsCount={activeBetsOnly.length}
          />

          {/* Content based on selected tab */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Left column - Active Bets / Bet History */}
            <div className="lg:col-span-2">
              {selectedTab === "Active Bets" && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                    <Target className="w-7 h-7 text-cosmic-purple" />
                    Your Active Bets
                  </h2>
                  <div className="space-y-4">
                    {activeBetsOnly.length > 0 ? (
                      activeBetsOnly.map((bet) => (
                        <BetCard
                          key={bet.id}
                          id={bet.id}
                          question={bet.question}
                          selectedOption={bet.selectedOption}
                          entryFee={bet.entryFee}
                          endTime={bet.endTime}
                          status={bet.status}
                          prizeAmount={bet.prizeAmount}
                          claimed={bet.claimed}
                          totalParticipants={bet.totalParticipants}
                        />
                      ))
                    ) : (
                      <EmptyState
                        emoji="🎯"
                        title="No Active Bets"
                        description="You don't have any active predictions yet. Start predicting on markets to see them here!"
                        actionText="Explore Markets"
                        actionHref="/markets"
                      />
                    )}
                  </div>
                </div>
              )}

              {selectedTab === "Bet History" && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                    <Trophy className="w-7 h-7 text-cosmic-purple" />
                    Bet History
                  </h2>
                  <div className="space-y-4">
                    {activeBets.length > 0 ? (
                      activeBets.map((bet) => (
                        <BetCard
                          key={bet.id}
                          id={bet.id}
                          question={bet.question}
                          selectedOption={bet.selectedOption}
                          entryFee={bet.entryFee}
                          endTime={bet.endTime}
                          status={bet.status}
                          prizeAmount={bet.prizeAmount}
                          claimed={bet.claimed}
                          totalParticipants={bet.totalParticipants}
                        />
                      ))
                    ) : (
                      <EmptyState
                        emoji="📊"
                        title="No Bet History"
                        description="Your prediction history will appear here once you start participating in markets."
                        actionText="Start Predicting"
                        actionHref="/markets"
                      />
                    )}
                  </div>
                </div>
              )}

              {selectedTab === "Achievements" && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                    <Award className="w-7 h-7 text-cosmic-purple" />
                    Achievements
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Streak Achievement */}
                    <AchievementCard
                      emoji="🔥"
                      title="Streak Master"
                      description={`Achieved ${userStats?.longestStreak || 0} prediction streak`}
                      borderColor="border-orange-500/30"
                      glowColor="bg-orange-500"
                      unlocked={userStats ? userStats.longestStreak >= 3 : false}
                    />

                    {/* Accuracy Achievement */}
                    <AchievementCard
                      emoji="🎯"
                      title="Sharp Predictor"
                      description={`${userStats?.accuracyPercentage.toFixed(1) || 0}% accuracy rate`}
                      borderColor="border-emerald-500/30"
                      glowColor="bg-emerald-500"
                      unlocked={userStats ? userStats.accuracyPercentage >= 70 && userStats.totalPredictions >= 5 : false}
                    />

                    {/* Volume Achievement */}
                    <AchievementCard
                      emoji="📈"
                      title="Active Trader"
                      description={`Made ${userStats?.totalPredictions || 0}+ predictions`}
                      borderColor="border-blue-500/30"
                      glowColor="bg-blue-500"
                      unlocked={userStats ? userStats.totalPredictions >= 10 : false}
                    />

                    {/* Points Achievement */}
                    <AchievementCard
                      emoji="⭐"
                      title="Point Collector"
                      description={`Earned ${userStats?.totalPoints || 0} points`}
                      borderColor="border-yellow-500/30"
                      glowColor="bg-yellow-500"
                      unlocked={userStats ? userStats.totalPoints >= 100 : false}
                    />

                    {/* Winnings Achievement */}
                    <AchievementCard
                      emoji="💰"
                      title="Big Winner"
                      description={`Total winnings: ${parseFloat(userStats?.totalWinnings || "0").toFixed(4)} ETH`}
                      borderColor="border-purple-500/30"
                      glowColor="bg-purple-500"
                      unlocked={userStats ? parseFloat(userStats.totalWinnings) >= 1 : false}
                    />

                    {/* First Prediction Achievement */}
                    <AchievementCard
                      emoji="🎊"
                      title="First Steps"
                      description="Made your first prediction"
                      borderColor="border-cyan-500/30"
                      glowColor="bg-cyan-500"
                      unlocked={userStats ? userStats.totalPredictions >= 1 : false}
                    />
                  </div>

                  {userStats && userStats.totalPredictions === 0 && (
                    <div className="mt-8">
                      <EmptyState
                        emoji="🏆"
                        title="No Achievements Yet"
                        description="Start making predictions to unlock achievements and earn rewards!"
                        actionText="Start Predicting"
                        actionHref="/markets"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right column - Recent Activity */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-cosmic-purple" />
                  Recent Activity
                </h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-hide">
                  {activities.length > 0 ? (
                    activities.map((activity) => (
                      <ActivityItem key={activity.id} activity={activity} />
                    ))
                  ) : (
                    <EmptyState
                      emoji="📭"
                      title="No Activity"
                      description="Your recent activity will appear here"
                    />
                  )}
                </div>

                {/* Refresh Button */}
                <button
                  onClick={connectAndFetchData}
                  disabled={loading}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-cosmic-purple/20 to-cosmic-blue/20 hover:from-cosmic-purple/30 hover:to-cosmic-blue/30 border border-cosmic-purple/50 rounded-xl text-white font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  <span className="group-hover:rotate-180 transition-transform duration-500">
                    🔄
                  </span>
                  <span>{loading ? "Refreshing..." : "Refresh Dashboard"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}