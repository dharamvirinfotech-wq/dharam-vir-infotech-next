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
    <section className="py-8 sm:py-12 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 lg:p-9 shadow-xl shadow-slate-200/50 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-0">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className={`flex items-center gap-3.5 ${
                    idx !== 0 ? "lg:border-l lg:border-slate-200/60 lg:pl-5 xl:pl-6" : ""
                  }`}
                >
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-blue-50/80 border border-blue-100/60 flex items-center justify-center text-[#0e3a7e] flex-shrink-0 transition-transform hover:scale-105">
                    <Icon size={22} className="stroke-[2]" />
                  </div>

                  {/* Stat Text & Label */}
                  <div className="flex flex-col min-w-0">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#0e3a7e] tracking-tight leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-600 leading-tight mt-1.5">
                      {stat.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
