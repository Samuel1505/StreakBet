"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Header from "@/components/Header";
import StatCard from "@/components/dashboard/StatCard";
import TabNavigation from "@/components/dashboard/TabNavigation";
import ActivityItem from "@/components/dashboard/ActivityItem";
import { Target, Trophy, DollarSign, Wallet, TrendingUp, Award } from "lucide-react";
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
        amount: bet.status === "won" && bet.prizeAmount 
          ? bet.prizeAmount 
          : bet.entryFee,
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
      <div className="min-h-screen bg-cosmic-dark flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cosmic-purple mb-4"></div>
          <p className="text-text-muted">Loading your dashboard...</p>
        </div>
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
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 text-glow">
              Dashboard
            </h1>
            <p className="text-text-muted text-lg">
              Track your predictions and earnings
            </p>
            {userAddress && (
              <p className="text-text-muted text-sm mt-2 font-mono">
                {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
              </p>
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
              <StatCard
                title="Total Predictions"
                value={userStats.totalPredictions.toString()}
                icon={<Target className="w-8 h-8" />}
                iconColor="text-cosmic-purple"
                iconBgColor="bg-cosmic-purple/20"
              />
              <StatCard
                title="Win Rate"
                value={`${Math.round(winRate)}%`}
                subtitle={`${userStats.correctPredictions} / ${userStats.totalPredictions} correct`}
                icon={<Trophy className="w-8 h-8" />}
                iconColor="text-green-400"
                iconBgColor="bg-green-400/20"
              />
              <StatCard
                title="Total Winnings"
                value={`${parseFloat(userStats.totalWinnings).toFixed(4)} ETH`}
                icon={<DollarSign className="w-8 h-8" />}
                iconColor="text-yellow-400"
                iconBgColor="bg-yellow-400/20"
              />
              <StatCard
                title="Wallet Balance"
                value={`${parseFloat(userStats.walletBalance).toFixed(4)} ETH`}
                icon={<Wallet className="w-8 h-8" />}
                iconColor="text-cosmic-blue"
                iconBgColor="bg-cosmic-blue/20"
              />
            </div>
          )}

          {/* Additional Stats Row */}
          {userStats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-orange-400/20">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Current Streak</p>
                    <p className="text-2xl font-bold text-white">{userStats.currentStreak}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-400/20">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Longest Streak</p>
                    <p className="text-2xl font-bold text-white">{userStats.longestStreak}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-400/20">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Accuracy</p>
                    <p className="text-2xl font-bold text-white">{userStats.accuracyPercentage.toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-cosmic-purple/20">
                    <Trophy className="w-6 h-6 text-cosmic-purple" />
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Total Points</p>
                    <p className="text-2xl font-bold text-white">{userStats.totalPoints}</p>
                  </div>
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
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Your Active Bets
                  </h2>
                  <div className="space-y-6">
                    {activeBetsOnly.length > 0 ? (
                      activeBetsOnly.map((bet) => (
                        <Link key={bet.id} href={`/markets/${bet.id}`}>
                          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">
                                  {bet.question}
                                </h3>
                                <p className="text-text-muted text-sm">
                                  Your prediction: <span className="text-cosmic-purple font-semibold">{bet.selectedOption}</span>
                                </p>
                              </div>
                              <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                                bet.status === "active" ? "bg-green-500/20 text-green-400" :
                                bet.status === "closed" ? "bg-yellow-500/20 text-yellow-400" :
                                bet.status === "won" ? "bg-green-500/20 text-green-400" :
                                "bg-red-500/20 text-red-400"
                              }`}>
                                {bet.status === "active" ? "Active" :
                                 bet.status === "closed" ? "Closed" :
                                 bet.status === "won" ? "Won" : "Lost"}
                              </span>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-text-muted">
                              <span>Entry: {bet.entryFee} ETH</span>
                              <span>•</span>
                              <span>{bet.totalParticipants} participants</span>
                              <span>•</span>
                              <span>
                                {bet.status === "active" 
                                  ? `Closes ${bet.endTime.toLocaleDateString()}`
                                  : `Closed ${bet.endTime.toLocaleDateString()}`
                                }
                              </span>
                            </div>

                            {bet.status === "won" && bet.prizeAmount && (
                              <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                                <p className="text-green-400 font-semibold">
                                  🎉 Prize: {bet.prizeAmount} ETH {bet.claimed ? "(Claimed)" : "(Pending)"}
                                </p>
                              </div>
                            )}
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
                        <div className="text-6xl mb-4">🎯</div>
                        <p className="text-text-muted text-lg mb-6">
                          No active bets yet. Start predicting!
                        </p>
                        <Link
                          href="/markets"
                          className="inline-block px-6 py-3 bg-gradient-to-r from-cosmic-purple to-cosmic-blue rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all"
                        >
                          Explore Markets
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedTab === "Bet History" && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Bet History
                  </h2>
                  <div className="space-y-4">
                    {activeBets.length > 0 ? (
                      activeBets.map((bet) => (
                        <Link key={bet.id} href={`/markets/${bet.id}`}>
                          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="text-white font-semibold mb-1">
                                  {bet.question}
                                </h4>
                                <p className="text-text-muted text-sm">
                                  {bet.selectedOption} • {bet.entryFee} ETH
                                </p>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                bet.status === "won" ? "bg-green-500/20 text-green-400" :
                                bet.status === "lost" ? "bg-red-500/20 text-red-400" :
                                "bg-yellow-500/20 text-yellow-400"
                              }`}>
                                {bet.status}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
                        <p className="text-text-muted text-lg">No bet history yet</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedTab === "Achievements" && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Achievements
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Streak Achievement */}
                    {userStats && userStats.longestStreak >= 3 && (
                      <div className="bg-white/5 backdrop-blur-sm border border-cosmic-purple/30 rounded-xl p-6">
                        <div className="text-4xl mb-2">🔥</div>
                        <h3 className="text-white font-bold mb-1">Streak Master</h3>
                        <p className="text-text-muted text-sm">
                          Achieved {userStats.longestStreak} prediction streak
                        </p>
                      </div>
                    )}

                    {/* Accuracy Achievement */}
                    {userStats && userStats.accuracyPercentage >= 70 && userStats.totalPredictions >= 5 && (
                      <div className="bg-white/5 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
                        <div className="text-4xl mb-2">🎯</div>
                        <h3 className="text-white font-bold mb-1">Sharp Predictor</h3>
                        <p className="text-text-muted text-sm">
                          {userStats.accuracyPercentage.toFixed(1)}% accuracy rate
                        </p>
                      </div>
                    )}

                    {/* Volume Achievement */}
                    {userStats && userStats.totalPredictions >= 10 && (
                      <div className="bg-white/5 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
                        <div className="text-4xl mb-2">📈</div>
                        <h3 className="text-white font-bold mb-1">Active Trader</h3>
                        <p className="text-text-muted text-sm">
                          Made {userStats.totalPredictions}+ predictions
                        </p>
                      </div>
                    )}

                    {/* Points Achievement */}
                    {userStats && userStats.totalPoints >= 100 && (
                      <div className="bg-white/5 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
                        <div className="text-4xl mb-2">⭐</div>
                        <h3 className="text-white font-bold mb-1">Point Collector</h3>
                        <p className="text-text-muted text-sm">
                          Earned {userStats.totalPoints} points
                        </p>
                      </div>
                    )}
                  </div>

                  {userStats && userStats.totalPredictions === 0 && (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
                      <div className="text-6xl mb-4">🏆</div>
                      <p className="text-text-muted text-lg">
                        Start making predictions to unlock achievements!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right column - Recent Activity */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-white mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))
                ) : (
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                    <p className="text-text-muted">No recent activity</p>
                  </div>
                )}
              </div>

              {/* Refresh Button */}
              <button
                onClick={connectAndFetchData}
                disabled={loading}
                className="w-full mt-6 py-3 bg-cosmic-purple/20 hover:bg-cosmic-purple/30 border border-cosmic-purple/50 rounded-lg text-cosmic-purple font-semibold transition-all disabled:opacity-50"
              >
                {loading ? "Refreshing..." : "🔄 Refresh Dashboard"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}