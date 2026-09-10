import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { homeWhyChooseUsData } from "@/data/home-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const WhyChooseUsSection = ({ items = homeWhyChooseUsData }) => {
  return (
    <section id="why-choose-us" className="py-10 sm:py-12 md:py-14 bg-backgrounds relative overflow-hidden select-none">
      {/* Subtle Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          badge="WHY DHARAM VIR INFOTECH"
          titlePrefix="Engineered For Speed,"
          titleHighlight="Security & Scale"
          description="We are not just service vendors; we are your end-to-end technical partners architecting mission-critical platforms with zero compromise."
        />

        {/* 6 Value Prop Cards (3 columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-7xl mx-auto"
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="group relative bg-card rounded-2xl p-6 sm:p-7 border border-border/80 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      <Icon size={24} />
                    </div>

                    <span className="px-3 py-1 rounded-full text-[11px] font-bold font-mono tracking-wide uppercase bg-secondary text-primary dark:text-slate-300 border border-border/60 group-hover:border-accent/30 group-hover:text-accent transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-primary dark:text-white group-hover:text-accent transition-colors duration-300 mb-2.5">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-border/40 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-accent transition-colors">
                    Enterprise Standard
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-accent transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
