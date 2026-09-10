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
    <section id="process" className="py-10 sm:py-12 md:py-14 bg-background relative overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          badge="OUR DEVELOPMENT WORKFLOW"
          titlePrefix="Engineered For Speed &"
          titleHighlight="Flawless Execution"
          description="A structured, transparent, and agile software development lifecycle designed to minimize technical risk and accelerate time-to-market."
        />

        {/* 7-Step Process Timeline Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-7xl mx-auto"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className={`group relative bg-card rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${
                  isLast
                    ? "sm:col-span-2 lg:col-span-1 border-accent/40 bg-accent/5 hover:border-accent"
                    : "border-border/80 hover:border-accent/40 hover:shadow-accent/5"
                }`}
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span
                      className={`text-2xl sm:text-3xl font-mono font-black ${
                        isLast
                          ? "text-accent"
                          : "text-slate-300 dark:text-slate-700 group-hover:text-accent transition-colors"
                      }`}
                    >
                      0{step.number}
                    </span>

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isLast
                          ? "bg-accent text-white"
                          : "bg-primary/5 text-primary group-hover:bg-accent group-hover:text-white"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-base sm:text-lg font-bold text-primary dark:text-white group-hover:text-accent transition-colors duration-300 mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Step Indicator Bar */}
                <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Phase 0{step.number}
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-slate-400 group-hover:text-accent group-hover:translate-x-1 transition-all"
                  />
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
