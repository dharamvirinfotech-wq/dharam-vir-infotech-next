import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { Plus } from "lucide-react";
import { homeFaqData } from "@/data/home-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
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

const FaqSection = ({
  badge = "FREQUENTLY ASKED QUESTIONS",
  titlePrefix = "Find Answers To",
  titleHighlight = "Common Questions",
  description = "Explore answers to common questions about our software development services, consulting, hiring models, and security practices.",
  items = homeFaqData,
  defaultOpenId,
  id = "faq",
}) => {
  const [openId, setOpenId] = useState(defaultOpenId !== undefined ? defaultOpenId : (items?.[0]?.id || null));

  const toggleFaq = (faqId) => {
    setOpenId(openId === faqId ? null : faqId);
  };

  if (!items || items.length === 0) return null;

  return (
    <section id={id} className="py-10 sm:py-12 md:py-14 bg-backgrounds relative overflow-hidden select-none">
      {/* Background Decorative Gradient Light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reusable Section Header */}
        <SectionHeader
          badge={badge}
          titlePrefix={titlePrefix}
          titleHighlight={titleHighlight}
          description={description}
        />

        {/* 2-Column Responsive FAQ Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-start max-w-6xl mx-auto"
        >
          {items.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className={`group rounded-2xl border transition-all duration-300 bg-card overflow-hidden ${isOpen
                    ? "border-accent/50 shadow-md shadow-accent/5 ring-1 ring-accent/20"
                    : "border-border/80 hover:border-accent/40 hover:shadow-xs"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 font-display font-bold text-primary dark:text-white text-sm sm:text-base leading-snug group-hover:text-accent transition-colors cursor-pointer"
                >
                  <span className="pr-2">{faq.question}</span>

                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen
                        ? "bg-accent text-white rotate-45 shadow-sm"
                        : "bg-primary/5 text-primary group-hover:bg-accent group-hover:text-white"
                      }`}
                  >
                    <Plus size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed border-t border-border/40 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
