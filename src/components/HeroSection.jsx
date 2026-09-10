import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowRight, ChevronLeft, ChevronRight, Facebook, Instagram, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlidesData } from "@/data/home-data";

const HeroSection = () => {
  const slides = heroSlidesData;
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

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

  // Text Fade In + Slide Up Animation
  const contentFadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: (customDelay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
        delay: customDelay,
      },
    }),
  };

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-slate-950 text-white select-none min-h-[480px] sm:min-h-[520px] lg:min-h-[580px] flex items-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        {slides.map((slide, index) =>
          index === current ? (
            <motion.div
              key={slide.id}
              className="absolute inset-0 w-full h-full flex items-center py-8 md:py-10 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* 1. Background Image Zoom Effect */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url(${slide.bgImage})` }}
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />

              {/* 2. Soft Background Glow Wipe/Fade Effect (Balancing Light - Soft & Elegant) */}
              <motion.div
                className="absolute inset-0 w-full h-full bg-gradient-to-t from-white/90 via-white/40 to-transparent pointer-events-none z-0 blur-2xl origin-bottom"
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: [0, 0.25, 0], y: ["100%", "0%", "-20%"] }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              />

              {/* 3. Dark Gradient Overlays for Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent pointer-events-none z-0" />
              <div className="absolute inset-0 bg-slate-950/30 backdrop-brightness-[0.85] pointer-events-none z-0" />

              {/* 4. Slide Content */}
              <div className="container mx-auto px-6 sm:px-12 md:px-16 relative z-10">
                <div className="max-w-3xl space-y-5">
                  {/* Category Tag */}
                  <motion.div
                    className="flex items-center gap-3"
                    variants={contentFadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.15}
                  >
                    <span className="w-10 h-[2.5px] bg-accent rounded-full" />
                    <span className="text-accent font-bold text-xs sm:text-sm tracking-widest uppercase font-mono">
                      {slide.categoryTag}
                    </span>
                  </motion.div>

                  {/* Heading */}
                  <motion.h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white"
                    variants={contentFadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.25}
                  >
                    {slide.headingPrefix}
                    <span className="text-accent bg-gradient-to-r from-amber-400 via-accent to-orange-500 bg-clip-text text-transparent block sm:inline">
                      {slide.headingHighlight}
                    </span>
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mt-3 font-normal drop-shadow"
                    variants={contentFadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.4}
                  >
                    {slide.description}
                  </motion.p>

                  {/* Buttons - rounded-full restored as original */}
                  <motion.div
                    className="pt-5 flex flex-wrap items-center gap-3.5"
                    variants={contentFadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.55}
                  >
                    <Link
                      to={slide.primaryCtaLink}
                      className="inline-flex items-center gap-2.5 bg-accent hover:bg-primary text-white px-7 sm:px-8 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 group"
                    >
                      <span>{slide.primaryCtaText}</span>
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                    <Link
                      to={slide.secondaryCtaLink}
                      className="inline-flex items-center gap-2.5 bg-slate-900/80 hover:bg-slate-900 border border-white/25 hover:border-white/50 text-white px-7 sm:px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all backdrop-blur-md hover:scale-105 active:scale-95"
                    >
                      <span>{slide.secondaryCtaText}</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Bottom Center Dot Controls */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-slate-950/75 backdrop-blur-md px-5 py-2 rounded-full border border-white/15">
        {slides.map((s, idx) => (
          <button
            key={`dot-${s.id}`}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-500 rounded-full ${idx === current
              ? "w-4 h-4 bg-accent border-2 border-white scale-110 shadow-lg shadow-accent/50"
              : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70 border border-white/30"
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Arrow Controls */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/70 border border-white/15 text-white hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center backdrop-blur-md"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/70 border border-white/15 text-white hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center backdrop-blur-md"
        aria-label="Next Slide"
      >
        <ChevronRight size={20} />
      </button> */}

      {/* Right Side Floating Social Sidebar */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-5">
        {/* <span className="writing-vertical text-[10px] uppercase font-mono tracking-widest text-slate-300 select-none pb-2">
          CONNECT
        </span> */}
        <div className="w-[1px] h-8 bg-white/20" />
        <div className="flex flex-col gap-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white text-slate-900 hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110 shadow-lg"
            aria-label="Facebook"
          >
            <Facebook size={20} fill="currentColor" className="stroke-none" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white text-slate-900 hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110 shadow-lg"
            aria-label="Instagram"
          >
            <Instagram size={20} className="stroke-[2.2]" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white text-slate-900 hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110 shadow-lg"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} fill="currentColor" className="stroke-none" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
