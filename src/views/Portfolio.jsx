import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
const Portfolio = () => {
    return (<div className="min-h-screen">
      <Navbar />
      <PageBanner title="Our Portfolio" subtitle="A curated collection of our collaborations across diverse industries" breadcrumb="Portfolio"/>
      <PortfolioSection />
      <CTASection />
      <Footer />
    </div>);
};
export default Portfolio;
