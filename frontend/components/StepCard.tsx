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
        <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-cosmic-purple/50 to-transparent" />
      )}
      
      {/* Card */}
      <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:border-cosmic-purple/50 hover:bg-white/10 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cosmic-purple/20">
        {/* Number badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cosmic-purple to-cosmic-blue mb-6 group-hover:scale-110 transition-transform duration-300">
          <span className="text-3xl font-bold text-white">{number}</span>
        </div>
        
        {/* Content */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-cosmic-blue transition-colors duration-300">
          {title}
        </h3>
        <p className="text-text-muted leading-relaxed">
          {description}
        </p>
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cosmic-purple/20 to-transparent rounded-bl-3xl rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}