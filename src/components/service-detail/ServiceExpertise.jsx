import React, { useState } from "react";
import { getServiceIcon } from "./ServiceIcons";
import { Sparkles, CheckCircle2, Award, Zap, ArrowRight, ShieldCheck, Star } from "lucide-react";
import SectionHeader from "../SectionHeader";

export default function ServiceExpertise({ service }) {
  if (!service) return null;

  const [activeItem, setActiveItem] = useState(0);
  const expertiseList = service.expertise || service.items || [];

  return (
    <section className="py-[40px] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header using standard website design tokens */}
        <SectionHeader
          badge="ENTERPRISE ENGINEERING"
          titlePrefix={service.headline || "Elite Senior Tech Talent Ready to"}
          titleHighlight={service.headlineCut || "Embed into Your Sprints"}
          description={service.description || service.desc}
          centered={false}
          className="mb-10 max-w-4xl"
        />

        {/* Brand New Modern Split Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Interactive Visual Image with floating Glassmorphism Badges */}
          <div className="lg:col-span-5 relative group">
            {/* Background Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/20 to-blue-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-700" />

            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-white/60 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] overflow-hidden">
                <img
                  src={service.img2 || service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Glassmorphic Stats Pill on Image */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg border border-white/40 dark:border-slate-700">
                <div className="w-8 h-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center font-bold">
                  <Star size={16} className="fill-accent text-accent" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Vetted Team</p>
                  <p className="text-xs font-extrabold text-primary dark:text-white mt-0.5">Top 1% Engineers</p>
                </div>
              </div>

              {/* Bottom Glassmorphic Banner */}
              <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-md text-white border border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent text-slate-900 flex items-center justify-center font-bold">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold leading-tight">ISO & Enterprise Certified</h5>
                    <p className="text-[11px] text-slate-300">Guaranteed SLAs & Zero-Day Support</p>
                  </div>
                </div>
                <span className="text-accent text-xs font-bold tracking-wider font-mono uppercase bg-accent/20 px-2.5 py-1 rounded-lg">
                  99.9%
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Modern Expertise Cards Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg sm:text-xl font-bold text-primary dark:text-white flex items-center gap-2">
                <span className="w-2 h-5 rounded-full bg-accent inline-block" />
                Core Technical Specializations
              </h3>
              <span className="text-xs font-semibold text-slate-500 font-mono">
                {expertiseList.length} Competencies
              </span>
            </div>

            {/* Grid of modern, interactive expertise tags with icons and subtle borders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {expertiseList.map((exp, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveItem(i)}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 group cursor-pointer ${activeItem === i
                      ? "bg-white dark:bg-slate-800 border-accent/50 shadow-md translate-x-1"
                      : "bg-white/70 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 hover:border-accent/30 hover:bg-white"
                    }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${activeItem === i
                        ? "bg-accent text-white shadow-xs"
                        : "bg-primary/5 text-primary dark:text-accent group-hover:bg-accent group-hover:text-white"
                      }`}
                  >
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug group-hover:text-primary dark:group-hover:text-accent transition-colors">
                    {exp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Feature Value Pillars with Sleek Modern Gradients */}
        {service.featureCards && service.featureCards.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {service.featureCards.map((card, i) => (
                <div
                  key={i}
                  className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top accent gradient line on hover */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 text-primary dark:text-accent flex items-center justify-center mb-5 border border-primary/15 dark:border-slate-700 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {getServiceIcon(card.icon, "w-6 h-6")}
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-primary dark:text-white mb-2 leading-snug">
                      {card.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3 Highlights / Strategic Impact Cards with Clean Distinct Layout */}
        {/* {service.highlights && service.highlights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.highlights.map((h, i) => (
              <div
                key={i}
                className="relative bg-gradient-to-b from-white to-blue-50/40 dark:from-slate-900 dark:to-slate-800/50 rounded-3xl p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 rounded-2xl bg-accent/15 text-accent flex items-center justify-center border border-accent/25">
                      <Sparkles size={18} />
                    </span>
                    <span className="text-[11px] font-mono font-bold text-primary/60 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-2xs">
                      PHASE 0{i + 1}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-primary dark:text-white mb-2.5 leading-snug">
                    {h.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </section>
  );
}
