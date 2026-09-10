import { useState } from "react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import SectionHeader from "@/components/SectionHeader";
import FaqSection from "@/components/FaqSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { missionVisionData } from "@/data/mission";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  CheckCircle2,
  Compass,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/lib/router-compat";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const MissionVision = () => {
  const { header, mission, vision, coreValues, pillars, faqs } = missionVisionData;

  return (
    <div className="min-h-screen bg-backgrounds bg-gradient-to-br from-[#f6f9fc] via-[#edf2f8] to-[#f8fafc] select-none">
      <AnimatedNavbar />

      {/* Hero / Page Banner */}
      <PageBanner
        title="Mission & Vision"
        subtitle="Discover our purpose, our long-term vision, and the core engineering principles that drive Dharam Vir Infotech forward."
        breadcrumb="Mission & Vision"
      />

      {/* 1. Introduction Statement */}
      <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={header.badge}
            titlePrefix={header.titlePrefix}
            titleHighlight={header.titleHighlight}
            description={header.description}
          />
        </div>
      </section>

      {/* 2. Side-by-Side Mission & Vision Cards */}
      <section className="py-8 sm:py-12 bg-slate-50/50 dark:bg-slate-900/30 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="bg-card border border-border/80 hover:border-accent/50 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-accent/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20">
                    <Target size={28} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                      {mission.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-display font-extrabold text-primary dark:text-white">
                      Purpose Driven
                    </h2>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-display font-bold text-primary dark:text-white mb-4">
                  {mission.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                  {mission.description}
                </p>

                <div className="space-y-3 pt-2">
                  {mission.points.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-accent shrink-0 mt-0.5"
                      />
                      <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-border/50 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>EXECUTION & RESULTS</span>
                <span className="text-accent font-bold">100% COMMITTED</span>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="bg-card border border-border/80 hover:border-accent/50 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-primary/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                    <Eye size={28} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary dark:text-accent">
                      {vision.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-display font-extrabold text-primary dark:text-white">
                      Future Horizon
                    </h2>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-display font-bold text-primary dark:text-white mb-4">
                  {vision.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                  {vision.description}
                </p>

                <div className="space-y-3 pt-2">
                  {vision.points.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-accent shrink-0 mt-0.5"
                      />
                      <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-border/50 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>GLOBAL IMPACT</span>
                <span className="text-primary dark:text-accent font-bold">INNOVATING FOR TOMORROW</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Strategic Pillars */}
      <section className="py-14 sm:py-18 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="FOUNDATIONAL PILLARS"
            titlePrefix="The Four Tenets Of Our"
            titleHighlight="Engineering Standard"
            description="Our technological backbone is anchored upon four uncompromising pillars that dictate every sprint, release, and client delivery."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="bg-card border border-border/70 rounded-2xl p-6 hover:border-accent/40 hover:shadow-md transition-all duration-300 relative group"
              >
                <div className="text-3xl sm:text-4xl font-mono font-black text-accent/30 group-hover:text-accent transition-colors mb-3">
                  {pillar.number}
                </div>
                <h4 className="font-display font-bold text-base sm:text-lg text-primary dark:text-white mb-2 group-hover:text-accent transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Values Section */}
      <section className="py-12 sm:py-16 bg-slate-50/50 dark:bg-slate-900/40 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="OUR CORE VALUES"
            titlePrefix="Principles That"
            titleHighlight="Define Who We Are"
            description="Our core values guide our technology recommendations, transparent client interactions, and high-performance team culture."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.id}
                  variants={cardVariants}
                  className="bg-card rounded-2xl p-6 sm:p-7 border border-border/80 hover:border-accent/40 transition-all duration-300 hover:shadow-lg flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-5">
                      <Icon size={24} />
                    </div>

                    <h3 className="font-display text-lg font-bold text-primary dark:text-white group-hover:text-accent transition-colors mb-2.5">
                      {val.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-accent transition-colors">
                    <span>Our Standard</span>
                    <Sparkles size={14} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 5. Props-Driven FAQ Component With Dedicated Mission & Vision FAQs */}
      <FaqSection
        id="mission-faq"
        badge="MISSION & VISION FAQ"
        titlePrefix="Answers Regarding Our"
        titleHighlight="Mission & Commitments"
        description="Learn more about how our mission and core principles shape our client engagements, security guarantees, and engineering culture."
        items={faqs}
      />

      {/* 6. CTA Banner */}
      <CTASection />

      {/* 7. Global Footer */}
      <Footer />
    </div>
  );
};

export default MissionVision;
