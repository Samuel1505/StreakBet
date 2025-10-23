"use client";

export default function CreateButton() {
  return (
    <button
      type="submit"
      className="group relative px-12 py-4 bg-gradient-to-r from-cosmic-purple to-cosmic-blue rounded-full font-semibold text-white text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-cosmic-blue/50 hover:scale-105"
    >
      <span className="relative z-10 flex items-center gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Create
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-cosmic-blue to-cosmic-purple opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}