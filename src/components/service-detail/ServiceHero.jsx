import React from "react";
import { Link } from "@/lib/router-compat";
import { ChevronRight } from "lucide-react";
import ProductsMarqueeStrip from "@/components/ProductsMarqueeStrip";

export default function ServiceHero({ service }) {
  if (!service) return null;

  return (
    <div>
      {/* 1. HERO BANNER: Responsive with brand background and subtle image */}
      <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-[#0c2e63] text-white">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={service.img1 || service.image}
            alt={service.title}
            className="w-full h-full object-cover object-center opacity-25 filter brightness-90 contrast-110"
          />
          {/* Brand gradient overlay matching website primary tokens */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c2e63]/90 via-[#0e3a7e]/80 to-[#0c2e63]/95" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-xs">
            {service.title}
          </h1>

          {/* Breadcrumb Navigation */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs sm:text-sm text-slate-200 font-medium">
            <Link to="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <Link to="/services" className="hover:text-accent transition-colors">
              Services
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-accent font-semibold">{service.shortTitle || service.title}</span>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGE & FLAGSHIP PRODUCTS MARQUEE STRIP */}
      {/* <ProductsMarqueeStrip
        title={`YOUR TRUSTED ${service.title?.toUpperCase()}`}
      /> */}
    </div>
  );
}
