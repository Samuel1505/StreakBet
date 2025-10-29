"use client";

import type { LeaderboardEntry } from "@/app/leaderboard/types";
import LeaderboardRow from "./LeaderboardRow";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export default function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-white/10">
        <div className="col-span-2 text-text-muted text-sm font-semibold">Rank</div>
        <div className="col-span-6 text-text-muted text-sm font-semibold">Wallet / ENS</div>
        <div className="col-span-4 text-text-muted text-sm font-semibold text-right">Points</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-white/10">
        {entries.map((entry) => (
          <LeaderboardRow key={entry.rank} entry={entry} maxPoints={entries[0].points} />
        ))}
      </div>
    </div>
  );
}