import React from "react";
import SectionHeader from "@/components/SectionHeader";
import { getCapabilityIcon } from "./ServiceIcons";

export default function ServiceCapabilities({ service }) {
  if (!service?.comprehensiveCapabilities || service.comprehensiveCapabilities.length === 0) return null;

  return (
    <section className="py-[40px] relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column using unified SectionHeader */}
          <div className="lg:col-span-5">
            <SectionHeader
              badge="OPERATIONAL SCOPE"
              titlePrefix="Comprehensive"
              titleHighlight={`${service.shortTitle || service.title} Capabilities`}
              description={service.comprehensiveServicesDescription}
              centered={false}
              className="mb-0 max-w-none"
            />
          </div>

          {/* Right Column: 2-column capability tags with distinct circular icons */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.comprehensiveCapabilities.map((cap, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex items-center gap-4 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group cursor-pointer"
                >
                  {/* Distinct Circular Icon Container with Orange hover */}
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-slate-800 text-primary dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-slate-700 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:border-accent transition-all duration-300 shadow-2xs">
                    {getCapabilityIcon(cap, i, "w-5 h-5")}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-primary dark:text-slate-200 group-hover:text-accent dark:group-hover:text-accent transition-colors">
                    {cap}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
