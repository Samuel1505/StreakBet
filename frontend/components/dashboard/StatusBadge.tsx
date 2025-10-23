"use client";

import type { BetStatus } from "@/app/dashboard/types";

interface StatusBadgeProps {
  status: BetStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "Winning":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Losing":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Ended":
        return "bg-text-muted/20 text-text-muted border-text-muted/30";
      case "Active":
        return "bg-cosmic-blue/20 text-cosmic-blue border-cosmic-blue/30";
      default:
        return "bg-white/5 text-white border-white/10";
    }
  };

  return (
    <span
      className={`inline-flex px-4 py-1.5 rounded-full text-xs font-semibold border ${getStatusStyles()}`}
    >
      {status}
    </span>
  );
}