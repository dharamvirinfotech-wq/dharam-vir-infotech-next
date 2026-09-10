import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { ArrowRight } from "lucide-react";
import { homeProcessStepsData } from "@/data/home-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const ProcessSection = ({ steps = homeProcessStepsData }) => {
  return (
    <section className="py-10 sm:py-12 md:py-14 bg-backgrounds relative overflow-hidden">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reusable Section Header */}
        <SectionHeader
          badge="OUR PROVEN SOFTWARE DEVELOPMENT PROCESS"
          titlePrefix="Our Proven"
          titleHighlight="Development Methodology"
          description="We follow a structured development methodology that ensures project transparency, quality assurance, and successful outcomes."
        />

        {/* Desktop Process Pipeline (7 Columns on LG screens) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="hidden lg:grid grid-cols-7 gap-4 relative pt-4"
        >
          {/* Horizontal Connecting Line behind icons */}
          <div className="absolute top-[48px] left-[7%] right-[7%] h-[2px] border-t-2 border-dashed border-slate-200 dark:border-slate-800 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isNotLast = idx < steps.length - 1;

            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative z-10 flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Node Icon Circle + Floating Number Badge */}
                <div className="relative mb-3">
                  <motion.div
                    whileHover={{ scale: 1.12, y: -2 }}
                    className="w-16 h-16 rounded-full bg-card border-2 border-border group-hover:border-accent group-hover:bg-accent text-primary group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-accent/20"
                  >
                    <Icon size={22} className="transition-transform group-hover:scale-110" />
                  </motion.div>

                  {/* Step Number Badge */}
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-white border-2 border-background font-mono font-bold text-[11px] flex items-center justify-center shadow-xs">
                    {step.number}
                  </span>

                  {/* Connector Arrow for Desktop */}
                  {isNotLast && (
                    <div className="absolute top-1/2 -right-6 -translate-y-1/2 text-slate-300 dark:text-slate-700 group-hover:text-accent transition-colors hidden xl:block z-20">
                      <ArrowRight size={14} />
                    </div>
                  )}
                </div>

                {/* Step Title */}
                <h3 className="font-display text-xs sm:text-sm font-bold text-primary dark:text-white mb-1.5 group-hover:text-accent transition-colors leading-snug">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans leading-relaxed max-w-[130px]">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile & Tablet Responsive Process Flow (SM & MD screens) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:hidden pt-2"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group bg-card border border-border/80 hover:border-accent/40 rounded-2xl p-5 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-all">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-accent">
                      Step 0{step.number}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-primary dark:text-white mb-1.5 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
