import { motion } from "framer-motion";
import { homeStatsData } from "@/data/home-data";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const StatsSection = ({ stats = homeStatsData }) => {
  return (
    <section className="py-8 sm:py-12 bg-slate-50/50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200/60 bg-white/70 backdrop-blur-xs text-center transition-all duration-300 hover:shadow-md hover:border-slate-300 group"
              >
                <div className="p-2 sm:p-2.5 rounded-lg bg-orange-50 text-accent mb-3 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight font-display">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1 leading-snug">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
