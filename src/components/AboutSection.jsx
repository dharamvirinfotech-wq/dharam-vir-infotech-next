import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { homeAboutFeatures, homeAboutHighlights } from "@/data/home-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const AboutSection = ({
  features = homeAboutFeatures,
  highlights = homeAboutHighlights,
}) => {
  return (
    <section id="about" className="py-10 sm:py-12 md:py-14 bg-backgrounds relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            className="lg:col-span-6 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SectionHeader
              badge="About Dharam Vir Infotech"
              titlePrefix="Your Trusted Partner for"
              titleHighlight="Digital Excellence"
              description="Dharam Vir Infotech is a premier global IT services company dedicated to transforming businesses through modern digital software, web application development, cloud architectures, and dedicated tech talent."
              centered={false}
              className="mb-4 sm:mb-4"
            />

            <p className="text-muted-foreground text-sm leading-relaxed">
              From startups to Fortune 500 enterprises, we combine human-centered design with robust software engineering to deliver solutions that scale effortlessly and drive long-term business value.
            </p>

            {/* Checklist */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CheckCircle2 size={18} className="text-accent shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/about"
                  className="bg-accent hover:bg-primary text-white font-bold px-7 sm:px-8 py-3.5 rounded-full text-sm sm:text-base transition-all duration-300 inline-flex items-center gap-2.5 shadow-xl hover:shadow-accent/20 group"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/mission-vision"
                  className="border border-border bg-card hover:bg-muted text-foreground font-semibold px-7 sm:px-8 py-3.5 rounded-full text-sm sm:text-base transition-all duration-300 inline-flex items-center gap-2.5 shadow-sm"
                >
                  <span>Mission & Vision</span>
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: 4 Strategic Feature Cards */}
          <motion.div
            className="lg:col-span-6 grid sm:grid-cols-2 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {features.map((f, index) => {
              const IconComponent = f.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-card border border-border/60 hover:border-accent/40 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                    <IconComponent size={22} />
                  </div>
                  <h4 className="font-display font-bold text-foreground text-base mb-2">
                    {f.title}
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
