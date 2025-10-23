import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import ActiveMarkets from "@/components/ActiveMarkets";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-cosmic-dark">
      <Header />
      <Hero />
      <Stats />
      <HowItWorks />
      <ActiveMarkets />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}