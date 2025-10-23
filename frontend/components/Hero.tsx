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
        
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
          Join now, the leading platform form crypto prediction market. Use your knowledge to for forecast the digital assets and earn reward
        </p>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cosmic-dark to-transparent" />
    </section>
  );
}