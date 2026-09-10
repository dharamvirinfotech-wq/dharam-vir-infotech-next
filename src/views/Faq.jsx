import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import FaqSection from "@/components/FaqSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { homeFaqData } from "@/data/home-data";

const Faq = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageBanner
        title="Frequently Asked Questions"
        subtitle="Got questions? We have answers. Explore commonly asked questions about our services, process, and hiring models."
        breadcrumb="FAQ"
      />
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

export default Faq;
