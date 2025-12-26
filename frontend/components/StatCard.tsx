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
      {/* Enhanced glow effect */}
      <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500 rounded-3xl scale-95 group-hover:scale-105`} />
      
      {/* Card content with glass effect */}
      <div className="relative glass-strong rounded-3xl p-10 transition-all duration-300 group-hover:border-white/25 hover:transform hover:scale-105 hover:-translate-y-2 shadow-xl">
        {/* Icon with enhanced gradient */}
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
          <Icon className="w-10 h-10 text-white" />
        </div>
        
        {/* Stats with better hierarchy */}
        <div className="space-y-3">
          <div className="text-5xl md:text-6xl font-bold text-white text-glow-accent">
            {value}
          </div>
          <div className="text-text-muted text-base md:text-lg font-medium">
            {label}
          </div>
        </div>
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-3xl rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}