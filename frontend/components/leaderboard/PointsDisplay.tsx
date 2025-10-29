"use client";

import { formatPoints } from "@/app/leaderboard/utils";

interface PointsDisplayProps {
  points: number;
  maxPoints: number;
}

export default function PointsDisplay({ points, maxPoints }: PointsDisplayProps) {
  const percentage = (points / maxPoints) * 100;

  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-end gap-2 mb-1">
        <span className="text-white font-bold text-lg">{formatPoints(points)}</span>
        <span className="text-xl">🔥</span>
      </div>
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cosmic-purple to-cosmic-blue rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}