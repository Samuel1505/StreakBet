"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import FilterPills from "@/components/markets/FilterPills";
import MarketListCard from "@/components/markets/MarketListCard";
import type { MarketFilter } from "./types";
import { PrizePredictionContract } from "../../app/ABIs/index";
import PrizePoolPredictionABI from "../../app/ABIs/Prediction.json";

// Type matching MarketListCard expectations
interface Market {
  id: string;
  question: string;
  image: string;
  yesPercentage: number;
  noPercentage: number;
  participants: number;
  volume: number;
  closingDate: Date;
  status: "active" | "closed" | "resolved";
  category: "Crypto" | "Sports" | "Politics" | "Entertainment";
  options?: Array<{
    label: string;
    percentage: number;
  }>;
}

interface BlockchainMarket extends Market {
  entryFee: string;
  prizePool: string;
  endTime: Date;
  resolutionTime: Date;
  resolved: boolean;
  winningOption: number;
  active: boolean;
  creator: string;
  totalParticipants: number;
}

export default function MarketsPage() {
  const searchParams = useSearchParams();
  const newId = searchParams.get("newId");
  
  const [selectedFilter, setSelectedFilter] = useState<MarketFilter>("Popular");
  const [markets, setMarkets] = useState<BlockchainMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [highlightId, setHighlightId] = useState<string | null>(newId);

  useEffect(() => {
    fetchMarkets();
    
    // Clear highlight after 3 seconds
    if (newId) {
      setTimeout(() => setHighlightId(null), 3000);
    }
  }, [newId]);

  const fetchMarkets = async () => {
    try {
      setLoading(true);
      setError("");

      // Check if MetaMask is available
      if (typeof window.ethereum === "undefined") {
        setError("Please install MetaMask to view markets");
        setLoading(false);
        return;
      }

      // Connect to provider (read-only)
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const contract = new ethers.Contract(
        PrizePredictionContract.address,
        PrizePoolPredictionABI.abi,
        provider
      );

      // Get the total number of predictions
      const predictionCounter = await contract.predictionCounter();
      const totalPredictions = Number(predictionCounter);

      console.log("Total predictions:", totalPredictions);

      if (totalPredictions === 0) {
        setMarkets([]);
        setLoading(false);
        return;
      }

      // Fetch all predictions with their option stats
      const marketPromises: Promise<BlockchainMarket | null>[] = [];
      for (let i = 1; i <= totalPredictions; i++) {
        marketPromises.push(fetchPredictionWithStats(contract, i));
      }

      const allMarkets = await Promise.all(marketPromises);
      const validMarkets = allMarkets.filter((m): m is BlockchainMarket => m !== null);

      console.log("Fetched markets:", validMarkets);
      setMarkets(validMarkets);
    } catch (err) {
      console.error("Error fetching markets:", err);
      setError("Failed to load markets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPredictionWithStats = async (
    contract: ethers.Contract,
    id: number
  ): Promise<BlockchainMarket | null> => {
    try {
      // Fetch prediction details
      const prediction = await contract.getPrediction(id);
      
      // Fetch option statistics
      const optionStats = await contract.getAllOptionStats(id);
      const counts = optionStats.counts;
      const percentages = optionStats.percentages;

      // Format options with their percentages
      const options = prediction.options.map((optionLabel: string, idx: number) => ({
        label: optionLabel,
        percentage: Number(percentages[idx]) / 100, // Convert from basis points to percentage
      }));

      const prizePool = ethers.formatEther(prediction.prizePool);
      const totalParticipants = Number(prediction.totalParticipants);
      
      // Calculate yes/no percentages (for binary markets)
      const yesPercentage = options.length > 0 ? options[0].percentage : 0;
      const noPercentage = options.length > 1 ? options[1].percentage : 0;
      
      // Determine status
      const endTime = new Date(Number(prediction.endTime) * 1000);
      const now = new Date();
      let status: "active" | "closed" | "resolved";
      if (prediction.resolved) {
        status = "resolved";
      } else if (now > endTime) {
        status = "closed";
      } else {
        status = "active";
      }
      
      const market: BlockchainMarket = {
        // Required Market fields
        id: prediction.id.toString(),
        question: prediction.question,
        image: "/default-thumbnail.png",
        yesPercentage,
        noPercentage,
        participants: totalParticipants,
        volume: parseFloat(prizePool),
        closingDate: endTime,
        status,
        category: "Crypto" as const,
        options,
        // Additional BlockchainMarket fields
        entryFee: ethers.formatEther(prediction.entryFee),
        prizePool,
        endTime,
        resolutionTime: new Date(Number(prediction.resolutionTime) * 1000),
        resolved: prediction.resolved,
        winningOption: Number(prediction.winningOption),
        active: prediction.active,
        creator: prediction.creator,
        totalParticipants,
      };
      
      return market;
    } catch (err) {
      console.error(`Error fetching prediction ${id}:`, err);
      return null;
    }
  };

  const handleFilterChange = (filter: MarketFilter) => {
    setSelectedFilter(filter);
  };

  // Filter and sort markets based on selected filter
  const filteredMarkets = [...markets]
    .filter((market) => market.status === "active") // Only show active markets
    .sort((a, b) => {
      switch (selectedFilter) {
        case "Closing Soon":
          return a.closingDate.getTime() - b.closingDate.getTime();
        case "Highest volume":
          return b.volume - a.volume;
        case "Newest":
          return parseInt(b.id) - parseInt(a.id);
        case "Popular":
        default:
          return b.participants - a.participants;
      }
    });

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
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 text-glow">
              Markets
            </h1>
            <p className="text-text-muted text-lg">
              Explore and participate in various prediction markets
            </p>
          </div>

          {/* Success Message for New Market */}
          {newId && highlightId && (
            <div className="mb-6 bg-green-500/20 border border-green-500 text-green-300 p-4 rounded-lg animate-pulse">
              ✅ Market created successfully! ID: {newId}
            </div>
          )}

          {/* Filter Pills */}
          <FilterPills
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
          />

          {/* Error Message */}
          {error && (
            <div className="mt-8 bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="mt-8 text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cosmic-purple"></div>
              <p className="text-text-muted mt-4">Loading markets from blockchain...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredMarkets.length === 0 && (
            <div className="mt-8 text-center py-12">
              <div className="text-6xl mb-4">🔮</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {markets.length === 0 ? "No markets yet" : "No active markets"}
              </h3>
              <p className="text-text-muted mb-6">
                {markets.length === 0 
                  ? "Be the first to create a prediction market!" 
                  : "All markets are currently resolved or inactive"}
              </p>
              <a
                href="/create"
                className="inline-block px-6 py-3 bg-gradient-to-r from-cosmic-purple to-cosmic-blue rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all"
              >
                Create Market
              </a>
            </div>
          )}

          {/* Market List */}
          {!loading && !error && filteredMarkets.length > 0 && (
            <>
              <div className="mt-8 space-y-6">
                {filteredMarkets.map((market) => (
                  <div
                    key={market.id}
                    className={`transition-all duration-300 ${
                      highlightId === market.id 
                        ? "ring-2 ring-cosmic-purple shadow-lg shadow-cosmic-purple/50" 
                        : ""
                    }`}
                  >
                    <MarketListCard market={market} />
                  </div>
                ))}
              </div>

              {/* Stats Summary */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-cosmic-purple mb-2">
                    {markets.length}
                  </div>
                  <div className="text-text-muted text-sm">Total Markets</div>
                </div>
                <div className="bg-cosmic-blue/10 border border-cosmic-blue/30 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-cosmic-blue mb-2">
                    {filteredMarkets.length}
                  </div>
                  <div className="text-text-muted text-sm">Active Markets</div>
                </div>
                <div className="bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-cosmic-purple mb-2">
                    {filteredMarkets.reduce((sum, m) => sum + m.participants, 0)}
                  </div>
                  <div className="text-text-muted text-sm">Total Participants</div>
                </div>
              </div>
            </>
          )}

          {/* Refresh Button */}
          {!loading && (
            <div className="mt-8 text-center">
              <button
                onClick={fetchMarkets}
                disabled={loading}
                className="px-6 py-2 bg-cosmic-purple/20 hover:bg-cosmic-purple/30 border border-cosmic-purple/50 rounded-lg text-cosmic-purple font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Refreshing..." : "🔄 Refresh Markets"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}