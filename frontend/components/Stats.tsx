"use client";

import StatCard from "./StatCard";
import { BarChart3, Users, Globe } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      icon: BarChart3,
      value: "1,000+",
      label: "Markets Created",
      gradient: "from-accent to-primary-light"
    },
    {
      icon: Users,
      value: "10M+",
      label: "Trusted Users",
      gradient: "from-primary-light to-cyan"
    },
    {
      icon: Globe,
      value: "195",
      label: "Countries Supported",
      gradient: "from-cyan to-teal-light"
    }
  ];

  return (
    <section className="relative py-32 px-6 bg-background-lighter overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-gradient opacity-60" />
      
      {/* Animated orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan/10 rounded-full blur-3xl animate-pulse-glow delay-1000" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              gradient={stat.gradient}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}