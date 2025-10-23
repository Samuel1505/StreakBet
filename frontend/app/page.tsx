import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen bg-cosmic-dark">
      <Header />
      <Hero />
      <Stats />
      <HowItWorks />
    </div>
  );
}