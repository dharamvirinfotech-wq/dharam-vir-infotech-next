import React from "react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhyChooseServices from "@/components/WhyChooseServices";
import FaqSection from "@/components/FaqSection";
import SectionHeader from "@/components/SectionHeader";
import { allServices, servicesFaqsData } from "@/data/services-data";
import { Link } from "@/lib/router-compat";
import { ArrowRight } from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-foreground selection:bg-accent selection:text-white">
      <AnimatedNavbar />

      {/* Hero Banner with Modern Title and Breadcrumbs */}
      <PageBanner
        title="Our Services & Solutions"
        subtitle="Empowering modern enterprises with state-of-the-art custom software, cloud architectures, AI automation, and agile engineering squads."
        breadcrumb="Services"
      />

      {/* Main Services Section - Clean Card Grid with Direct Click to Details */}
      <section className="py-16 lg:py-20 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header matching Home Page & Service Details Styling */}
          <SectionHeader
            badge="FULL-CYCLE SOLUTIONS"
            titlePrefix="End-to-End"
            titleHighlight="Specialized Capabilities"
            description="Tailored software engineering services designed to modernize legacy workflows, scale digital products, and deliver measurable business ROI."
            centered={true}
            className="mb-14"
          />

          {/* Simple & Clean Services Cards Grid (Clickable to Details Page) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, index) => {
              const ServiceIcon = service.icon;

              return (
                <Link
                  key={service.id || index}
                  to={service.link || `/services/${service.slug}`}
                  className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-2xl hover:border-accent/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative cursor-pointer"
                >
                  <div>
                    {/* Top Image Banner with Subtle Gradient */}
                    <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Top Right Service Badge */}
                      {service.badge && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider font-mono bg-white/95 dark:bg-slate-900/95 text-primary dark:text-white shadow-md border border-white/20 backdrop-blur-xs">
                            {service.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Overlapping Floating Circular Icon */}
                    <div className="relative flex justify-center -mt-8 z-20">
                      <div
                        className={`w-16 h-16 rounded-full ${
                          service.iconBg || "bg-accent text-white"
                        } shadow-lg ring-4 ring-white dark:ring-slate-900 flex items-center justify-center group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <ServiceIcon size={26} strokeWidth={2.2} />
                      </div>
                    </div>

                    {/* Clean Card Title */}
                    <div className="p-6 pt-4 text-center">
                      <h3 className="text-xl font-bold text-primary dark:text-white tracking-tight group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Clean Footer Link */}
                  <div className="px-6 pb-6 pt-0">
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-accent group-hover:translate-x-1 transition-transform">
                        <span>Explore Details</span>
                        <ArrowRight size={15} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>



      {/* High-Impact "Why Businesses Choose Neutonsoft" Component */}
      <WhyChooseServices />

      {/* Reusable Home-style FAQ Section powered by props & services-data.js */}
      <FaqSection
        badge="SERVICES FAQ"
        titlePrefix="Frequently Asked"
        titleHighlight="Services Questions"
        description="Everything you need to know about our custom engineering services, team onboarding velocity, code ownership, and 24/7 SLA maintenance."
        items={servicesFaqsData}
        id="services-faq"
      />

      {/* Direct Call to Actions */}
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Services;
