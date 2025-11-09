"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import StarIcon from "./StarIcon";

export default function CTASection() {
  return (
    <section className="relative py-32 px-6 bg-cosmic-dark overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 cosmic-gradient" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-cosmic-purple/20 to-cosmic-blue/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Decorative stars */}
      <StarIcon 
        size={24} 
        className="absolute top-12 left-12 text-white/40 animate-pulse"
      />
      <StarIcon 
        size={20} 
        className="absolute top-24 right-24 text-white/30 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
      <StarIcon 
        size={18} 
        className="absolute bottom-12 left-1/4 text-white/40 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
          <Sparkles className="w-4 h-4 text-cosmic-blue" />
          <span className="text-sm text-white font-medium">Start Earning Today</span>
        </div>
        
        {/* Heading */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-glow leading-tight">
          Ready to Predict
          <br />
          the Future?
        </h2>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
          Join thousands of users already earning rewards through accurate predictions. 
          Connect your wallet and start your journey in decentralized prediction markets today.
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/create"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cosmic-purple to-cosmic-blue text-white font-semibold text-lg hover:shadow-2xl hover:shadow-cosmic-purple/50 transition-all duration-300 hover:scale-105"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          
          <Link 
            href="/markets"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300"
          >
            <span>Explore Markets</span>
          </Link>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-text-muted text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Audited Smart Contracts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Non-Custodial Platform</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}