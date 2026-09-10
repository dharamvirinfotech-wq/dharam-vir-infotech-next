import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Link } from "@/lib/router-compat";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlidesData } from "@/data/home-data";

const AnimatedHeroSection = () => {
  const slides = heroSlidesData;
  const [current, setCurrent] = useState(0);
  const [typedHighlight, setTypedHighlight] = useState("");
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Slower Slide interval: 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Typewriter effect for headingHighlight
  useEffect(() => {
    const targetText = slides[current]?.headingHighlight || "";
    setTypedHighlight("");
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex <= targetText.length) {
        setTypedHighlight(targetText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 60);

    return () => clearInterval(typingInterval);
  }, [current, slides]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slide = slides[current];

  return (
    <section
      id="home-animated"
      className="relative w-full min-h-[650px] sm:min-h-[690px] lg:min-h-[750px] xl:min-h-[790px] flex items-center overflow-x-clip text-slate-900 select-none pt-16 sm:pt-20 pb-4 z-10"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ========================================================================= */}
      {/* 1. BACKGROUND FLOATING SHAPES & DYNAMIC ORGANIC GLOWS                     */}
      {/* ========================================================================= */}

      {/* Floating Vibrant Orange Triangle */}

      <div className="absolute top-[26%] left-[7%] sm:left-[9%]  z-10 pointer-events-none animate-float-reverse hidden md:block opacity-60">
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
          <polygon
            points="20,4 36,36 4,36"
            stroke="hsl(var(--accent))"
            strokeWidth="3"
            fill="none"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Floating Cyan/Teal Triangle */}
      <div className="absolute top-[16%] left-[38%] sm:left-[41%] z-10 pointer-events-none animate-float-slow hidden sm:block">
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
          <polygon
            points="20,36 36,4 4,4"
            stroke="#0ea5e9"
            strokeWidth="3.5"
            fill="none"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Accent Plus (+) Particle */}
      <div className="absolute top-[20%] left-[10%] sm:left-[13%] z-10 pointer-events-none animate-float-reverse text-accent font-black text-2xl hidden sm:block select-none opacity-85">
        +
      </div>

      {/* Small Sky Plus (+) Particle */}
      <div className="absolute bottom-[24%] left-[44%] z-10 pointer-events-none animate-float-slow text-sky-500 font-black text-xl hidden lg:block select-none">
        +
      </div>

      {/* Deep Blue Plus (✕) Particle */}
      <div className="absolute bottom-[16%] left-[38%] z-10 pointer-events-none animate-float-slow text-primary font-bold text-2xl hidden md:block select-none opacity-75">
        ✕
      </div>

      {/* Large Subtle Watermark Background Typography (matches reference "SEO" in background) */}
      <div className="absolute left-[0%] top-[42%] -translate-y-1/2 select-none pointer-events-none font-display font-black text-[130px] sm:text-[200px] lg:text-[270px] text-slate-200/40 tracking-tighter leading-none -z-10">
        DV
      </div>

      {/* 
        Bottom Left Fluid Organic Swirl (Always visible, exactly matching reference):
        - Vibrant Warm Orange / Amber outer curve
        - Deep Navy / Dark Slate inner swirl
        - Elevated z-index (z-20) so it never gets clipped by StatsSection
      */}
      <div className="absolute -bottom-10 -left-10 sm:-bottom-20 sm:-left-28 lg:-left-40 w-[220px] sm:w-[300px] md:w-[380px] h-[220px] sm:h-[300px] md:h-[360px] pointer-events-none z-20">
        {/* Outer Vibrant Amber / Orange Wave */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent via-[#ff9e2c] to-[#ffba3b] rounded-[30%_70%_70%_30%/40%_40%_60%_60%] shadow-lg shadow-orange-500/20" />
        {/* Inner Dark Navy / Primary Curve */}
        <div className="absolute top-6 left-6 right-12 bottom-12 bg-[#2d2942] sm:bg-primary rounded-[35%_65%_65%_35%/45%_35%_65%_55%]" />
        {/* Very soft subtle glow at corner */}
        <div className="absolute -top-4 -right-4 w-28 h-28 bg-accent/20 rounded-full blur-xl" />
      </div>

      {/* Ambient Lighting Orbs - Soft Off-White & Brand Hues Depth */}
      <div className="absolute top-1/4 left-1/3 w-[650px] h-[450px] bg-sky-200/30 rounded-full blur-[160px] pointer-events-none -z-20" />
      <div className="absolute bottom-10 right-1/4 w-[550px] h-[400px] bg-orange-100/40 rounded-full blur-[150px] pointer-events-none -z-20" />

      {/* ========================================================================= */}
      {/* 2. MAIN HERO CONTENT (Split 2 Columns on Desktop)                         */}
      {/* ========================================================================= */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: Headings & CTA Buttons (Brand Navy + Accent Combinations) */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 sm:space-y-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-5 sm:space-y-6"
              >
                {/* Welcome / Category Tag */}
                <div className="inline-flex items-center gap-2">
                  <span className="w-8 h-[2.5px] bg-accent rounded-full" />
                  <span className="text-accent font-extrabold text-xs sm:text-sm tracking-widest uppercase font-mono">
                    WELCOME • {slide.categoryTag}
                  </span>
                </div>

                {/* Main Large Display Headline (Brand Primary #0e3a7e & Accent Orange) */}
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-display font-extrabold text-primary tracking-tight leading-[1.18]">
                  {slide.headingPrefix}
                  <span className="block text-accent mt-1 text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-accent via-orange-500 to-amber-500 bg-clip-text text-transparent min-h-[1.3em]">
                    {typedHighlight}
                    <span className="inline-block ml-1 w-[2.5px] h-[0.85em] align-middle bg-accent animate-pulse" />
                  </span>
                </h1>

                {/* Subtitle / Description */}
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal font-sans">
                  {slide.description}
                </p>

                {/* CTA Buttons - Full Circle Pill Shape (Brand Color Combinations) */}
                <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={slide.primaryCtaLink}
                      className="bg-accent hover:bg-primary text-white font-extrabold px-8 sm:px-9 py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-primary/30 inline-flex items-center gap-2.5 group"
                    >
                      <span>CONTACT TODAY</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={slide.secondaryCtaLink}
                      className="border-2 border-primary/25 hover:border-primary text-primary hover:bg-primary hover:text-white font-bold px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2 shadow-xs"
                    >
                      <span>{slide.secondaryCtaText}</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Hero Curved Image with Distinct Multi-Layered Glow Effect */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-[580px] h-[400px] sm:h-[440px] md:h-[490px] lg:h-[520px]">

              {/* Layer 1: Intense Soft Ambient Backlight Glow (Off-white/Cyan/Amber Aura) */}
              <div className="absolute -inset-6 rounded-[45%_55%_65%_35%/50%_45%_55%_50%] bg-gradient-to-tr from-cyan-400/25 via-sky-300/30 to-amber-300/30 blur-2xl pointer-events-none animate-pulse-glow -z-30" />

              {/* Layer 2: Warm Accent Glow directly hugging image edges */}
              <div className="absolute -inset-2 rounded-[42%_58%_65%_35%/50%_45%_55%_50%] bg-gradient-to-r from-accent/20 via-sky-400/25 to-primary/20 blur-xl pointer-events-none -z-20" />

              {/* Layer 3: Dynamic Orbiting Rings around the image silhouette */}
              <div className="absolute -inset-4 rounded-[42%_58%_65%_35%/50%_45%_55%_50%] border-[3px] border-cyan-400/50 animate-spin-slow pointer-events-none -z-10 shadow-lg shadow-cyan-400/20" />
              <div className="absolute -inset-7 rounded-[55%_45%_40%_60%/45%_55%_45%_55%] border-2 border-dashed border-accent/40 animate-float-reverse pointer-events-none -z-10" />

              {/* Cyan Accent Ring Floating Indicator */}
              <div className="absolute -top-3 left-1/4 w-12 h-12 rounded-full border-2 border-sky-400/70 pointer-events-none animate-float-slow -z-10" />

              {/* Masked Team Image Container matching the sweeping organic curve */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full relative rounded-[42%_58%_65%_35%/48%_45%_55%_52%] overflow-hidden shadow-[0_25px_60px_rgba(14,58,126,0.18 border- border-white/ ring- ring-white/"
                >
                  <Image
                    src={slide.bgImage}
                    alt={slide.headingHighlight}
                    fill
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    priority
                  />

                  {/* Luminous Soft White Daylight Glow Overlay over the people */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-transparent pointer-events-none mix-blend-screen" />
                  <div className="absolute -top-12 -left-12 w-80 h-80 rounded-full bg-white/45 blur-3xl pointer-events-none mix-blend-screen" />
                  <div className="absolute top-0 right-0 w-full h-full bg-radial from-transparent via-white/10 to-slate-900/10 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Bottom Right Floating Organic Swirls (Dark Navy & Warm Sand) */}
              <div className="absolute -bottom-8 -right-8 w-52 h-40 bg-gradient-to-tr from-primary to-slate-900 rounded-[40%_60%_50%_50%/50%_40%_60%_50%] -z-10 pointer-events-none shadow-xl animate-float-slow hidden sm:block" />
              <div className="absolute -bottom-10 -right-6 w-36 h-28 bg-amber-200/90 rounded-[50%_50%_40%_60%/45%_55%_45%_55%] -z-20 pointer-events-none blur-xs" />
            </div>
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="mt-8 sm:mt-12 flex items-center justify-center gap-2.5">
          {slides.map((s, idx) => (
            <button
              key={`slide-dot-${s.id}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-400 rounded-full ${idx === current
                ? "w-8 h-2.5 bg-accent shadow-md shadow-accent/40"
                : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedHeroSection;
