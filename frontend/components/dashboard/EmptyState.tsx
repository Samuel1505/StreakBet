"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface EmptyStateProps {
  emoji: string;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
}

export default function EmptyState({
  emoji,
  title,
  description,
  actionText,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
      <div className="text-7xl mb-4 animate-bounce">{emoji}</div>
      <h3 className="text-white text-xl font-bold mb-3">{title}</h3>
      <p className="text-text-muted text-base mb-6 max-w-md mx-auto">
        {description}
      </p>
      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cosmic-purple to-cosmic-blue rounded-full font-semibold text-white hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all duration-300 group"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      )}
    </div>
  );
}