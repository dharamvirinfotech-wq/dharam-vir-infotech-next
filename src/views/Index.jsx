import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import IndustriesSection from "@/components/IndustriesSection";
import AiSolutionsSection from "@/components/AiSolutionsSection";
import ProcessSection from "@/components/ProcessSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import PortfolioSection from "@/components/PortfolioSection";
import FaqSection from "@/components/FaqSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { homeFaqData } from "@/data/home-data";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AboutSection />
      <WhyChooseUsSection />
      <IndustriesSection />
      <AiSolutionsSection />
      <ProcessSection />
      <TechnologiesSection />
      <PortfolioSection />
      <ContactSection />
      <FaqSection
        items={homeFaqData}
        badge="FREQUENTLY ASKED QUESTIONS"
        titlePrefix="Find Answers To"
        titleHighlight="Common Questions"
        description="Explore answers to common questions about our software development services, consulting, hiring models, and security practices."
      />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
