import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { homeTechnologiesCategories } from "@/data/home-data";

const TechnologiesSection = ({ categories = homeTechnologiesCategories }) => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate list to achieve seamless infinite loop
  const duplicatedCategories = [...categories, ...categories];

  return (
    <section
      id="technologies"
      className="py-10 sm:py-12 md:py-14 bg-backgrounds relative overflow-hidden select-none"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        {/* Section Header */}
        <SectionHeader
          badge="OUR TECHNOLOGY STACK"
          titlePrefix="Engineered With Modern,"
          titleHighlight="High-Performance Tech"
          description="We leverage industry-standard frameworks, scalable cloud architectures, and battle-tested databases to construct bulletproof enterprise platforms."
        />
      </div>

      {/* Infinite Smooth Marquee Slider Container */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left & Right Gradient Shadows for seamless fading */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Moving Marquee Track */}
        <div
          className="animate-marquee pause-marquee py-2 px-4 flex items-stretch gap-4 sm:gap-5"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {duplicatedCategories.map((cat, idx) => (
            <div
              key={`${cat.id}-${idx}`}
              onClick={() => setIsPaused((prev) => !prev)}
              className="w-[240px] sm:w-[260px] md:w-[270px] shrink-0 bg-card rounded-2xl p-4 sm:p-5 border border-border/80 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Category Header */}
                <div className="mb-3 pb-2.5 border-b border-border/40 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-primary dark:text-white group-hover:text-accent transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-[10.5px] text-slate-400 mt-0.5 line-clamp-1">
                      {cat.subtitle}
                    </p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                </div>

                {/* Tech Pills List (Compact Spacing) */}
                <div className="space-y-2">
                  {cat.items.map((tech) => {
                    const Icon = tech.icon;
                    return (
                      <div
                        key={tech.name}
                        className="flex items-center gap-2.5 p-1.5 px-2 rounded-xl bg-secondary/50 border border-border/40 group-hover:bg-secondary/80 group-hover:border-accent/30 transition-all duration-200"
                      >
                        <div className="w-6 h-6 rounded-lg bg-card text-accent flex items-center justify-center shrink-0 border border-border/40 shadow-2xs">
                          <Icon size={13} />
                        </div>
                        <span className="text-xs font-semibold text-primary dark:text-slate-200">
                          {tech.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Subtle Status */}
              <div className="pt-3 mt-3 border-t border-border/40 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Production Ready
                </span>
                <span className="text-[10px] font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
