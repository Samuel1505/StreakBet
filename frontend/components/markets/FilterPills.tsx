"use client";

import type { MarketFilter } from "@/app/markets/types";

interface FilterPillsProps {
  selectedFilter: MarketFilter;
  onFilterChange: (filter: MarketFilter) => void;
}

const filters: MarketFilter[] = ["Popular", "Closing Soon", "Highest volume", "Newest"];

export default function FilterPills({ selectedFilter, onFilterChange }: FilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedFilter === filter
              ? "bg-cosmic-blue text-white shadow-lg shadow-cosmic-blue/30"
              : "bg-white/5 text-text-muted border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}