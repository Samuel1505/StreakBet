"use client";

import StepCard from "./StepCard";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Market",
      description: "Simply create a market by setting your event question, stake tokens on the outcome you believe in, and once the event resolves, winners automatically claim their fair share of the pooled rewards"
    },
    {
      number: "02",
      title: "Place Your Prediction",
      description: "Browse active markets and stake your tokens on the outcome you believe will happen. Your stake represents your confidence in the prediction"
    },
    {
      number: "03",
      title: "Earn Rewards",
      description: "When the event concludes and the outcome is verified, winners automatically receive their proportional share of the total pool based on their stake"
    }
  ];

  return (
    <section className="relative py-32 px-6 bg-cosmic-dark overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 cosmic-gradient opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cosmic-purple/5 rounded-full blur-3xl animate-pulse" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-glow">
            How it Works
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            Simply create a market by setting your event question, stake tokens on the outcome you believe in, and once the event resolves, winners automatically claim their fair share of the pooled rewards
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}