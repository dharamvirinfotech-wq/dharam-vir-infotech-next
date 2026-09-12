import React from "react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";

import ServiceHero from "./service-detail/ServiceHero";
import ServiceExpertise from "./service-detail/ServiceExpertise";
import ServiceChallenges from "./service-detail/ServiceChallenges";
import ServiceCapabilities from "./service-detail/ServiceCapabilities";
import ServiceProcess from "./service-detail/ServiceProcess";
import ServiceIndustries from "./service-detail/ServiceIndustries";
import ServiceWhyChooseUs from "./service-detail/ServiceWhyChooseUs";
import ServiceFaqCta from "./service-detail/ServiceFaqCta";
import ServiceRelated from "./service-detail/ServiceRelated";

/**
 * Master ServiceDetailTemplate Orchestrator
 * Fully modular component-based structure.
 * Applies the custom clean background gradient:
 * linear-gradient(180deg, #f0f7ff 0%, #e6f1ff 50%, #f0f7ff 100%)
 */
export default function ServiceDetailTemplate({ service }) {
  if (!service) return null;

  return (
    <div
      className="min-h-screen text-foreground font-sans selection:bg-accent selection:text-white"
      style={{
        background: "linear-gradient(180deg, #f0f7ff 0%, #e6f1ff 50%, #f0f7ff 100%)",
      }}
    >
      <AnimatedNavbar />

      {/* 1. Hero Section */}
      <ServiceHero service={service} />

      {/* 2. Headline, Expertise, Feature Cards & Highlights */}
      <ServiceExpertise service={service} />

      {/* 3. Business Challenges We Help You Overcome */}
      <ServiceChallenges service={service} />

      {/* 4. Comprehensive Operational Capabilities */}
      <ServiceCapabilities service={service} />

      {/* 5. How We Deliver (6-Step Timeline Process) */}
      <ServiceProcess service={service} />

      {/* 6. Delivering Across Industries (8 Verticals) */}
      <ServiceIndustries service={service} />

      {/* 7. Why Choose Us Checkmarks & Consultation CTA */}
      <ServiceWhyChooseUs service={service} />

      {/* 8. Collapsible FAQs & Dark Blue Consultation Card */}
      <ServiceFaqCta service={service} />

      {/* 9. Related Services */}
      <ServiceRelated service={service} />

      {/* 10. Global CTA, Contact & Footer */}
      {/* <CTASection /> */}
      {/* <ContactSection /> */}
      <Footer />
    </div>
  );
}
