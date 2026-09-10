import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
export const SectionHeader = ({ badge, titlePrefix, titleHighlight, description, centered = true, className = "", }) => {
    return (<div className={`${centered ? "text-center max-w-3xl mx-auto" : "max-w-3xl"} mb-6 sm:mb-8 space-y-3 ${className}`}>
      <motion.div initial={{ opacity: 0, y: -12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/15 text-[11px] font-bold uppercase tracking-widest font-mono shadow-sm">
        <Sparkles size={13} className="text-accent shrink-0 animate-spin-slow"/>
        <span>{badge}</span>
      </motion.div>

      <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }} className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight leading-[1.18]">
        {titlePrefix}{" "}
        <span className="text-accent bg-gradient-to-r from-primary via-accent to-amber-500 bg-clip-text text-transparent block sm:inline">
          {titleHighlight}
        </span>
      </motion.h2>

      {description && (<motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }} className="text-xs sm:text-sm md:text-base text-slate-500 dark:text-slate-400 font-sans leading-relaxed pt-0.5">
          {description}
        </motion.p>)}
    </div>);
};
export default SectionHeader;
