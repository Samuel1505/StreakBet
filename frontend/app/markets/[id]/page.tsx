"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Image from "next/image";
import { ThumbsUp, ThumbsDown, ArrowLeft, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { marketDetailsMockData } from "../marketsMockData";
import { formatTimeRemaining, formatPercentage, formatVolume } from "../utils";

export default function MarketDetailPage() {
  const params = useParams();
  const marketId = params.id as string;
  const market = marketDetailsMockData[marketId];

  const [tradeAmount, setTradeAmount] = useState("");
  const [tradeType, setTradeType] = useState<"yes" | "no">("yes");

  if (!market) {
    return (
      <div className="min-h-screen bg-cosmic-dark flex items-center justify-center">
        <div className="text-white text-xl">Market not found</div>
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
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={market.image}
                      alt={market.question}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {market.question}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-text-muted">
                      <span>{formatTimeRemaining(market.closingDate)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {market.participants} participants
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {formatVolume(market.volume)} volume
                      </span>
                    </div>
                  </div>
                </div>

                {/* Voting indicators */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 flex items-center gap-3 px-5 py-3 rounded-xl bg-green-500/20 border border-green-500/30">
                    <ThumbsUp className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-semibold">Yes</span>
                    <span className="text-green-400 text-lg font-bold ml-auto">
                      {formatPercentage(market.yesPercentage)}
                    </span>
                  </div>

                  <div className="flex-1 flex items-center gap-3 px-5 py-3 rounded-xl bg-red-500/20 border border-red-500/30">
                    <ThumbsDown className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 font-semibold">No</span>
                    <span className="text-red-400 text-lg font-bold ml-auto">
                      {formatPercentage(market.noPercentage)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Description</h2>
                <p className="text-text-muted leading-relaxed">{market.description}</p>
              </div>

              {/* Market details */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Market Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-text-muted">Resolution Source:</span>
                    <span className="text-white text-right max-w-md">
                      {market.resolutionSource}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-text-muted">Underlying Asset:</span>
                    <span className="text-white">{market.underlyingAsset}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-text-muted">Created By:</span>
                    <span className="text-white font-mono">{market.createdBy}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-text-muted">Total Liquidity:</span>
                    <span className="text-white">{formatVolume(market.totalLiquidity)}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-text-muted">Closing Date:</span>
                    <span className="text-white">
                      {market.closingDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Trading interface */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Place Trade</h2>

                {/* Trade type selector */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => setTradeType("yes")}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      tradeType === "yes"
                        ? "bg-green-500/30 border-2 border-green-500 text-green-400"
                        : "bg-white/5 border border-white/10 text-text-muted hover:bg-white/10"
                    }`}
                  >
                    Buy Yes
                  </button>
                  <button
                    onClick={() => setTradeType("no")}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      tradeType === "no"
                        ? "bg-red-500/30 border-2 border-red-500 text-red-400"
                        : "bg-white/5 border border-white/10 text-text-muted hover:bg-white/10"
                    }`}
                  >
                    Buy No
                  </button>
                </div>

                {/* Amount input */}
                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-text-muted/50 focus:outline-none focus:border-cosmic-blue/50 focus:bg-white/10 transition-all"
                  />
                </div>

                {/* Potential return */}
                <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-text-muted text-sm">Potential Return</span>
                    <span className="text-white font-semibold">
                      {tradeAmount ? `$${(parseFloat(tradeAmount) * 1.85).toFixed(2)}` : "$0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Average Price</span>
                    <span className="text-white font-semibold">
                      {tradeType === "yes"
                        ? formatPercentage(market.yesPercentage)
                        : formatPercentage(market.noPercentage)}
                    </span>
                  </div>
                </div>

                {/* Trade button */}
                <button
                  className="w-full py-4 bg-gradient-to-r from-cosmic-purple to-cosmic-blue rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-cosmic-blue/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={!tradeAmount || parseFloat(tradeAmount) <= 0}
                >
                  Confirm Trade
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}