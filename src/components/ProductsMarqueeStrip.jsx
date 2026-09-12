import React from "react";
import { Link } from "@/lib/router-compat";
import { Sparkles } from "lucide-react";

/**
 * Default flagship products and client platforms of Dharam Vir Infotech.
 * Users can hover to pause continuous marquee movement.
 */
export const DEFAULT_PRODUCTS = [
  { name: "WindowsUtils", role: "Desktop Utility Suite", icon: "❖", link: "/portfolio/windowsutils" },
  { name: "FairSearches", role: "Local Search & Discovery Hub", icon: "⚡", link: "/portfolio/fairsearches" },
  { name: "EnviroSure Audit", role: "ESG Compliance & Carbon Ledger", icon: "⬡", link: "/portfolio/envirosure-audits" },
  { name: "PDF Bates Suite", role: "Legal e-Discovery Tool", icon: "◈", link: "/portfolio/windowsutils" },
  { name: "Cloud Migrator", role: "High-Speed IMAP Engine", icon: "✔", link: "/portfolio/windowsutils" },
];

export default function ProductsMarqueeStrip({
  title = "FLAGSHIP SOFTWARE PRODUCTS & TRUSTED CLIENT PLATFORMS",
  badge = "ENGINEERED PRODUCTS",
  products = DEFAULT_PRODUCTS,
  className = "",
}) {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...products, ...products];

  return (
    <div className={`relative py-6 sm:py-8 border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-2xs overflow-hidden ${className}`}>
      {/* Subtle background dot pattern matching website aesthetic */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#0e3a7e 0.75px, transparent 0.75px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Floating Pill Badge */}
      <div className="container mx-auto px-4 max-w-7xl relative z-10 mb-5 sm:mb-6">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-primary dark:text-blue-300 text-xs font-bold uppercase tracking-wider font-mono shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {title}
          </span>
        </div>
      </div>

      {/* Marquee Scroller Wrapper with Edge Gradients for Smooth In/Out */}
      <div className="relative w-full overflow-hidden group">
        {/* Left Fade Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />

        {/* Right Fade Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />

        {/* Continuous Animated Marquee Track with Hover Pause */}
        <div className="flex w-max animate-marquee pause-marquee gap-4 sm:gap-6 py-1">
          {marqueeItems.map((brand, i) => {
            const CardContent = (
              <div
                className="h-16 sm:h-20 min-w-[200px] sm:min-w-[240px] px-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:shadow-lg hover:border-accent hover:bg-blue-50/40 dark:hover:bg-slate-800 flex items-center gap-3.5 transition-all duration-300 group/card cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-slate-700 text-primary dark:text-blue-400 flex items-center justify-center font-bold text-base sm:text-lg group-hover/card:bg-accent group-hover/card:text-white group-hover/card:scale-110 transition-all duration-300 shadow-2xs shrink-0">
                  {brand.icon}
                </div>
                <div className="text-left overflow-hidden">
                  <h5 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight font-display group-hover/card:text-accent dark:group-hover/card:text-accent transition-colors truncate">
                    {brand.name}
                  </h5>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate">
                    {brand.role || "Enterprise Software"}
                  </p>
                </div>
              </div>
            );

            return brand.link ? (
              <Link key={i} to={brand.link} className="block shrink-0">
                {CardContent}
              </Link>
            ) : (
              <div key={i} className="block shrink-0">
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
