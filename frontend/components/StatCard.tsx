"use client";

import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  gradient: string;
  delay?: number;
}

export default function StatCard({ icon: Icon, value, label, gradient, delay = 0 }: StatCardProps) {
  return (
    <div 
      className="group relative"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl`} />
      
      {/* Card content */}
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10 group-hover:transform group-hover:scale-105">
        {/* Icon with gradient background */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        {/* Stats */}
        <div className="space-y-2">
          <div className="text-4xl md:text-5xl font-bold text-white text-glow">
            {value}
          </div>
          <div className="text-text-muted text-sm md:text-base">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}