import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Server,
  Activity,
  Cpu,
  Lock,
  Layers,
  Zap,
  Terminal,
  Database,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { PORTFOLIO_HERO_DATA } from "@/utils/portfolioData";

const PortfolioHeroShowcase = ({ data = PORTFOLIO_HERO_DATA }) => {
  const content = { ...PORTFOLIO_HERO_DATA, ...data };
  const { badgeText, headingPrefix, headingHighlight, description, pills, capabilities, mockup, milestones } = content;

  const [activeTab, setActiveTab] = useState("desktop");

  const tabContent = {
    desktop: {
      name: "WindowsUtils.com Engine",
      badge: "Desktop Binary Suite",
      description: "Local stream processing for MBOX, OST, PST files with zero cloud leaks.",
      stat1: { label: "Installations", val: "1k+ Active" },
      stat2: { label: "Formats Supported", val: "50+ Formats" },
      stat3: { label: "Data Integrity", val: "100% SHA-256" },
      link: "/portfolio/windowsutils",
    },
    search: {
      name: "FairSearches.com Mesh",
      badge: "High-Concurrency Directory",
      description: "Elasticsearch geospatial cluster with geo-distance queries under 5km.",
      stat1: { label: "Query Latency", val: "<80ms" },
      stat2: { label: "Listings Indexed", val: "50,000+" },
      stat3: { label: "SEO Growth", val: "+400%" },
      link: "/portfolio/fairsearches",
    },
    esg: {
      name: "EnviroSure Audit Ledger",
      badge: "ISO 14064 Compliance",
      description: "Automated carbon accounting engine calculating Scope 1-3 emissions.",
      stat1: { label: "Prep Time", val: "-70%" },
      stat2: { label: "Passed Audits", val: "120+" },
      stat3: { label: "Credit Value", val: "$50M+" },
      link: "/portfolio/envirosure-audits",
    },
  };

  const currentTab = tabContent[activeTab] || tabContent.desktop;

  return (
    <section className="pt-2 pb-8 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Hero Showcase Bento Grid */}
        <div className="bg-white/90s backdrop-blur-md rounded-3xl borders border-blue-100s shadow-xls shadow-blue-500/5s p-6 sm:p-7 lg:p-8 mb-2 relative overflow-hidden">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent/15 via-blue-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/40 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Unique Brand Pitch & Pillars */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/15 via-blue-50 to-accent/10 border border-accent/25 px-4 py-1 rounded-full shadow-xs">
                <Sparkles size={14} className="text-accent animate-pulse" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-accent">
                  {badgeText}
                </span>
              </div>

              <h1 className="text-x2l sm:text-3xl lg:text-[2.2rem] font-black text-primary leading-[1.18] tracking-tight">
                {headingPrefix}
                <span className="bg-gradient-to-r from-accent via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {headingHighlight}
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {description}
              </p>

              {/* 3 Quick Capability Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-">
                {(capabilities || []).map((cap, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100/80 text-left hover:bg-white hover:border-accent/40 transition-colors shadow-2xs"
                  >
                    <p className="text-xs font-black text-primary mb-0.5">{cap.stat}</p>
                    <p className="text-[11px] font-bold text-accent leading-tight mb-0.5">{cap.title}</p>
                    <p className="text-[10px] text-slate-500 leading-snug">{cap.subtitle}</p>
                  </div>
                ))}
              </div>

              {/* Unique Technical Pillars Tags */}
              <div className="pt-1 flex flex-wrap gap-2">
                {pills.map((pill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-blue-100 text-slate-700 text-xs font-semibold shadow-2xs"
                  >
                    <CheckCircle2 size={13} className="text-accent shrink-0" />
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Unique Interactive System Architecture Console */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              {/* Central System Monitor Hub */}
              <div className="w-full max-w-lg bg-gradient-to-br from-[#071a2f] via-[#0b2138] to-[#071a2f] rounded-3xl p-4 sm:p-6 shadow-2xl border border-blue-800/40 text-white relative">
                {/* Console Top Navigation Bar */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-blue-800/40">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                      <Terminal size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">
                        {mockup.platformName || "DVI Architecture Telemetry"}
                      </p>
                      <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        {mockup.systemStatus || "System Operational"}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-blue-950 border border-blue-800/60 text-blue-300">
                    Live Telemetry
                  </span>
                </div>

                {/* Interactive Benchmark Tabs */}
                <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-blue-900/40 mb-4">
                  {[
                    { id: "desktop", label: "Desktop Suite" },
                    { id: "search", label: "Search Engine" },
                    { id: "esg", label: "Compliance SaaS" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all text-center ${activeTab === tab.id
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-slate-400 hover:text-white"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Dynamic Card Body */}
                <div className="bg-slate-900/70 rounded-2xl p-4 border border-blue-800/30 mb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-accent font-bold">
                        {currentTab.badge}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-0.5">{currentTab.name}</h3>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      Verified
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {currentTab.description}
                  </p>

                  {/* 3 Metric Pills inside Tab */}
                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800/80">
                    <div className="text-center p-1.5 rounded-lg bg-slate-950/50">
                      <p className="text-xs font-black text-white">{currentTab.stat1.val}</p>
                      <p className="text-[9px] text-slate-400 font-mono mt-0.5">{currentTab.stat1.label}</p>
                    </div>
                    <div className="text-center p-1.5 rounded-lg bg-slate-950/50">
                      <p className="text-xs font-black text-accent">{currentTab.stat2.val}</p>
                      <p className="text-[9px] text-slate-400 font-mono mt-0.5">{currentTab.stat2.label}</p>
                    </div>
                    <div className="text-center p-1.5 rounded-lg bg-slate-950/50">
                      <p className="text-xs font-black text-emerald-400">{currentTab.stat3.val}</p>
                      <p className="text-[9px] text-slate-400 font-mono mt-0.5">{currentTab.stat3.label}</p>
                    </div>
                  </div>
                </div>

                {/* Telemetry Summary Strip */}
                <div className="flex items-center justify-between px-2 text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Activity size={12} className="text-emerald-400" /> Latency: 38ms avg
                  </span>
                  <span className="text-slate-500">|</span>
                  <span>142K+ Global Sessions</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-accent font-bold">100% Zero-Loss</span>
                </div>

                {/* Floating Architectural Badge */}
                {mockup.floatingCard && (
                  <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white text-slate-900 rounded-2xl p-3.5 shadow-2xl border border-blue-100 hidden sm:block">
                    <div className="flex items-center gap-1.5 mb-1">
                      <ShieldCheck size={14} className="text-accent" />
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                        {mockup.floatingCard.badge}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <p className="text-base font-black text-accent">
                        {mockup.floatingCard.primaryMetric}
                      </p>
                      <span className="text-[11px] font-bold text-slate-500">
                        {mockup.floatingCard.secondaryMetric}
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">
                      {mockup.floatingCard.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Impact Milestone Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {milestones.map((m, idx) => {
            const icons = [Cpu, Activity, Lock, Layers];
            const CardIcon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-6 border border-blue-100/90 hover:border-accent/40 shadow-xs hover:shadow-xl transition-all duration-300 flex items-start gap-4 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50/90 border border-blue-100 text-accent flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all shadow-xs">
                  <CardIcon size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-primary tracking-tight">{m.value}</h2>
                  <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">
                    {m.label}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioHeroShowcase;
