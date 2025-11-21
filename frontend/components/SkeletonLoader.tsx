"use client";

interface SkeletonLoaderProps {
  className?: string;
  variant?: "text" | "card" | "circle" | "rect";
  width?: string;
  height?: string;
}

export default function SkeletonLoader({
  className = "",
  variant = "rect",
  width,
  height,
}: SkeletonLoaderProps) {
  const baseClasses = "animate-pulse bg-white/10 rounded";
  
  const variantClasses = {
    text: "h-4",
    card: "h-48",
    circle: "rounded-full",
    rect: "h-12",
  };

  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      aria-label="Loading..."
      role="status"
    />
  );
}

export function MarketCardSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-pulse">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-48 h-48 bg-white/10 rounded-xl" />
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-white/10 rounded w-3/4" />
          <div className="h-4 bg-white/10 rounded w-1/2" />
          <div className="flex gap-4">
            <div className="h-10 bg-white/10 rounded-lg w-24" />
            <div className="h-10 bg-white/10 rounded-lg w-24" />
          </div>
        </div>
        <div className="w-full md:w-auto">
          <div className="h-12 bg-white/10 rounded-full w-32" />
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-white/10 rounded-xl" />
        <div className="w-16 h-4 bg-white/10 rounded" />
      </div>
      <div className="h-8 bg-white/10 rounded w-1/2 mb-2" />
      <div className="h-4 bg-white/10 rounded w-3/4" />
    </div>
  );
}

