"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface FeatureCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  ctaText: string;
  gradient: string;
  isLocal?: boolean;
}

export default function FeatureCard({ image, imageAlt, title, description, ctaText, gradient, isLocal = false }: FeatureCardProps) {
  return (
    <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
      {/* Image with gradient background */}
      <div className="flex justify-center mb-6">
        <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${gradient} p-1`}>
          <div className="flex items-center justify-center w-full h-full rounded-full bg-cosmic-dark overflow-hidden">
            {isLocal ? (
              <Image 
                src={image}
                alt={imageAlt}
                width={48}
                height={48}
                className="object-contain"
              />
            ) : (
              <img 
                src={image}
                alt={imageAlt}
                className="w-12 h-12 object-contain"
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="text-center space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-white">
          {title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed">
          {description}
        </p>
        
        {/* CTA Link */}
        <button className="inline-flex items-center gap-2 text-cosmic-blue hover:text-blue-400 font-medium text-sm transition-colors duration-300 group/cta">
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
      
      {/* Hover glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-2xl pointer-events-none`} />
    </div>
  );
}