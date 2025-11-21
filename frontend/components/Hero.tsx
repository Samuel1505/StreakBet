"use client";

import FloatingToken from "./FloatingToken";
import StarIcon from "./StarIcon";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cosmic-dark">
      {/* Cosmic gradient background */}
      <div className="absolute inset-0 cosmic-gradient" />
      
      {/* Floating tokens */}
      <FloatingToken 
        src="/eth.png" 
        alt="Ethereum" 
        size={80}
        className="top-[15%] left-[15%]"
      />
      <FloatingToken 
        src="/solana.png" 
        alt="Solana" 
        size={70}
        className="top-[25%] right-[12%]"
      />
      <FloatingToken 
        src="/punk.png" 
        alt="NFT Punk" 
        size={90}
        className="bottom-[30%] left-[10%]"
      />
      <FloatingToken 
        src="/r.png" 
        alt="Token" 
        size={75}
        className="bottom-[20%] right-[45%]"
      />
      
      {/* Decorative stars */}
      <StarIcon 
        size={20} 
        className="absolute top-[20%] left-[50%] text-white/60 animate-pulse"
      />
      <StarIcon 
        size={16} 
        className="absolute bottom-[35%] right-[15%] text-white/40 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
      
      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6 text-glow">
          Predict the Future
          <br />
          of Crypto
        </h1>
        
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-8">
          Join now, the leading platform for crypto prediction markets. Use your knowledge to forecast digital assets and earn rewards.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <a
            href="/markets"
            className="px-8 py-4 bg-gradient-to-r from-cosmic-purple to-cosmic-blue rounded-full font-semibold text-white hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all hover:scale-105"
          >
            Explore Markets
          </a>
          <a
            href="/create"
            className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-white hover:bg-white/20 transition-all hover:scale-105"
          >
            Create Market
          </a>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cosmic-dark to-transparent" />
    </section>
  );
}