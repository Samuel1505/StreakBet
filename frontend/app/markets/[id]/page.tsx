"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ethers } from "ethers";
import Header from "@/components/Header";
import Image from "next/image";
import { ThumbsUp, ThumbsDown, ArrowLeft, Users, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import { formatTimeRemaining, formatPercentage, formatVolume } from "../utils";
import { PrizePredictionContract } from "../../../app/ABIs/index";
import PrizePoolPredictionABI from "../../../app/ABIs/Prediction.json";

interface MarketDetail {
  id: string;
  question: string;
  options: Array<{
    label: string;
    percentage: number;
    count: number;
  }>;
  entryFee: string;
  prizePool: string;
  endTime: Date;
  resolutionTime: Date;
  resolved: boolean;
  winningOption: number;
  active: boolean;
  creator: string;
  totalParticipants: number;
  yesPercentage: number;
  noPercentage: number;
}

export default function MarketDetailPage() {
  const params = useParams();
  const marketId = params.id as string;
  
  const [market, setMarket] = useState<MarketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tradeAmount, setTradeAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [userAddress, setUserAddress] = useState<string>("");

  useEffect(() => {
    fetchMarketDetail();
    connectWallet();
  }, [marketId]);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  };

  const fetchMarketDetail = async () => {
    try {
      setLoading(true);
      setError("");

      if (typeof window.ethereum === "undefined") {
        setError("Please install MetaMask to view market details");
        setLoading(false);
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const contract = new ethers.Contract(
        PrizePredictionContract.address,
        PrizePoolPredictionABI.abi,
        provider
      );

      // Fetch prediction details
      const prediction = await contract.getPrediction(marketId);
      
      // Fetch option statistics
      const optionStats = await contract.getAllOptionStats(marketId);
      const counts = optionStats.counts;
      const percentages = optionStats.percentages;

      // Format options with their percentages
      const options = prediction.options.map((optionLabel: string, idx: number) => ({
        label: optionLabel,
        percentage: Number(percentages[idx]) / 100,
        count: Number(counts[idx]),
      }));

      const marketDetail: MarketDetail = {
        id: prediction.id.toString(),
        question: prediction.question,
        options,
        entryFee: ethers.formatEther(prediction.entryFee),
        prizePool: ethers.formatEther(prediction.prizePool),
        endTime: new Date(Number(prediction.endTime) * 1000),
        resolutionTime: new Date(Number(prediction.resolutionTime) * 1000),
        resolved: prediction.resolved,
        winningOption: Number(prediction.winningOption),
        active: prediction.active,
        creator: prediction.creator,
        totalParticipants: Number(prediction.totalParticipants),
        yesPercentage: options.length > 0 ? options[0].percentage : 0,
        noPercentage: options.length > 1 ? options[1].percentage : 0,
      };

      console.log("Market detail:", marketDetail);
      setMarket(marketDetail);
    } catch (err) {
      console.error("Error fetching market detail:", err);
      setError("Failed to load market details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPrediction = async () => {
    if (!market || !tradeAmount || parseFloat(tradeAmount) <= 0) return;

    try {
      setSubmitting(true);
      setError("");

      if (typeof window.ethereum === "undefined") {
        throw new Error("Please install MetaMask!");
      }

      const provider = new ethers.BrowserProvider(window.ethereum as any);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        PrizePredictionContract.address,
        PrizePoolPredictionABI.abi,
        signer
      );

      // Validate entry fee matches
      const entryFeeWei = ethers.parseEther(market.entryFee);
      const userAmountWei = ethers.parseEther(tradeAmount);

      if (userAmountWei !== entryFeeWei) {
        throw new Error(`Entry fee must be exactly ${market.entryFee} ETH`);
      }

      // Check if user already predicted
      const userPrediction = await contract.getUserPrediction(marketId, userAddress);
      if (userPrediction.timestamp > 0) {
        throw new Error("You have already made a prediction on this market");
      }

      console.log("Submitting prediction:", {
        marketId,
        optionIndex: selectedOption,
        amount: tradeAmount,
      });

      // Submit prediction
      const tx = await contract.submitPrediction(
        marketId,
        selectedOption,
        { value: entryFeeWei }
      );

      setError("Transaction submitted! Waiting for confirmation...");
      await tx.wait();

      setError("Prediction submitted successfully! ✅");
      
      // Refresh market data
      setTimeout(() => {
        fetchMarketDetail();
        setTradeAmount("");
        setError("");
      }, 2000);

    } catch (err: any) {
      console.error("Error submitting prediction:", err);
      if (err.code === "ACTION_REJECTED" || err.code === 4001) {
        setError("Transaction cancelled by user.");
      } else {
        setError(err.message || "Failed to submit prediction.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cosmic-dark flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cosmic-purple mb-4"></div>
          <p className="text-text-muted">Loading market details...</p>
        </div>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="min-h-screen bg-cosmic-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <div className="text-white text-xl mb-2">Market not found</div>
          <p className="text-text-muted mb-6">This market doesn't exist or has been removed.</p>
          <Link
            href="/markets"
            className="inline-block px-6 py-3 bg-gradient-to-r from-cosmic-purple to-cosmic-blue rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all"
          >
            Back to Markets
          </Link>
        </div>
      </div>
    );
  }

  const now = new Date();
  const isExpired = now > market.endTime;
  const canTrade = market.active && !market.resolved && !isExpired;

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
          {/* Back button */}
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Markets</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Market details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Market header */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex gap-6 mb-6">
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-cosmic-purple/20 flex items-center justify-center">
                    <span className="text-5xl">🔮</span>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {market.question}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {isExpired ? "Closed" : formatTimeRemaining(market.endTime)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {market.totalParticipants} participants
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {market.prizePool} ETH prize pool
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status badge */}
                {market.resolved && (
                  <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                    <span className="text-green-400 font-semibold">
                      ✅ Resolved - Winner: {market.options[market.winningOption]?.label}
                    </span>
                  </div>
                )}

                {isExpired && !market.resolved && (
                  <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                    <span className="text-yellow-400 font-semibold">
                      ⏰ Market closed - Awaiting resolution
                    </span>
                  </div>
                )}

                {/* Voting indicators - Binary markets */}
                {market.options.length === 2 && (
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center gap-3 px-5 py-3 rounded-xl bg-green-500/20 border border-green-500/30">
                      <ThumbsUp className="w-5 h-5 text-green-400" />
                      <div className="flex-1">
                        <span className="text-green-400 font-semibold block">
                          {market.options[0]?.label}
                        </span>
                        <span className="text-green-400/70 text-sm">
                          {market.options[0]?.count} predictions
                        </span>
                      </div>
                      <span className="text-green-400 text-lg font-bold">
                        {formatPercentage(market.yesPercentage)}
                      </span>
                    </div>

                    <div className="flex-1 flex items-center gap-3 px-5 py-3 rounded-xl bg-red-500/20 border border-red-500/30">
                      <ThumbsDown className="w-5 h-5 text-red-400" />
                      <div className="flex-1">
                        <span className="text-red-400 font-semibold block">
                          {market.options[1]?.label}
                        </span>
                        <span className="text-red-400/70 text-sm">
                          {market.options[1]?.count} predictions
                        </span>
                      </div>
                      <span className="text-red-400 text-lg font-bold">
                        {formatPercentage(market.noPercentage)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Multi-option display */}
                {market.options.length > 2 && (
                  <div className="space-y-3">
                    {market.options.map((option, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 px-5 py-3 rounded-xl bg-cosmic-purple/20 border border-cosmic-purple/30"
                      >
                        <div className="flex-1">
                          <span className="text-white font-semibold block">
                            {option.label}
                          </span>
                          <span className="text-text-muted text-sm">
                            {option.count} predictions
                          </span>
                        </div>
                        <span className="text-cosmic-purple text-lg font-bold">
                          {formatPercentage(option.percentage)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Market details */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Market Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-text-muted">Entry Fee:</span>
                    <span className="text-white font-semibold">{market.entryFee} ETH</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-text-muted">Prize Pool:</span>
                    <span className="text-white font-semibold">{market.prizePool} ETH</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-text-muted">Created By:</span>
                    <span className="text-white font-mono text-sm">
                      {market.creator.slice(0, 6)}...{market.creator.slice(-4)}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-text-muted">Total Participants:</span>
                    <span className="text-white">{market.totalParticipants}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-text-muted">Closing Date:</span>
                    <span className="text-white">
                      {market.endTime.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-text-muted">Resolution Time:</span>
                    <span className="text-white">
                      {market.resolutionTime.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-text-muted">Status:</span>
                    <span className={`font-semibold ${
                      market.resolved ? "text-green-400" :
                      isExpired ? "text-yellow-400" : "text-cosmic-purple"
                    }`}>
                      {market.resolved ? "Resolved" :
                       isExpired ? "Closed" : "Active"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Trading interface */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Make Prediction</h2>

                {!canTrade && (
                  <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                    <p className="text-yellow-400 text-sm">
                      {market.resolved ? "This market has been resolved" :
                       isExpired ? "This market is closed for predictions" :
                       !market.active ? "This market is inactive" : ""}
                    </p>
                  </div>
                )}

                {error && (
                  <div className={`mb-6 p-4 border rounded-lg flex items-start gap-3 ${
                    error.includes("✅") || error.includes("successfully")
                      ? "bg-green-500/20 border-green-500/30 text-green-400"
                      : error.includes("submitted") || error.includes("Waiting")
                      ? "bg-blue-500/20 border-blue-500/30 text-blue-400"
                      : error.includes("cancelled")
                      ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-400"
                      : "bg-red-500/20 border-red-500/30 text-red-400"
                  }`}>
                    <div className="flex-shrink-0 mt-0.5">
                      {error.includes("✅") || error.includes("successfully") ? (
                        <span className="text-xl">✅</span>
                      ) : error.includes("submitted") || error.includes("Waiting") ? (
                        <span className="text-xl">⏳</span>
                      ) : error.includes("cancelled") ? (
                        <span className="text-xl">⚠️</span>
                      ) : (
                        <span className="text-xl">❌</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{error}</p>
                      {error.includes("submitted") && (
                        <p className="text-xs mt-2 opacity-90">
                          Waiting for blockchain confirmation...
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Option selector */}
                <div className="mb-6 space-y-3">
                  <label className="block text-white text-sm font-medium mb-2">
                    Select Your Prediction
                  </label>
                  {market.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      disabled={!canTrade}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all text-left ${
                        selectedOption === idx
                          ? "bg-cosmic-purple/30 border-2 border-cosmic-purple text-white"
                          : "bg-white/5 border border-white/10 text-text-muted hover:bg-white/10"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{option.label}</span>
                        <span className="text-sm">{formatPercentage(option.percentage)}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Amount input */}
                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-2">
                    Entry Fee (ETH)
                  </label>
                  <input
                    type="text"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    placeholder={market.entryFee}
                    disabled={!canTrade}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-text-muted/50 focus:outline-none focus:border-cosmic-blue/50 focus:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <p className="text-text-muted text-xs mt-1">
                    Required: {market.entryFee} ETH
                  </p>
                </div>

                {/* Potential return */}
                <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-text-muted text-sm">Potential Share</span>
                    <span className="text-white font-semibold">
                      {market.options[selectedOption]?.count > 0
                        ? `1/${market.options[selectedOption].count + 1}`
                        : "1/1"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Current Odds</span>
                    <span className="text-white font-semibold">
                      {formatPercentage(market.options[selectedOption]?.percentage || 0)}
                    </span>
                  </div>
                </div>

                {/* Trade button */}
                <button
                  onClick={handleSubmitPrediction}
                  disabled={!canTrade || !tradeAmount || parseFloat(tradeAmount) <= 0 || submitting}
                  className="w-full py-4 bg-gradient-to-r from-cosmic-purple to-cosmic-blue rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-cosmic-blue/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {submitting ? "Submitting..." : "Submit Prediction"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}