"use client";

import Image from "next/image";

interface FloatingTokenProps {
  src: string;
  alt: string;
  size: number;
  className?: string;
}

export default function FloatingToken({ src, alt, size, className = "" }: FloatingTokenProps) {
  return (
    <div 
      className={`absolute animate-float ${className}`}
      style={{
        animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
      }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-cosmic-purple/20 blur-xl rounded-full" />
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="relative z-10 drop-shadow-2xl"
        />
      </div>
    </div>
  );
}