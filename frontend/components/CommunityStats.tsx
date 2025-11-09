"use client";

import { TrendingUp, DollarSign, Activity, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
  change: string;
  isPositive: boolean;
}

export default function CommunityStats() {
  const stats: Stat[] = [
    {
      icon: DollarSign,
      value: "$50M+",
      label: "Total Volume Traded",
      change: "+25%",
      isPositive: true
    },
    {
      icon: Activity,
      value: "500K+",
      label: "Active Predictions",
      change: "+18%",
      isPositive: true
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Accuracy Rate",
      change: "+5%",
      isPositive: true
    },
    {
      icon: Award,
      value: "$2M+",
      label: "Rewards Distributed",
      change: "+32%",
      isPositive: true
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-cosmic-dark overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cosmic-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cosmic-blue/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-glow">
            Platform Statistics
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Real-time metrics showcasing our growing community and platform success
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cosmic-purple to-cosmic-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              
              {/* Value */}
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 text-glow">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-text-muted text-sm mb-3">
                {stat.label}
              </div>
              
              {/* Change indicator */}
              <div className={`inline-flex items-center gap-1 text-xs font-medium ${
                stat.isPositive ? "text-emerald-400" : "text-red-400"
              }`}>
                <TrendingUp className={`w-4 h-4 ${!stat.isPositive && "rotate-180"}`} />
                <span>{stat.change} this month</span>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple to-cosmic-blue opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <p className="text-text-muted text-sm">
            Updated in real-time • Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </section>
  );
}