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
    <footer className="relative py-12 px-6 bg-cosmic-dark border-t border-white/10">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Navigation links */}
        <nav className="flex flex-wrap justify-center gap-8 mb-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white hover:text-cosmic-blue transition-colors duration-300 text-sm font-medium"
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
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <social.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-text-muted text-sm">
            Design with love © 2025. All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
}