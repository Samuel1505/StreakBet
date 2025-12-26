"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/create", label: "Create" },
    { href: "/markets", label: "Markets" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass backdrop-blur-xl border-b border-white/10 shadow-lg">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-accent-bright via-cyan-light to-primary-light bg-clip-text text-transparent">
              StreakBet
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-3 py-2 transition-colors duration-300 ${
                isActive(link.href)
                  ? "text-accent-bright font-semibold"
                  : "text-white hover:text-accent-bright"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-cyan rounded-full" />
              )}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Wallet Button */}
          <div className="gradient-accent text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-accent/30 hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 hover:scale-105">
            {/* @ts-ignore - appkit-button is a custom web component */}
            <appkit-button />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-accent-bright transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-strong backdrop-blur-xl border-b border-white/10">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive(link.href)
                    ? "glass-strong text-accent-bright font-semibold border border-accent/30"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}