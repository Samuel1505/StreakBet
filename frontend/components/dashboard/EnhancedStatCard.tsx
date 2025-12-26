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
  gradient = "from-accent to-primary-light",
}: EnhancedStatCardProps) {
  return (
    <div className="group relative glass-strong rounded-3xl p-8 hover:border-white/25 transition-all duration-300 hover:transform hover:scale-105 hover:-translate-y-2 overflow-hidden shadow-xl">
      {/* Enhanced glow effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-3xl pointer-events-none`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-text-secondary text-sm mb-3 font-semibold uppercase tracking-wide">{title}</p>
            <p className="text-white text-3xl md:text-4xl font-bold text-glow-accent mb-2">
              {value}
            </p>
            {subtitle && (
              <p className="text-text-muted text-xs">{subtitle}</p>
            )}
          </div>
          <div className={`${iconBgColor} ${iconColor} p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
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
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-3xl rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}