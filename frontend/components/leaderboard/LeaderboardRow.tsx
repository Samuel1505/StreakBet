"use client";

import type { LeaderboardEntry } from "@/app/leaderboard/types";
import RankBadge from "./RankBadge";
import PointsDisplay from "./PointsDisplay";
import { truncateAddress } from "@/app/leaderboard/utils";

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  maxPoints: number;
}

export default function LeaderboardRow({ entry, maxPoints }: LeaderboardRowProps) {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-white/5 transition-colors">
      {/* Rank */}
      <div className="col-span-2 flex items-center">
        <RankBadge rank={entry.rank} />
      </div>

      {/* Wallet / ENS */}
      <div className="col-span-6 flex items-center">
        <div>
          {entry.ensName ? (
            <>
              <div className="text-white font-medium">{entry.ensName}</div>
              <div className="text-text-muted text-xs font-mono">
                {truncateAddress(entry.wallet)}
              </div>
            </>
          ) : (
            <div className="text-white font-mono">{truncateAddress(entry.wallet)}</div>
          )}
        </div>
      </div>

      {/* Points */}
      <div className="col-span-4 flex items-center justify-end">
        <PointsDisplay points={entry.points} maxPoints={maxPoints} />
      </div>
    </div>
  );
}