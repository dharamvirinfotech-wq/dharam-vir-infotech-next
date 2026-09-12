import React from "react";
import { whyChooseServicesData } from "@/data/services-data";
import SectionHeader from "@/components/SectionHeader";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function WhyChooseServices() {
  return (
    <section className="py-[40px] relative overflow-hidden bg-white/60 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800">
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Unified Section Header */}
        <SectionHeader
          badge="PROVEN ENGINEERING EXCELLENCE"
          titlePrefix="Why Businesses Choose"
          titleHighlight="Dharam Vir Infotech"
          description="We merge enterprise-grade software architecture, rapid agile delivery velocity, and strict security compliance to give your business an unfair competitive advantage."
          centered={true}
          className="mb-14"
        />

        {/* 6 Elevated Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {whyChooseServicesData.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id || idx}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-2xl hover:border-accent/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle top hover gradient accent */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Badge & Icon Row */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-blue-50 dark:bg-slate-800 text-primary dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-slate-700 group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300 shadow-2xs">
                      <IconComponent size={24} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 group-hover:border-accent/30 group-hover:text-accent transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-primary dark:text-white mb-3 group-hover:text-accent dark:group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

