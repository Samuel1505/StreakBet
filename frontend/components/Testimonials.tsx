"use client";

import { Star, Quote } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Alex Chen",
      role: "Crypto Trader",
      avatar: "https://i.pravatar.cc/150?img=12",
      content: "StreakBet has completely transformed how I engage with prediction markets. The interface is intuitive, and the rewards are fair. I've been using it for 6 months and couldn't be happier!",
      rating: 5
    },
    {
      name: "Sarah Martinez",
      role: "DeFi Enthusiast",
      avatar: "https://i.pravatar.cc/150?img=45",
      content: "The transparency and security of this platform are unmatched. Smart contracts ensure everything is fair, and I love being part of this growing community.",
      rating: 5
    },
    {
      name: "Michael Park",
      role: "Blockchain Developer",
      avatar: "https://i.pravatar.cc/150?img=33",
      content: "As a developer, I appreciate the technical excellence behind StreakBet. The platform is fast, secure, and the prediction markets are genuinely innovative.",
      rating: 5
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-cosmic-dark overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cosmic-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cosmic-blue/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-glow">
            What Our Users Say
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Join thousands of satisfied users who trust StreakBet for their prediction market needs
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              {/* Quote icon */}
              <Quote className="w-10 h-10 text-cosmic-purple/30 mb-4" />
              
              {/* Rating stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-text-muted leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              
              {/* User info */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cosmic-purple/50">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-text-muted text-sm">{testimonial.role}</div>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple to-cosmic-blue opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-2xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}