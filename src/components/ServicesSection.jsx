import SectionHeader from "@/components/SectionHeader";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { homeServicesData } from "@/data/home-data";

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

const rightColumnVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const ServicesSection = ({ services = homeServicesData }) => {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section id="services" className="py-12 sm:py-16 bg-backgrounds relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: 6 Cards Grid (7 cols on desktop) */}
          <motion.div
            className="lg:col-span-7 grid sm:grid-cols-2 gap-5 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {services.map((service, idx) => {
              const Icon = service.icon;
              const isActive = activeCard === idx;
              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onMouseEnter={() => setActiveCard(idx)}
                  className={`group relative bg-background border rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer ${isActive
                      ? "border-accent/60 shadow-xl shadow-accent/5 ring-1 ring-accent/30"
                      : "border-border/80 hover:border-accent/40 hover:shadow-md"
                    }`}
                >
                  {/* Badge if available */}
                  {service.badge && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent px-2 py-0.5 rounded-full border border-accent/20">
                      {service.badge}
                    </span>
                  )}

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive
                            ? "bg-accent text-white"
                            : "bg-muted text-primary group-hover:bg-accent/10 group-hover:text-accent"
                          }`}
                      >
                        <Icon size={20} />
                      </div>
                      <h3 className="font-display font-bold text-primary text-base leading-snug">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-xs md:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-border/50 flex items-center justify-between">
                    <Link
                      to={service.link}
                      className="text-xs font-bold text-accent hover:underline inline-flex items-center gap-1 font-sans"
                    >
                      Learn More <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Column: Title + Description + Action Buttons */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            variants={rightColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <SectionHeader
              badge="LATEST SERVICES & AI SOLUTIONS"
              titlePrefix="Empowering Innovation With"
              titleHighlight="Next-Gen AI & Tech Solutions"
              description="From custom software engineering and mobile apps to cutting-edge AI automation and cloud infrastructure — Dharamvir Info Tech delivers future-proof digital solutions tailored to accelerate your business growth."
              centered={false}
              className="mb-4 sm:mb-4"
            />

            {/* Dual Action Buttons (Exact Original Style) */}
            <div className="pt-2 flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center bg-accent hover:bg-primary text-white font-bold px-7 py-3.5 rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Explore All Services
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                <Link
                  to="/services"
                  className="w-12 h-12 rounded-full bg-accent hover:bg-primary text-white flex items-center justify-center transition-all duration-300 shadow-md"
                  aria-label="View All Services"
                >
                  <ArrowUpRight size={20} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
