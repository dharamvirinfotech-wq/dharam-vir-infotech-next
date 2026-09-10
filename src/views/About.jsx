import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import IndustriesSection from "@/components/IndustriesSection";
import AiSolutionsSection from "@/components/AiSolutionsSection";
import ProcessSection from "@/components/ProcessSection";
import FaqSection from "@/components/FaqSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
const About = () => {
    return (<div className="min-h-screen">
      <Navbar />
      <PageBanner title="About Us" subtitle="Your trusted technology partner for digital transformation" breadcrumb="About Us"/>
      <AboutSection />
      <StatsSection />
      <IndustriesSection />
      <AiSolutionsSection />
      <ProcessSection />
      <FaqSection />
      <CTASection />
      <Footer />
    </div>);
};
export default About;
