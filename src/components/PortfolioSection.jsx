import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { homeFeaturedProjects } from "@/data/home-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const PortfolioSection = ({ items = homeFeaturedProjects }) => {
  return (
    <section id="portfolio" className="py-10 sm:py-12 md:py-14 bg-background relative overflow-hidden">
      {/* Background Decorative Gradient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
          <SectionHeader
            badge="Featured Work"
            titlePrefix="Driven by Client"
            titleHighlight="Success"
            centered={false}
            className="mb-0 sm:mb-0"
          />
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-primary hover:underline shrink-0 transition-colors"
          >
            <span>Browse All Case Studies</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* 4 Selected Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {items.map((project, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative bg-card border border-border/80 hover:border-accent/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
            >
              <div>
                {/* Category & Arrow Badge */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                    {project.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-primary dark:text-white group-hover:text-accent transition-colors duration-300 mb-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6">
                  {project.desc}
                </p>
              </div>

              {/* Tags and Link */}
              <div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-secondary text-foreground/80 border border-border/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={project.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-slate-200 group-hover:text-accent transition-colors"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
