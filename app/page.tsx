import AvailableTutors from "@/components/home/AvailableTutors";
import Banner from "@/components/home/Banner";
import CTASection from "@/components/home/CTASection";
import HowItWorks from "@/components/home/HowItWorks";
import StatsSection from "@/components/home/StatsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Banner />
        <StatsSection />
        <AvailableTutors />
        <WhyChooseUs />
        <HowItWorks />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}