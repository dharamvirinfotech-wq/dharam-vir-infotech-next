import React from "react";
import SectionHeader from "@/components/SectionHeader";
import { getServiceIcon } from "./ServiceIcons";

export default function ServiceIndustries({ service }) {
  if (!service?.industries || service.industries.length === 0) return null;

  return (
    <section className="py-[40px] relative">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Reusable Home Page Header Component */}
        <SectionHeader
          badge="SECTOR SPECIALIZATIONS"
          titlePrefix="Delivering Across"
          titleHighlight="Key Industries"
          description="Tailored engineering patterns customized for unique regulatory, transaction volume, and operational needs."
          centered={true}
          className="mb-14"
        />

        {/* Centered Responsive Industries Cards */}
        <div className="flex flex-wrap justify-center items-stretch gap-4 sm:gap-5 max-w-6xl mx-auto">
          {service.industries.map((ind) => (
            <div
              key={ind.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-accent/60 hover:-translate-y-1 text-center flex flex-col items-center justify-center transition-all duration-300 group w-[calc(50%-0.5rem)] sm:w-[calc(33.33%-0.85rem)] md:w-[calc(25%-1rem)] lg:w-[calc(16.66%-1.1rem)] min-w-[130px]"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary dark:text-accent flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-2xs border border-primary/10 dark:border-slate-700">
                {getServiceIcon(ind.icon, "w-6 h-6")}
              </div>
              <span className="text-xs font-bold text-primary dark:text-white group-hover:text-accent dark:group-hover:text-accent transition-colors leading-snug">
                {ind.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
