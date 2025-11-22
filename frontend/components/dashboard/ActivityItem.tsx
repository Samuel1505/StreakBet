"use client";

import { TrendingUp, Trophy, TrendingDown, AlertCircle } from "lucide-react";
import type { RecentActivity } from "@/app/dashboard/types";
import { formatCurrency, formatTimeAgo } from "@/app/dashboard/utils";

interface ActivityItemProps {
  activity: RecentActivity;
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  const getActivityConfig = () => {
    switch (activity.type) {
      case "bet_placed":
        return {
          text: "Bet Placed",
          icon: TrendingUp,
          bgColor: "bg-cosmic-blue/20",
          iconColor: "text-cosmic-blue",
          amountColor: "text-cosmic-blue"
        };
      case "bet_won":
        return {
          text: "Bet Won",
          icon: Trophy,
          bgColor: "bg-green-500/20",
          iconColor: "text-green-400",
          amountColor: "text-green-400"
        };
      case "bet_lost":
        return {
          text: "Bet Lost",
          icon: TrendingDown,
          bgColor: "bg-red-500/20",
          iconColor: "text-red-400",
          amountColor: "text-red-400"
        };
      case "market_resolved":
        return {
          text: "Market Resolved",
          icon: AlertCircle,
          bgColor: "bg-yellow-500/20",
          iconColor: "text-yellow-400",
          amountColor: "text-yellow-400"
        };
      default:
        return {
          text: "Activity",
          icon: TrendingUp,
          bgColor: "bg-cosmic-purple/20",
          iconColor: "text-cosmic-purple",
          amountColor: "text-cosmic-purple"
        };
    }
  };

  const config = getActivityConfig();
  const Icon = config.icon;

  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
      <div className="flex gap-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1.5">
            <h4 className="text-white font-semibold text-sm">{config.text}</h4>
            <span className={`${config.amountColor} font-bold text-sm whitespace-nowrap ml-2`}>
              {activity.type === "bet_won" ? "+" : activity.type === "bet_lost" ? "-" : ""}
              {formatCurrency(activity.amount, activity.currency)}
            </span>
          </div>
          <p className="text-text-muted text-sm mb-2 line-clamp-2">
            {activity.marketQuestion}
          </p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-cosmic-purple/20 text-cosmic-purple text-xs font-medium">
              {activity.position}
            </span>
            <span className="text-text-muted text-xs">
              {formatTimeAgo(activity.timestamp)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}