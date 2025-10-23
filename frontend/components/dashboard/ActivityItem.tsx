"use client";

import { Circle } from "lucide-react";
import type { RecentActivity } from "@/app/dashboard/types";
import { formatCurrency, formatTimeAgo } from "@/app/dashboard/utils";

interface ActivityItemProps {
  activity: RecentActivity;
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  const getActivityText = () => {
    switch (activity.type) {
      case "bet_placed":
        return "Bet Placed";
      case "bet_won":
        return "Bet Won";
      case "bet_lost":
        return "Bet Lost";
      case "market_resolved":
        return "Market Resolved";
      default:
        return "Activity";
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all">
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-cosmic-purple/20 flex items-center justify-center">
            <Circle className="w-5 h-5 text-cosmic-purple fill-cosmic-purple" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-white font-semibold text-sm">{getActivityText()}</h4>
            <span className="text-cosmic-blue font-bold text-sm whitespace-nowrap ml-2">
              {formatCurrency(activity.amount, activity.currency)}
            </span>
          </div>
          <p className="text-text-muted text-sm mb-2 line-clamp-2">
            {activity.marketQuestion} - {activity.position}
          </p>
          <p className="text-text-muted text-xs">
            {formatTimeAgo(activity.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
}