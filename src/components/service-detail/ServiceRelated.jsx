import React from "react";
import { Link } from "@/lib/router-compat";
import SectionHeader from "@/components/SectionHeader";
import { getServiceIcon } from "./ServiceIcons";
import { ArrowRight } from "lucide-react";

export default function ServiceRelated({ service }) {
  if (!service?.relatedServices || service.relatedServices.length === 0) return null;

  return (
    <section className="py-[40px] relative">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Reusable Home Page Header Component */}
        <SectionHeader
          badge="COMPLEMENTARY EXPERTISE"
          titlePrefix="Explore Related"
          titleHighlight="Services & Solutions"
          description="Optimize your operations, secure your digital assets, and drive digital growth with our comprehensive technology engineering capabilities."
          centered={true}
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {service.relatedServices.map((rel, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-accent/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Full Circular Icon Container with Orange / Accent hover */}
                <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-slate-800 text-primary dark:text-blue-400 flex items-center justify-center mb-6 shadow-2xs border border-blue-100 dark:border-slate-700 group-hover:bg-accent group-hover:text-white group-hover:border-accent group-hover:scale-108 transition-all duration-300 ring-4 ring-white dark:ring-slate-900">
                  {getServiceIcon(rel.icon, "w-6 h-6")}
                </div>
                <h4 className="text-lg font-bold text-primary dark:text-white mb-2.5 group-hover:text-accent dark:group-hover:text-accent transition-colors">
                  {rel.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {rel.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to={rel.link}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-accent transition-colors group/link"
                >
                  <span>Learn More</span>
                  <ArrowRight
                    size={14}
                    className="group-hover/link:translate-x-1 transition-transform text-accent"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
