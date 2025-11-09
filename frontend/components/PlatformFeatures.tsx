"use client";

import { Shield, Zap, Users, TrendingUp, Lock, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

export default function PlatformFeatures() {
  const features: Feature[] = [
    {
      icon: Shield,
      title: "Audited Smart Contracts",
      description: "Our smart contracts are audited by leading security firms to ensure your funds are always safe and secure.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience instant transactions and real-time market updates with our optimized blockchain infrastructure.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a thriving community of predictors and market creators from around the world.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: TrendingUp,
      title: "Transparent Analytics",
      description: "Access detailed market analytics, historical data, and performance metrics for informed decisions.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Lock,
      title: "Non-Custodial",
      description: "You maintain full control of your assets. We never hold your funds - everything is managed by smart contracts.",
      gradient: "from-red-500 to-rose-500"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Participate from anywhere in the world, 24/7. No geographical restrictions or limitations.",
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-cosmic-dark overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 cosmic-gradient opacity-30" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-cosmic-purple/5 rounded-full blur-3xl animate-pulse" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-glow">
            Platform Features
          </h2>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            Built with cutting-edge technology to provide the best prediction market experience
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cosmic-blue transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-text-muted leading-relaxed text-sm">
                {feature.description}
              </p>
              
              {/* Hover glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-2xl pointer-events-none`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}