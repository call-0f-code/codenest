import Navbar from "@/components/miniCompo/Navbar";
import HeroSection from "@/components/miniCompo/Hero";
import FeaturesSection from "@/components/miniCompo/Features";
import CTASection from "@/components/miniCompo/CTA";
import Footer from "@/components/miniCompo/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5E6D3] dark:bg-[#2C1810] transition-colors duration-300">
      <Navbar />
      <HeroSection /> {/* self-contained now */}
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
