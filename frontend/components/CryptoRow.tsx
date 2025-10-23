"use client";

import { ArrowRight } from "lucide-react";
import MiniChart from "./MiniChart";

interface CryptoRowProps {
  name: string;
  ticker: string;
  price: string;
  change: number;
  chartData: number[];
}

export default function CryptoRow({ name, ticker, price, change, chartData }: CryptoRowProps) {
  const isPositive = change >= 0;
  
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
      {/* Token info */}
      <div className="flex items-center gap-8 flex-1">
        {/* Name and ticker */}
        <div className="w-32">
          <div className="text-white font-medium text-base mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            {name}
          </div>
          <div className={`text-sm font-medium ${
            ticker === 'USDT' ? 'text-cosmic-blue' : 
            ticker === 'PENGU' ? 'text-blue-400' : 
            ticker === 'TRUMP' ? 'text-blue-500' : 
            ticker === 'SOL' ? 'text-cyan-400' : 
            'text-cosmic-purple'
          }`} style={{ fontFamily: 'Inter, sans-serif' }}>
            {ticker}
          </div>
        </div>
        
        {/* Price */}
        <div className="w-32">
          <div className="text-white font-semibold text-lg">
            {price}
          </div>
        </div>
        
        {/* Change percentage */}
        <div className="w-24">
          <div className={`text-base font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{change.toFixed(2)}%
          </div>
        </div>
        
        {/* Mini chart */}
        <div className="flex-1 max-w-[200px]">
          <MiniChart data={chartData} isPositive={isPositive} />
        </div>
      </div>
      
      {/* Trade button */}
      <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cosmic-blue hover:bg-blue-600 text-white text-sm font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cosmic-blue/30">
        <span>Trade Now</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}