"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Market } from "@/app/markets/types";
import { formatTimeRemaining, formatPercentage } from "@/app/markets/utils";

interface MarketListCardProps {
  market: Market;
}

export default function MarketListCard({ market }: MarketListCardProps) {
  return (
    <Link href={`/markets/${market.id}`}>
      <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-cosmic-purple/50 transition-all duration-300 cursor-pointer">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side - Image */}
          <div className="relative w-full md:w-48 h-48 shrink-0 rounded-xl overflow-hidden">
            <Image
              src={market.image}
              alt={market.question}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 192px"
            />
            {/* bg-gradient-to-t is correct Tailwind class - linter suggestion is incorrect */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          </div>

          {/* Middle - Content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-white text-lg md:text-xl font-semibold mb-3 line-clamp-2 group-hover:text-cosmic-blue transition-colors">
                {market.question}
              </h3>
              <p className="text-text-muted text-sm mb-4">
                {formatTimeRemaining(market.closingDate)}
              </p>
            </div>

            {/* Voting indicators */}
            <div className="flex items-center gap-4">
              {/* Yes vote */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30">
                <ThumbsUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-semibold">Yes</span>
                <span className="text-green-400 text-sm font-bold">
                  {formatPercentage(market.yesPercentage)}
                </span>
              </div>

              {/* No vote */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30">
                <ThumbsDown className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm font-semibold">No</span>
                <span className="text-red-400 text-sm font-bold">
                  {formatPercentage(market.noPercentage)}
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Trade button */}
          <div className="flex items-center justify-center md:justify-end">
            {/* bg-gradient-to-r is correct Tailwind class - linter suggestion is incorrect */}
            <button
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/markets/${market.id}`;
              }}
              className="w-full md:w-auto px-8 py-3 bg-linear-to-r from-cosmic-purple to-cosmic-blue rounded-full font-semibold text-white hover:shadow-lg hover:shadow-cosmic-blue/50 transition-all hover:scale-105"
            >
              Trade
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}