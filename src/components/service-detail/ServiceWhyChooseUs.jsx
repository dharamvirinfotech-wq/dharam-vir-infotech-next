import React from "react";
import SectionHeader from "@/components/SectionHeader";
import { Check, ArrowRight } from "lucide-react";

export default function ServiceWhyChooseUs({ service }) {
  if (!service?.whyChooseUs || service.whyChooseUs.length === 0) return null;

  return (
    <section className="py-[40px] relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column using unified SectionHeader */}
          <div className="lg:col-span-5 space-y-4">
            <SectionHeader
              badge="ENGINEERING ADVANTAGE"
              titlePrefix="Why Choose Our"
              titleHighlight={service.shortTitle || service.title}
              description={service.whyChooseUsParagraph}
              centered={false}
              className="mb-0 max-w-none"
            />
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <span>{service.cta || "Book Your Free Consultation"}</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Right Column: 6 Checkmark Benefit Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-accent/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5 border border-accent/20 group-hover:bg-accent group-hover:text-white transition-colors">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary dark:text-white mb-1.5 group-hover:text-accent transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
