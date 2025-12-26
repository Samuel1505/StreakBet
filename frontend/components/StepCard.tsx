"use client";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
}

export default function StepCard({ number, title, description, isLast = false }: StepCardProps) {
  return (
    <div className="relative group">
      {/* Connecting line (hidden on mobile, shown on desktop for non-last items) */}
      {!isLast && (
        <div className="hidden md:block absolute top-12 left-[60%] w-full h-1 bg-linear-to-r from-accent via-cyan to-transparent opacity-50" />
      )}
      
      {/* Card */}
      <div className="relative glass-strong rounded-3xl p-10 transition-all duration-500 hover:border-accent/50 hover:bg-white/10 hover:transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-accent/30">
        {/* Number badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-accent mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-accent/30">
          <span className="text-3xl font-bold text-white">{number}</span>
        </div>
        
        {/* Content */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 text-glow">
          {title}
        </h3>
        <p className="text-text-muted text-base md:text-lg leading-relaxed">
          {description}
        </p>
        
        {/* Decorative corner accent */}
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
      </div>
    </div>
  );
}