import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { homeAiSolutionsData } from "@/data/home-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const AiSolutionsSection = ({ items = homeAiSolutionsData }) => {
  return (
    <section id="ai-solutions" className="py-10 sm:py-12 md:py-14 bg-background relative overflow-hidden select-none">
      {/* Ambient Neural Network Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          badge="AGENTIC & GENERATIVE AI"
          titlePrefix="Transforming Operations With"
          titleHighlight="Autonomous Intelligence"
          description="Move beyond basic automation. We engineer custom agentic workflows, fine-tuned LLMs, and enterprise AI engines that think, decide, and act autonomously."
        />

        {/* 6 AI Cards (Responsive Grid) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-7xl mx-auto"
        >
          {items.map((ai) => {
            const Icon = ai.icon;
            return (
              <motion.div
                key={ai.id}
                variants={cardVariants}
                className="group relative bg-card rounded-2xl p-6 sm:p-7 border border-border/80 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      <Icon size={24} />
                    </div>

                    <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold font-mono tracking-wide uppercase bg-secondary text-primary dark:text-slate-300 border border-border/60 group-hover:border-accent/30 group-hover:text-accent transition-colors">
                      {ai.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-primary dark:text-white group-hover:text-accent transition-colors duration-300 mb-2.5">
                    {ai.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {ai.desc}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-border/40 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-accent transition-colors">
                    AI Capability
                  </span>
                  <div className="w-2 h-2 rounded-full bg-accent/30 group-hover:bg-accent transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AiSolutionsSection;
