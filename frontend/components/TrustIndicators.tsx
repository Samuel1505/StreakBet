"use client";

import { Shield, CheckCircle, Award, Lock } from "lucide-react";

export default function TrustIndicators() {
  const indicators = [
    {
      icon: Shield,
      title: "Security Audited",
      description: "Certified by CertiK"
    },
    {
      icon: CheckCircle,
      title: "Fully Decentralized",
      description: "100% On-Chain"
    },
    {
      icon: Award,
      title: "Industry Leader",
      description: "Top Rated Platform"
    },
    {
      icon: Lock,
      title: "Secure Transactions",
      description: "256-bit Encryption"
    }
  ];

  return (
    <section className="relative py-16 px-6 bg-cosmic-dark border-t border-white/10">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {indicators.map((indicator, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cosmic-purple/20 to-cosmic-blue/20 mb-3 group-hover:scale-110 transition-transform duration-300">
                <indicator.icon className="w-6 h-6 text-cosmic-blue" />
              </div>
              <div className="text-white font-semibold text-sm mb-1">
                {indicator.title}
              </div>
              <div className="text-text-muted text-xs">
                {indicator.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}