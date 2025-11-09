"use client";

import { Clock, Users, TrendingUp, Trophy } from "lucide-react";
import Link from "next/link";

interface BetCardProps {
  id: string;
  question: string;
  selectedOption: string;
  entryFee: string;
  endTime: Date;
  status: "active" | "closed" | "won" | "lost";
  prizeAmount?: string;
  claimed?: boolean;
  totalParticipants: number;
}

export default function BetCard({
  id,
  question,
  selectedOption,
  entryFee,
  endTime,
  status,
  prizeAmount,
  claimed,
  totalParticipants,
}: BetCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "active":
        return {
          label: "Active",
          bgColor: "bg-emerald-500/20",
          textColor: "text-emerald-400",
          borderColor: "border-emerald-500/30",
          icon: TrendingUp,
        };
      case "closed":
        return {
          label: "Closed",
          bgColor: "bg-yellow-500/20",
          textColor: "text-yellow-400",
          borderColor: "border-yellow-500/30",
          icon: Clock,
        };
      case "won":
        return {
          label: "Won",
          bgColor: "bg-green-500/20",
          textColor: "text-green-400",
          borderColor: "border-green-500/30",
          icon: Trophy,
        };
      case "lost":
        return {
          label: "Lost",
          bgColor: "bg-red-500/20",
          textColor: "text-red-400",
          borderColor: "border-red-500/30",
          icon: Clock,
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <Link href={`/markets/${id}`}>
      <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1 cursor-pointer overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 to-cosmic-blue/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-2xl pointer-events-none" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 pr-4">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cosmic-blue transition-colors duration-300 line-clamp-2">
                {question}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-text-muted text-sm">Your prediction:</span>
                <span className="px-3 py-1 rounded-full bg-cosmic-purple/20 text-cosmic-purple font-semibold text-sm border border-cosmic-purple/30">
                  {selectedOption}
                </span>
              </div>
            </div>
            
            {/* Status badge */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bgColor} ${statusConfig.textColor} border ${statusConfig.borderColor} text-sm font-semibold whitespace-nowrap`}>
              <StatusIcon className="w-4 h-4" />
              <span>{statusConfig.label}</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cosmic-blue" />
              <span className="font-medium">{entryFee} ETH</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{totalParticipants} participants</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>
                {status === "active" 
                  ? `Closes ${endTime.toLocaleDateString()}`
                  : `Closed ${endTime.toLocaleDateString()}`
                }
              </span>
            </div>
          </div>

          {/* Prize info for won bets */}
          {status === "won" && prizeAmount && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-semibold">
                    Prize: {prizeAmount} ETH
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  claimed 
                    ? "bg-green-500/20 text-green-400" 
                    : "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {claimed ? "✓ Claimed" : "⏳ Pending"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}