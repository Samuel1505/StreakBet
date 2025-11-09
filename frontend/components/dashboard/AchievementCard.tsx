"use client";

interface AchievementCardProps {
  emoji: string;
  title: string;
  description: string;
  borderColor: string;
  glowColor: string;
  unlocked?: boolean;
}

export default function AchievementCard({
  emoji,
  title,
  description,
  borderColor,
  glowColor,
  unlocked = true,
}: AchievementCardProps) {
  return (
    <div className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border ${borderColor} rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-105 ${
      unlocked ? "hover:shadow-lg" : "opacity-60"
    }`}>
      {/* Glow effect */}
      {unlocked && (
        <div className={`absolute inset-0 ${glowColor} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl pointer-events-none`} />
      )}
      
      <div className="relative z-10">
        {/* Emoji icon */}
        <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
          {unlocked ? emoji : "🔒"}
        </div>
        
        {/* Title */}
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cosmic-blue transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed">
          {description}
        </p>
        
        {/* Unlocked indicator */}
        {unlocked && (
          <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
            <span>✓</span>
            <span>Unlocked</span>
          </div>
        )}
      </div>
      
      {/* Decorative corner */}
      <div className={`absolute top-0 right-0 w-16 h-16 ${glowColor} opacity-10 rounded-bl-3xl rounded-tr-2xl`} />
    </div>
  );
}