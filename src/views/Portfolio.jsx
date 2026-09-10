import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
const Portfolio = () => {
  return (
    <div className="min-h-screen bg-backgrounds bg-gradient-to-br from-[#f6f9fc] via-[#edf2f8] to-[#f8fafc] ">
      <AnimatedNavbar />
      <PageBanner title="Our Portfolio" subtitle="A curated collection of our collaborations across diverse industries" breadcrumb="Portfolio" />
      <PortfolioSection />
      <CTASection />
      <Footer />
    </div>);
};
export default Portfolio;
