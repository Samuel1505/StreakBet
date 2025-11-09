"use client";

import type { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface EnhancedStatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  iconColor: string;
  iconBgColor: string;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient?: string;
}

export default function EnhancedStatCard({
  title,
  value,
  icon,
  iconColor,
  iconBgColor,
  subtitle,
  trend,
  gradient = "from-cosmic-purple to-cosmic-blue",
}: EnhancedStatCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden">
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-2xl pointer-events-none`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-text-muted text-sm mb-2 font-medium">{title}</p>
            <p className="text-white text-3xl md:text-4xl font-bold text-glow mb-1">
              {value}
            </p>
            {subtitle && (
              <p className="text-text-muted text-xs">{subtitle}</p>
            )}
          </div>
          <div className={`${iconBgColor} ${iconColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend.isPositive ? "text-emerald-400" : "text-red-400"
          }`}>
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(trend.value)}% vs last month</span>
          </div>
        )}
      </div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cosmic-purple/10 to-transparent rounded-bl-3xl rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}