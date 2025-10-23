"use client";

import MarketCard from "./MarketCard";
import CryptoTable from "./CryptoTable";
import { ArrowRight } from "lucide-react";

export default function ActiveMarkets() {
  const markets = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1616558941964-4d361e799861?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxiaXRjb2luJTIwY3J5cHRvY3VycmVuY3klMjBnb2xkJTIwY29pbnN8ZW58MHwwfHx8MTc2MTIwMDkwN3ww&ixlib=rb-4.1.0&q=85",
      attribution: "Kanchanara on Unsplash",
      title: "Will Bonk Transition to proof-of-stake by Q3 2025",
      yesVotes: 52,
      noVotes: 48
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1621435410670-0839654680da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHxjcnlwdG9jdXJyZW5jeSUyMGhvbG9ncmFwaGljJTIwbmVvbnxlbnwwfDB8fHB1cnBsZXwxNzYxMjAwOTA3fDA&ixlib=rb-4.1.0&q=85",
      attribution: "FlyD on Unsplash",
      title: "Will Price of Tether REACH $1200.00 by 31st December, 2025?",
      yesVotes: 40,
      noVotes: 60
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1714171056117-f58040d6f5eb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxjcnlwdG9jdXJyZW5jeSUyMGhvbG9ncmFwaGljJTIwbmVvbnxlbnwwfDB8fHB1cnBsZXwxNzYxMjAwOTA3fDA&ixlib=rb-4.1.0&q=85",
      attribution: "BoliviaInteligente on Unsplash",
      title: "Will Price of SOL exceed $200 by 31st December, 2025?",
      yesVotes: 65,
      noVotes: 35
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-cosmic-dark overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cosmic-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cosmic-blue/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Active Markets
          </h2>
          <p className="text-text-muted text-base">
            Explore and participate in live market
          </p>
        </div>

        {/* Market cards carousel */}
        <div className="relative mb-8">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {markets.map((market) => (
              <MarketCard key={market.id} {...market} />
            ))}
          </div>
          
          {/* See more button */}
          <div className="flex justify-center mt-8">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 group">
              <span className="text-sm font-medium">See more</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Crypto trading table */}
        <div className="mt-16">
          <CryptoTable />
        </div>
      </div>
    </section>
  );
}