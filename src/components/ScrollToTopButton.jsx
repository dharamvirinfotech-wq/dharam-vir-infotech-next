import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={scrollToTop}
          className="fixed right-4 sm:right-6 bottom-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent hover:bg-primary text-white flex items-center justify-center shadow-2xl shadow-orange-500/30 hover:scale-110 active:scale-95 transition-all duration-300 select-none"
          aria-label="Scroll to top"
          initial={{ scale: 0, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 15 }}
          transition={{ duration: 0.25 }}
        >
          <ArrowUp size={22} className="stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
