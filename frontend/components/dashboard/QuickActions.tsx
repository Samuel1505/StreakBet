"use client";

import { Plus, Gift, Download } from "lucide-react";
import Link from "next/link";

interface QuickActionsProps {
  unclaimedPrizes: number;
  onExport: () => void;
  onClaimAll?: () => void;
}

export default function QuickActions({ unclaimedPrizes, onExport, onClaimAll }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {/* Create Market */}
      <Link href="/create">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cosmic-purple to-cosmic-blue rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all hover:scale-105">
          <Plus className="w-4 h-4" />
          <span>Create Market</span>
        </button>
      </Link>

      {/* Claim All Prizes */}
      {unclaimedPrizes > 0 && (
        <button
          onClick={onClaimAll}
          className="relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg text-green-400 font-semibold hover:bg-green-500/30 transition-all hover:scale-105"
        >
          <Gift className="w-4 h-4" />
          <span>Claim All Prizes</span>
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {unclaimedPrizes}
          </span>
        </button>
      )}

      {/* Export Data */}
      <button
        onClick={onExport}
        className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all"
      >
        <Download className="w-4 h-4" />
        <span>Export Data</span>
      </button>
    </div>
  );
}