"use client";

import { Medal } from "lucide-react";

interface RankBadgeProps {
  rank: number;
}

export default function RankBadge({ rank }: RankBadgeProps) {
  const getMedalColor = () => {
    switch (rank) {
      case 1:
        return "text-yellow-400"; // Gold
      case 2:
        return "text-gray-300"; // Silver
      case 3:
        return "text-orange-400"; // Bronze
      default:
        return null;
    }
  };

  const medalColor = getMedalColor();

  if (medalColor) {
    return (
      <div className="flex items-center gap-2">
        <Medal className={`w-6 h-6 ${medalColor}`} />
        <span className={`text-lg font-bold ${medalColor}`}>{rank}</span>
      </div>
    );
  }

  return (
    <span className="text-lg font-semibold text-white">{rank}</span>
  );
}