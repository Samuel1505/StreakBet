"use client";

import { Search, Filter, ArrowUpDown } from "lucide-react";

export type BetStatusFilter = "all" | "active" | "closed" | "won" | "lost";
export type BetSortOption = "newest" | "oldest" | "highest" | "lowest";

interface BetHistoryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: BetStatusFilter;
  onStatusFilterChange: (filter: BetStatusFilter) => void;
  sortOption: BetSortOption;
  onSortChange: (sort: BetSortOption) => void;
  resultsCount: number;
}

export default function BetHistoryFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortOption,
  onSortChange,
  resultsCount,
}: BetHistoryFiltersProps) {
  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type="text"
          placeholder="Search bets by question..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder:text-text-muted focus:outline-none focus:border-cosmic-blue/50 focus:bg-white/10 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-muted" />
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value as BetStatusFilter)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cosmic-blue/50 cursor-pointer hover:bg-white/10 transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-text-muted" />
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as BetSortOption)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cosmic-blue/50 cursor-pointer hover:bg-white/10 transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-text-muted text-sm">
          {resultsCount} {resultsCount === 1 ? "bet" : "bets"} found
        </div>
      </div>
    </div>
  );
}