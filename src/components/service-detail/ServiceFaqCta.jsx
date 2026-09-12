import React, { useState } from "react";
import { Link } from "@/lib/router-compat";
import SectionHeader from "@/components/SectionHeader";
import { Plus, Minus, ArrowRight } from "lucide-react";

export default function ServiceFaqCta({ service }) {
  const [openFaq, setOpenFaq] = useState(0);

  if (!service?.faqs || service.faqs.length === 0) return null;

  return (
    <section className="py-[40px] relative">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Unified Section Header matching Home Page style */}
        <SectionHeader
          badge="FREQUENTLY ASKED QUESTIONS"
          titlePrefix="Got Questions About"
          titleHighlight={service.shortTitle || service.title}
          description="Everything you need to know about our technology architecture, engineering velocity, and long-term SLA maintenance."
          centered={false}
          className="mb-10 max-w-3xl"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3.5">
            {service.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-2xs hover:border-accent/40 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 select-none focus:outline-none cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-primary dark:text-white">
                      {faq.question}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: High-Impact Consultation Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary via-[#0a2a5e] to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-primary/40">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

            <span className="inline-block px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono font-bold uppercase tracking-wider mb-4">
              Direct Solutions Architect
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3.5 leading-tight">
              Ready To Simplify Your {service.shortTitle || service.title}?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-8 leading-relaxed">
              Partner with a dedicated engineering team and focus on scaling your core business while we architect, secure, and manage your technology stack.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all"
              >
                <span>Get Free Consultation</span>
                <ArrowRight size={15} />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-xl border border-white/20 transition-all backdrop-blur-xs"
              >
                <span>Contact Us</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
