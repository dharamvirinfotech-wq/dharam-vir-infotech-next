import { Link } from "@/lib/router-compat";
import heroBg from "@/assets/hero-bg.jpg";

const PageBanner = ({ title, subtitle, breadcrumb }) => {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 flex items-center overflow-hidden select-none">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Brand Primary Gradient Overlay with ambient depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/88 to-[#092552]/95" />

      {/* Subtle Ambient Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-accent/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-4 tracking-tight animate-fade-in-up">
          {title}
        </h1>

        {subtitle && (
          <p className="text-slate-200 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-5 leading-relaxed font-normal animate-fade-in-up-delay-1">
            {subtitle}
          </p>
        )}

        {breadcrumb && (
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs sm:text-sm text-slate-300 animate-fade-in-up-delay-2">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-accent font-semibold">{breadcrumb}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default PageBanner;
