// Original Components (commented as requested for easy rollback)
// import Navbar from "@/components/Navbar";
// import HeroSection from "@/components/HeroSection";

// New Animated Components (matching provided reference design)
import AnimatedNavbar from "@/components/AnimatedNavbar";
import AnimatedHeroSection from "@/components/AnimatedHeroSection";

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
    <div className="min-h-screen bg-gradient-to-br from-[#f6f9fc] via-[#edf2f8] to-[#f8fafc]">
      {/* 
        Header with:
        - Sticky transparent-to-solid white transition on scroll
        - Desktop "CONTACT TODAY" button & 3-line Menu icon opening Desktop Info Sidebar
        - Mobile hamburger with smooth drawer
      */}
      <AnimatedNavbar />

      {/* 
        Hero Section with:
        - Floating animated geometric shapes (triangles, pluses, circles, organic waves)
        - Split 2-column layout (Text on left, fluid masked visual on right)
        - Full circle pill button ("CONTACT TODAY")
        - Slower smooth slide transitions (7.5s)
      */}
      {/* <HeroSection /> */}
      <AnimatedHeroSection />


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
