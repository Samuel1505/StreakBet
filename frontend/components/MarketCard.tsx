"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import Image from "next/image";

interface MarketCardProps {
  image: string;
  attribution: string;
  title: string;
  yesVotes: number;
  noVotes: number;
}

export default function MarketCard({ image, attribution, title, yesVotes, noVotes }: MarketCardProps) {
  return (
    <div className="relative flex-shrink-0 w-[320px] md:w-[380px] h-[240px] rounded-2xl overflow-hidden group cursor-pointer snap-start">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={image}
          alt={attribution}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6">
        {/* Title */}
        <h3 className="text-white text-sm md:text-base font-medium mb-4 line-clamp-2 leading-snug">
          {title}
        </h3>
        
        {/* Voting indicators */}
        <div className="flex items-center gap-3">
          {/* Yes vote */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/30 backdrop-blur-sm">
            <ThumbsUp className="w-3.5 h-3.5 text-green-400" />
            <span className="text-green-400 text-xs font-semibold">Yes</span>
            <span className="text-green-400 text-xs font-bold">{yesVotes}%</span>
          </div>
          
          {/* No vote */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 backdrop-blur-sm">
            <ThumbsDown className="w-3.5 h-3.5 text-red-400" />
            <span className="text-red-400 text-xs font-semibold">No</span>
            <span className="text-red-400 text-xs font-bold">{noVotes}%</span>
          </div>
        </div>
      </div>
      
      {/* Hover effect border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-cosmic-purple/50 rounded-2xl transition-all duration-300 pointer-events-none" />
    </div>
  );
}