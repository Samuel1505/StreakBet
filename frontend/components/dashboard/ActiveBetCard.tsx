"use client";

import { Clock } from "lucide-react";
import Link from "next/link";
import type { ActiveBet } from "@/app/dashboard/types";
import { formatCurrency, formatPercentage } from "@/app/dashboard/utils";
import StatusBadge from "./StatusBadge";

interface ActiveBetCardProps {
  bet: ActiveBet;
}

export default function ActiveBetCard({ bet }: ActiveBetCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all">
      {/* Header with status and ended indicator */}
      <div className="flex items-center justify-between mb-4">
        <StatusBadge status={bet.status} />
        {bet.isEnded && (
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <Clock className="w-4 h-4" />
            <span>Ended</span>
          </div>
        )}
      </div>

      {/* Question */}
      <h3 className="text-white text-lg font-semibold mb-6">{bet.question}</h3>

      {/* Bet details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-text-muted text-sm">Your Bet</span>
          <span className="text-white font-semibold">
            {bet.userBet.position} - {formatCurrency(bet.userBet.amount, bet.userBet.currency)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-muted text-sm">Current Odds</span>
          <span className="text-white font-semibold">
            {formatPercentage(bet.currentOdds)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-muted text-sm">Potential Payout</span>
          <span className="text-green-400 font-bold">
            {formatCurrency(bet.potentialPayout, bet.userBet.currency)}
          </span>
        </div>
      </div>

      {/* View Market button */}
      <Link href={`/markets/${bet.marketId}`}>
        <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all">
          View Market
        </button>
      </Link>
    </div>
  );
}