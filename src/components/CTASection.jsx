import { ArrowRight, Sparkles, PhoneCall } from "lucide-react";
import { Link } from "@/lib/router-compat";

const CTASection = () => {
  return (
    <section className="py-12 sm:py-16 bg-whites text-slate-900 relative overflow-hidden border-t border-slate-100">
      {/* Background Soft Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-widest">
            <Sparkles size={14} />
            <span>Ready to Elevate Your Digital Footprint?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-slate-900">
            Let's Turn Ambitions Into <span className="text-accent">Achievements</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Whether you need custom software, cloud architecture, AI solutions, or a dedicated development team — we are here to bring your vision to life.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-accent hover:bg-primary text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl shadow-accent/25 hover:shadow-2xl hover:scale-[1.02] active:scale-95 flex items-center gap-2 text-base"
            >
              <span>Schedule Free Technical Consultation</span>
              <ArrowRight size={18} />
            </Link>
            <a
              href="tel:+918750299299"
              className="bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-800 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center gap-2 text-base"
            >
              <PhoneCall size={18} className="text-accent" />
              <span>Call Us Direct</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
