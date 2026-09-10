import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { homeTechnologiesCategories } from "@/data/home-data";

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

const TechnologiesSection = ({ categories = homeTechnologiesCategories }) => {
  return (
    <section id="technologies" className="py-10 sm:py-12 md:py-14 bg-background relative overflow-hidden select-none">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          badge="OUR TECHNOLOGY STACK"
          titlePrefix="Engineered With Modern,"
          titleHighlight="High-Performance Tech"
          description="We leverage industry-standard frameworks, scalable cloud architectures, and battle-tested databases to construct bulletproof enterprise platforms."
        />

        {/* 5-Column Responsive Tech Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 max-w-7xl mx-auto"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={cardVariants}
              className="bg-card rounded-2xl p-5 sm:p-6 border border-border/80 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 flex flex-col justify-between group"
            >
              <div>
                {/* Category Header */}
                <div className="mb-4 pb-3 border-b border-border/40">
                  <h3 className="font-display font-bold text-base text-primary dark:text-white group-hover:text-accent transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Tech Pills List */}
                <div className="space-y-2.5">
                  {cat.items.map((tech) => {
                    const Icon = tech.icon;
                    return (
                      <div
                        key={tech.name}
                        className="flex items-center gap-3 p-2 rounded-xl bg-secondary/50 border border-border/40 hover:bg-secondary hover:border-accent/30 transition-all duration-200"
                      >
                        <div className="w-7 h-7 rounded-lg bg-card text-accent flex items-center justify-center shrink-0 border border-border/40 shadow-2xs">
                          <Icon size={14} />
                        </div>
                        <span className="text-xs font-semibold text-primary dark:text-slate-200">
                          {tech.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Subtle Status */}
              <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Production Ready
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
