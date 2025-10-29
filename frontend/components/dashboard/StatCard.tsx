"use client";

import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  iconColor: string;
  iconBgColor: string;
  subtitle?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  iconColor,
  iconBgColor,
  subtitle,
}: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-text-muted text-sm mb-2">{title}</p>
          <p className="text-white text-2xl md:text-3xl font-bold">{value}</p>
        </div>
        <div className={`${iconBgColor} ${iconColor} p-3 rounded-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}