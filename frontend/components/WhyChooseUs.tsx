"use client";

import FeatureCard from "./FeatureCard";
import StarIcon from "./StarIcon";

export default function WhyChooseUs() {
  const features = [
    {
      image: "/r.png",
      isLocal: false,
      imageAlt: "Blockchain hexagon icon",
      title: "Stake on the Future",
      description: "Stake on predictions anytime, anywhere with our secure, easy-to-use decentralized platform.",
      ctaText: "Get Started",
      gradient: "from-purple-600 to-indigo-600"
    },
    {
      image: "/eth.png",
      isLocal: false,
      imageAlt: "Fast transaction icon",
      title: "Fast Transaction",
      description: "Stake on outcomes with our secure, easy-to-use decentralized platform. With transparent smart contracts and community-backed resolution, you can predict with confidence anytime.",
      ctaText: "Get Started",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      image: "/solana.png",
      isLocal: false,
      imageAlt: "Security shield icon",
      title: "Secure",
      description: "Gain access to a variety of prediction markets with just a few clicks. Our intuitive platform makes it simple to create events, stake tokens, and claim your rewards safely.",
      ctaText: "Start Now",
      gradient: "from-pink-500 to-purple-600"
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-cosmic-dark overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cosmic-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cosmic-blue/10 rounded-full blur-3xl" />
      
      {/* Decorative star */}
      <StarIcon 
        size={32} 
        className="absolute top-12 left-12 text-white/40 animate-pulse"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-text-muted text-base max-w-3xl mx-auto">
            Access decentralized prediction markets 24/7 from any device, anywhere in the world.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}