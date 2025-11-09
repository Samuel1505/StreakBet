import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import ActiveMarkets from "@/components/ActiveMarkets";
import WhyChooseUs from "@/components/WhyChooseUs";
import PlatformFeatures from "@/components/PlatformFeatures";
import CommunityStats from "@/components/CommunityStats";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import TrustIndicators from "@/components/TrustIndicators";
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
      <PlatformFeatures />
      <CommunityStats />
      <Testimonials />
      <FAQ />
      <CTASection />
      <TrustIndicators />
      <Footer />
    </div>
  );
}