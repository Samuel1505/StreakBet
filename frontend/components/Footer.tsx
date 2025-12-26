"use client";

import { Mail, FileText, Briefcase, Shield, Clock } from "lucide-react";

export default function Footer() {
  const navLinks = [
    { label: "Service", href: "#service" },
    { label: "Support", href: "#support" },
    { label: "Company", href: "#company" },
    { label: "Legal", href: "#legal" },
    { label: "Join Us", href: "#join" }
  ];

  const socialIcons = [
    { icon: Mail, href: "#", label: "Email" },
    { icon: FileText, href: "#", label: "Documents" },
    { icon: Briefcase, href: "#", label: "Portfolio" },
    { icon: Shield, href: "#", label: "Security" },
    { icon: Clock, href: "#", label: "Time" }
  ];

  return (
    <footer className="relative py-16 px-6 bg-background-lighter border-t border-white/10 overflow-hidden">
      {/* Aurora background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Navigation links */}
        <nav className="flex flex-wrap justify-center gap-8 mb-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white hover:text-accent-bright transition-colors duration-300 text-sm font-semibold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex justify-center gap-6 mb-8">
          {socialIcons.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="flex items-center justify-center w-12 h-12 rounded-xl glass border border-white/10 hover:glass-strong hover:border-accent/30 hover:scale-110 transition-all duration-300 group"
            >
              <social.icon className="w-5 h-5 text-text-muted group-hover:text-accent-bright transition-colors duration-300" />
            </a>
          ))}
        </div>

        {/* Brand and copyright */}
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-accent-bright via-cyan-light to-primary-light bg-clip-text text-transparent">
              StreakBet
            </span>
          </div>
          <p className="text-text-muted text-sm">
            Designed with ❤️ © 2025. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}