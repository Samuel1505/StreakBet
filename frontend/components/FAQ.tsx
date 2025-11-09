"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What is StreakBet and how does it work?",
      answer: "StreakBet is a decentralized prediction market platform where users can create markets, stake tokens on outcomes they believe will happen, and earn rewards when their predictions are correct. All transactions are secured by smart contracts on the blockchain."
    },
    {
      question: "How do I start making predictions?",
      answer: "Simply connect your wallet, browse active markets, and stake your tokens on the outcome you believe will occur. Once the event concludes and the outcome is verified, winners automatically receive their proportional share of the total pool."
    },
    {
      question: "Is my investment safe on StreakBet?",
      answer: "Yes! All funds are secured by audited smart contracts on the blockchain. We use industry-leading security practices, and our platform has been thoroughly tested. Your assets remain in your control until you decide to stake them."
    },
    {
      question: "What tokens can I use for predictions?",
      answer: "StreakBet supports major cryptocurrencies including SOL, ETH, and various stablecoins. You can check the specific tokens accepted for each market before placing your prediction."
    },
    {
      question: "How are market outcomes determined?",
      answer: "Market outcomes are determined through a decentralized oracle system and community verification. Once an event concludes, the outcome is verified through multiple sources to ensure accuracy and fairness."
    },
    {
      question: "Can I create my own prediction market?",
      answer: "Absolutely! Any user can create a prediction market. Simply navigate to the 'Create' section, define your event question, set the parameters, and launch your market. You'll earn fees from participants who join your market."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 px-6 bg-cosmic-dark overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cosmic-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cosmic-blue/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-glow">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Everything you need to know about StreakBet prediction markets
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-white/5"
              >
                <span className="text-lg font-semibold text-white pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-cosmic-blue flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 text-text-muted leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-text-muted mb-4">
            Still have questions?
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cosmic-purple to-cosmic-blue text-white font-medium hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}