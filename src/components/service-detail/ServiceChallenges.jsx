import React, { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { getServiceIcon } from "./ServiceIcons";
import { AlertCircle, CheckCircle2, ArrowRight, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";

export default function ServiceChallenges({ service }) {
  const challenges = service?.businessChallenges || [];
  if (challenges.length === 0) return null;

  const [activeIdx, setActiveIdx] = useState(0);
  const activeChallenge = challenges[activeIdx] || challenges[0];

  return (
    <section className="py-[40px] relative overflow-hidden">
      {/* Decorative ambient background blur lights */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <SectionHeader
          badge="OVERCOMING HURDLES"
          titlePrefix="Business Challenges"
          titleHighlight="We Help You Overcome"
          description="Outdated tech environments and disconnected systems slow down progress. Discover how we turn operational friction into high-velocity business momentum."
          centered={true}
          className="mb-14"
        />

        {/* Brand New Layout: Interactive Problem-Resolution Showcase Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left: Interactive Challenge Selector List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            <div className="space-y-2.5">
              {challenges.map((item, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={item.id || idx}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                      isActive
                        ? "bg-white dark:bg-slate-800 border-accent shadow-lg shadow-accent/10 ring-2 ring-accent/20 translate-x-1"
                        : "bg-white/60 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800/90 hover:border-accent/50 hover:shadow-md hover:shadow-accent/5"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isActive
                            ? "bg-accent text-white shadow-xs font-bold"
                            : "bg-primary/5 text-primary dark:text-slate-300 group-hover:bg-accent group-hover:text-white group-hover:scale-105"
                        }`}
                      >
                        {getServiceIcon(item.icon, "w-5 h-5")}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase font-bold text-slate-400 group-hover:text-accent transition-colors block">
                          Obstacle 0{idx + 1}
                        </span>
                        <h4
                          className={`text-sm font-bold tracking-tight transition-colors ${
                            isActive
                              ? "text-accent dark:text-accent font-extrabold"
                              : "text-slate-700 dark:text-slate-200 group-hover:text-accent"
                          }`}
                        >
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    <ArrowRight
                      size={16}
                      className={`transition-all duration-300 shrink-0 ${
                        isActive
                          ? "text-accent translate-x-1"
                          : "text-slate-300 dark:text-slate-600 group-hover:text-accent group-hover:translate-x-1 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Deep-Dive Resolution Console (7 cols) */}
          <div className="lg:col-span-7">
            <div className="h-full bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
              {/* Subtle accent corner glow */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-accent/15 rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Header Tag Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-500 border border-red-200/60 dark:border-red-900 flex items-center justify-center">
                      <AlertCircle size={17} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                      Business Pain Point Analyser
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/5 text-primary dark:text-accent text-xs font-extrabold font-mono border border-primary/10">
                    DIAGNOSTIC #0{activeIdx + 1}
                  </span>
                </div>

                {/* Challenge Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-primary dark:text-white mb-4 leading-tight">
                  {activeChallenge.title}
                </h3>

                {/* Challenge Description */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                  {activeChallenge.desc}
                </p>

                {/* Engineered Solution Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-white dark:from-slate-800/80 dark:to-slate-900 border border-blue-100 dark:border-slate-700/80">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={18} className="text-accent shrink-0" />
                    <h5 className="text-xs font-bold uppercase tracking-wider text-primary dark:text-white font-mono">
                      How Dharam Vir Infotech Resolves This
                    </h5>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    We deploy battle-tested blueprints, automated continuous pipelines, and specialized senior talent to eradicate bottlenecks, cut operational overhead, and guarantee resilient uptime.
                  </p>
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 mt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                <div>
                  <div className="text-lg sm:text-2xl font-extrabold text-primary dark:text-accent font-display">
                    -45%
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium">Overhead Cost</div>
                </div>
                <div className="border-x border-slate-200/80 dark:border-slate-800">
                  <div className="text-lg sm:text-2xl font-extrabold text-primary dark:text-accent font-display">
                    3.8x
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium">Faster Delivery</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-extrabold text-primary dark:text-accent font-display">
                    99.9%
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium">SLA Adherence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
