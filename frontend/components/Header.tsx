"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-white">
            <span className="text-cosmic-blue">L</span>
            <span className="text-cosmic-purple">o</span>
            <span className="text-cosmic-blue">o</span>
            <span className="text-cosmic-purple">p</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/create" className="text-white hover:text-cosmic-blue transition-colors">
            Create
          </Link>
          <Link href="/markets" className="text-white hover:text-cosmic-blue transition-colors">
            Markets
          </Link>
          <Link href="/dashboard" className="text-white hover:text-cosmic-blue transition-colors">
            Dashboard
          </Link>
          <a href="#lederboard" className="text-white hover:text-cosmic-blue transition-colors">
            Leaderboard
          </a>
        </div>
        
        <button className="bg-cosmic-blue hover:bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-cosmic-blue/50">
          Connect wallet
        </button>
      </nav>
    </header>
  );
}