"use client";

import FloatingToken from "./FloatingToken";
import StarIcon from "./StarIcon";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background noise-texture">
      {/* Aurora gradient background */}
      <div className="absolute inset-0 aurora-gradient" />
      
      {/* Animated mesh gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan/20 rounded-full blur-3xl animate-pulse-glow delay-1000" />
      </div>
      
      {/* Floating tokens */}
      <FloatingToken 
        src="/eth.png" 
        alt="Ethereum" 
        size={80}
        className="top-[15%] left-[15%] opacity-80"
      />
      <FloatingToken 
        src="/solana.png" 
        alt="Solana" 
        size={70}
        className="top-[25%] right-[12%] opacity-70"
      />
      <FloatingToken 
        src="/punk.png" 
        alt="NFT Punk" 
        size={90}
        className="bottom-[30%] left-[10%] opacity-75"
      />
      <FloatingToken 
        src="/r.png" 
        alt="Token" 
        size={75}
        className="bottom-[20%] right-[45%] opacity-80"
      />
      
      {/* Decorative stars with enhanced glow */}
      <StarIcon 
        size={20} 
        className="absolute top-[20%] left-[50%] text-accent-bright animate-pulse-glow"
      />
      <StarIcon 
        size={16} 
        className="absolute bottom-[35%] right-[15%] text-cyan-light animate-pulse-glow delay-500"
      />
      <StarIcon 
        size={14} 
        className="absolute top-[40%] right-[25%] text-primary-light animate-pulse-glow delay-1000"
      />
      
      {/* Hero content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="inline-block mb-6">
          <div className="glass px-6 py-2 rounded-full border border-accent/30">
            <span className="text-accent-bright text-sm font-semibold tracking-wide">🚀 Powered by Blockchain</span>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold text-white leading-[1.1] mb-8 text-glow-accent">
          Predict the Future
          <br />
          <span className="bg-gradient-to-r from-accent-bright via-cyan-light to-primary-light bg-clip-text text-transparent">
            of Crypto
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-text-muted max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          Join the leading platform for crypto prediction markets. Use your knowledge to forecast digital assets and earn rewards.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="/markets"
            className="group relative px-10 py-5 gradient-accent rounded-full font-bold text-white text-lg shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">Explore Markets</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-bright to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="/create"
            className="group px-10 py-5 glass-strong rounded-full font-bold text-white text-lg border-2 border-white/20 hover:border-accent-bright/50 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            Create Market
          </a>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}