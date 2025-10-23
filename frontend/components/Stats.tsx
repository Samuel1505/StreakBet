"use client";

import StatCard from "./StatCard";
import { BarChart3, Users, Globe } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      icon: BarChart3,
      value: "1,000+",
      label: "Market Created",
      gradient: "from-cosmic-purple to-cosmic-blue"
    },
    {
      icon: Users,
      value: "10M+",
      label: "Trusted User",
      gradient: "from-cosmic-blue to-cyan-500"
    },
    {
      icon: Globe,
      value: "195",
      label: "Countries Supported",
      gradient: "from-cyan-500 to-cosmic-purple"
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-cosmic-dark overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cosmic-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cosmic-blue/10 rounded-full blur-3xl" />
      
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