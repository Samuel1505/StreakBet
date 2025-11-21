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
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-cosmic-dark/80 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="text-2xl font-bold text-white">
            <span className="text-cosmic-blue">S</span>
            <span className="text-cosmic-purple">t</span>
            <span className="text-cosmic-blue">r</span>
            <span className="text-cosmic-purple">e</span>
            <span className="text-cosmic-purple">a</span>
            <span className="text-cosmic-purple">k</span>
            <span className="text-cosmic-purple">B</span>
            <span className="text-cosmic-purple">e</span>
            <span className="text-cosmic-purple">t</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-3 py-2 transition-colors ${
                isActive(link.href)
                  ? "text-cosmic-blue font-semibold"
                  : "text-white hover:text-cosmic-blue"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cosmic-blue rounded-full" />
              )}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Wallet Button */}
          <div className="bg-cosmic-blue hover:bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-cosmic-blue/50">
            {/* @ts-ignore - appkit-button is a custom web component */}
            <appkit-button />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-cosmic-blue transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cosmic-dark/95 backdrop-blur-md border-b border-white/10">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "bg-cosmic-purple/20 text-cosmic-blue font-semibold border border-cosmic-purple/30"
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