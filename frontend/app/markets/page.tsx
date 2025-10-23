"use client";

import { useState } from "react";
import Header from "@/components/Header";
import FilterPills from "@/components/markets/FilterPills";
import MarketListCard from "@/components/markets/MarketListCard";
import { marketsMockData } from "./marketsMockData";
import type { MarketFilter } from "./types";

export default function MarketsPage() {
  const [selectedFilter, setSelectedFilter] = useState<MarketFilter>("Popular");

  const handleFilterChange = (filter: MarketFilter) => {
    setSelectedFilter(filter);
  };

  // Filter markets based on selected filter
  const filteredMarkets = [...marketsMockData.markets].sort((a, b) => {
    switch (selectedFilter) {
      case "Closing Soon":
        return a.closingDate.getTime() - b.closingDate.getTime();
      case "Highest volume":
        return b.volume - a.volume;
      case "Newest":
        return b.id.localeCompare(a.id);
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
              Explore and participate in various prediction market
            </p>
          </div>

          {/* Filter Pills */}
          <FilterPills
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
          />

          {/* Market List */}
          <div className="mt-8 space-y-6">
            {filteredMarkets.map((market) => (
              <MarketListCard key={market.id} market={market} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}