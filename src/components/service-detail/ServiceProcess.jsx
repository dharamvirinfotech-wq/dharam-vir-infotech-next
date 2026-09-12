import React from "react";
import SectionHeader from "@/components/SectionHeader";
import { getServiceIcon } from "./ServiceIcons";

export default function ServiceProcess({ service }) {
  if (!service?.processSteps || service.processSteps.length === 0) return null;

  return (
    <section className="py-[40px] relative">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Reusable Home Page Header Component */}
        <SectionHeader
          badge="DELIVERY LIFECYCLE"
          titlePrefix="How We Deliver"
          titleHighlight={service.shortTitle || service.title}
          description="Our structured delivery process ensures every client receives scalable enterprise solutions backed by proactive monitoring, continuous improvement, and expert technical support."
          centered={true}
          className="mb-16"
        />

        {/* Process Step Circles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative">
          {service.processSteps.map((step, idx) => (
            <div
              key={step.id || idx}
              className="flex flex-col items-center text-center group"
            >
              {/* Step Circle with Accent Glow and Badge */}
              <div className="relative mb-5">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-accent text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ring-4 ring-white dark:ring-slate-900 shadow-accent/20">
                  {getServiceIcon(step.icon, "w-7 h-7")}
                </div>
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary text-white text-[11px] font-mono font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                  {idx + 1}
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-primary dark:text-white mb-2 group-hover:text-accent transition-colors">
                {step.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
