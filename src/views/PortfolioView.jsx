import { useState, useEffect } from "react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { caseStudiesApi } from "@/lib/api";
import { Link } from "@/lib/router-compat";
import {
  ArrowRight,
  ExternalLink,
  Loader2,
  Search,
  Sparkles,
  Layers,
  ChevronDown,
} from "lucide-react";

// Standard Industry & Brand Icons from react-icons
import {
  SiFlutter,
  SiReact,
  SiSwift,
  SiKotlin,
  SiFirebase,
  SiNodedotjs,
  SiDotnet,
  SiLaravel,
  SiGooglecloud,
  SiGraphql,
  SiSqlite,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { TbApi } from "react-icons/tb";

import {
  FaHeartbeat,
  FaCashRegister,
  FaBuilding,
  FaUtensils,
  FaGraduationCap,
  FaLandmark,
  FaIndustry,
  FaShippingFast,
  FaShieldAlt,
  FaShoppingCart,
  FaAws,
} from "react-icons/fa";

// ─── 16 EXACT TECHNOLOGIES FROM REFERENCE IMAGE (Using react-icons) ───
const TECH_STACK_ITEMS = [
  { name: "Flutter", role: "CROSS-PLATFORM", icon: SiFlutter, color: "text-[#02569B]" },
  { name: "React Native", role: "CROSS-PLATFORM", icon: SiReact, color: "text-[#61DAFB]" },
  { name: "Swift", role: "IOS NATIVE", icon: SiSwift, color: "text-[#F05138]" },
  { name: "Kotlin", role: "ANDROID NATIVE", icon: SiKotlin, color: "text-[#7F52FF]" },
  { name: "Firebase", role: "BACKEND / BAAS", icon: SiFirebase, color: "text-[#FFA611]" },
  { name: "Node.js", role: "BACKEND RUNTIME", icon: SiNodedotjs, color: "text-[#339933]" },
  { name: ".NET", role: "BACKEND FRAMEWORK", icon: SiDotnet, color: "text-[#512BD4]" },
  { name: "Laravel", role: "PHP FRAMEWORK", icon: SiLaravel, color: "text-[#FF2D20]" },
  { name: "AWS", role: "CLOUD PLATFORM", icon: FaAws, color: "text-[#FF9900]" },
  { name: "Azure", role: "CLOUD PLATFORM", icon: VscAzure, color: "text-[#0078D4]" },
  { name: "Google Cloud", role: "CLOUD PLATFORM", icon: SiGooglecloud, color: "text-[#4285F4]" },
  { name: "REST APIs", role: "ARCHITECTURE", icon: TbApi, color: "text-[#0284C7]" },
  { name: "GraphQL", role: "QUERY LANGUAGE", icon: SiGraphql, color: "text-[#E10098]" },
  { name: "SQLite", role: "MOBILE DATABASE", icon: SiSqlite, color: "text-[#003B57]" },
  { name: "MongoDB", role: "NOSQL DATABASE", icon: SiMongodb, color: "text-[#47A248]" },
  { name: "PostgreSQL", role: "SQL DATABASE", icon: SiPostgresql, color: "text-[#4169E1]" },
];

// ─── 10 INDUSTRIES (Using react-icons with Unique Modern UI) ───
const INDUSTRIES_DATA = [
  { name: "Healthcare", icon: FaHeartbeat, count: "14+ Systems", desc: "Telemedicine, EHR & clinical workflows", color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
  { name: "Retail & POS", icon: FaCashRegister, count: "20+ Portals", desc: "Omnichannel checkout & inventory", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  { name: "Real Estate", icon: FaBuilding, count: "12+ Platforms", desc: "Property CRM & 3D tour portals", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  { name: "Hospitality", icon: FaUtensils, count: "8+ Suites", desc: "Booking reservation & kitchen displays", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  { name: "Education", icon: FaGraduationCap, count: "15+ Platforms", desc: "Smart LMS, quizzes & student analytics", color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
  { name: "FinTech", icon: FaLandmark, count: "11+ Engines", desc: "Digital banking & payment gateways", color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20" },
  { name: "Manufacturing", icon: FaIndustry, count: "9+ Systems", desc: "Shop-floor IoT & equipment monitoring", color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
  { name: "Logistics", icon: FaShippingFast, count: "10+ Portals", desc: "Route dispatch & fleet telemetry", color: "text-teal-500 bg-teal-500/10 border-teal-500/20" },
  { name: "Government", icon: FaShieldAlt, count: "6+ Portals", desc: "Public service portals & secure records", color: "text-sky-500 bg-sky-500/10 border-sky-500/20" },
  { name: "E-commerce", icon: FaShoppingCart, count: "25+ Stores", desc: "Multi-vendor marketplaces & checkouts", color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" },
];

// Delivery Process (SEO Friendly)
const DELIVERY_STEPS = [
  { step: "01", title: "Discovery", desc: "Requirement analysis, architecture scoping & security compliance audit." },
  { step: "02", title: "Planning", desc: "Sprint backlog creation, milestone planning & database entity design." },
  { step: "03", title: "UI/UX Design", desc: "Interactive Figma prototypes, design tokens & accessibility checks." },
  { step: "04", title: "Development", desc: "Agile modular coding, test-driven microservices & seamless APIs." },
  { step: "05", title: "Testing", desc: "Performance load tests, security scans & QA validation." },
  { step: "06", title: "Deployment", desc: "CI/CD automated pipeline release to cloud with zero downtime." },
  { step: "07", title: "Continuous Support", desc: "24/7 telemetry monitoring, bug fixes & scaling iterations." },
];

// FAQ Data (SEO Friendly)
const PORTFOLIO_FAQS = [
  {
    q: "Can Dharamvir Info Tech build desktop software like WindowsUtils.com?",
    a: "Yes! We specialize in standalone Windows & cross-platform desktop utility tools, high-speed file conversion engines (OST to PST, MBOX to PDF with court-admissible Bates stamps), and 100% offline-secure data processing engines.",
  },
  {
    q: "How scalable are your web platforms like FairSearches.com?",
    a: "Our search architectures are engineered with Elasticsearch, Redis caching, and clustered database instances capable of handling millions of real-time multi-faceted queries with sub-80 millisecond response times.",
  },
  {
    q: "Do you develop compliance & audit-grade solutions like EnviroSure Audits?",
    a: "Absolutely. We build enterprise-grade ESG platforms, tamper-proof reporting engines, automated emissions tracking (Scope 1, 2, 3), and verified regulatory submission suites adhering to international environmental standards.",
  },
  {
    q: "What is the typical timeline for an enterprise custom software project?",
    a: "Depending on project scope, an MVP or targeted desktop utility can be delivered within 6 to 8 weeks, while complex enterprise search portals or SaaS platforms typically take 3 to 6 months with bi-weekly sprint deliverables.",
  },
  {
    q: "Do you provide post-launch support and SLA management?",
    a: "Yes, every product built by Dharamvir Info Tech includes comprehensive SLA options, 24/7 server telemetry monitoring, security patches, and iterative feature scaling.",
  },
];

const PortfolioView = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    caseStudiesApi
      .list()
      .then((d) => setProjects(d.case_studies || []))
      .catch((err) => console.error("Portfolio fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(projects.map((c) => c.industry).filter(Boolean)))];

  const filtered = projects.filter((p) => {
    const matchCat = selectedCategory === "All" || p.industry === selectedCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      (p.subtitle || "").toLowerCase().includes(q) ||
      (p.client_name || "").toLowerCase().includes(q) ||
      (p.technologies || []).join(" ").toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div
      className="min-h-screen text-foreground"
      style={{ background: "linear-gradient(180deg, #f0f7ff 0%, #e6f1ff 50%, #f0f7ff 100%)" }}
    >
      <AnimatedNavbar />
      <PageBanner
        title="Our Portfolio & Featured Products"
        subtitle="Explore our flagship software products, high-concurrency search engines, and enterprise solutions delivering real-world impact."
        breadcrumb="Portfolio"
      />

      {/* ─── SECTION 1: FEATURED PROJECTS SHOWCASE (Cards with Custom DVI Accent & Mockups) ─── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-wider">
              FEATURED PROJECTS
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-2 rounded-full" />
            <p className="text-muted-foreground text-sm mt-3">
              Explore our live client applications, desktop suites, and digital platforms.
            </p>
          </div>

          {/* Filter Bar & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition-all border ${
                    selectedCategory === cat
                      ? "bg-accent text-accent-foreground border-accent shadow-md shadow-accent/20"
                      : "bg-white text-muted-foreground border-blue-100 hover:border-accent/50 hover:text-accent"
                  }`}
                >
                  {cat === "All" ? "All Projects" : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-blue-100 rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent shadow-xs"
              />
            </div>
          </div>

          {/* Project Grid */}
          {loading ? (
            <div className="py-28 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="animate-spin text-accent" size={32} />
              <p className="text-sm font-medium">Loading showcase projects...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-blue-200 rounded-2xl p-8 bg-white/80">
              <Layers className="mx-auto text-muted-foreground mb-3" size={40} />
              <h3 className="text-lg font-bold text-primary mb-1">No Projects Found</h3>
              <p className="text-xs text-muted-foreground">Try clearing your search query or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project) => (
                <div
                  key={project.id}
                  className={`group bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 shadow-sm hover:shadow-2xl ${
                    project.featured
                      ? "border-amber-300/80 shadow-amber-500/5 ring-1 ring-amber-300/40"
                      : "border-blue-100 hover:border-accent/40"
                  }`}
                >
                  <div>
                    {/* Visual Card Image Banner */}
                    <div className="relative h-56 bg-slate-900 overflow-hidden">
                      <img
                        src={
                          project.cover_image ||
                          (project.slug === "windowsutils"
                            ? "/portfolio/windowsutils.jpg"
                            : project.slug === "fairsearches"
                            ? "/portfolio/fairsearches.jpg"
                            : project.slug === "envirosure-audits"
                            ? "/portfolio/envirosure.jpg"
                            : "/placeholder.svg")
                        }
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg";
                        }}
                      />

                      {/* Top Overlay Badge */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="bg-primary/90 backdrop-blur-md text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-sm">
                            {project.industry}
                          </span>
                          {Boolean(project.featured) && (
                            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                              <Sparkles size={10} className="fill-white" /> Featured
                            </span>
                          )}
                        </div>

                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 bg-white/95 hover:bg-white text-primary text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm transition-colors shrink-0"
                          >
                            <span>Live Site</span>
                            <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                          {project.client_name || "Enterprise"}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">2024-2026</span>
                      </div>

                      <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors line-clamp-1 mb-2">
                        {project.title}
                      </h3>

                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                        {project.subtitle || project.challenge}
                      </p>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {(project.technologies || []).slice(0, 4).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded font-mono border border-slate-100"
                          >
                            {tech}
                          </span>
                        ))}
                        {(project.technologies || []).length > 4 && (
                          <span className="text-[10px] text-slate-400 px-1 py-0.5">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Button (DVI Accent Color) */}
                  <div className="p-6 pt-0">
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-accent text-accent-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-accent/90 transition-colors shadow-sm"
                    >
                      <span>View Project Details</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── SECTION 2: INDUSTRIES WE SERVE (Using react-icons + Custom Aesthetic Card Grid) ─── */}
      <section className="py-16 border-y border-blue-100/60 bg-white/40 backdrop-blur-xs">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full mb-3">
              • INDUSTRIES WE SERVE
            </span>
            <h2 className="text-3xl font-black text-primary tracking-tight">
              Industries Using <span className="text-accent">Our Products</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Our software products and platforms are trusted by organizations across diverse verticals to automate operations and maximize efficiency.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {INDUSTRIES_DATA.map((ind, idx) => {
              const IconComponent = ind.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white/80 hover:bg-white rounded-2xl p-5 border border-blue-100 hover:border-accent/40 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-between"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50/70 border border-blue-100/70 group-hover:border-accent/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
                    <IconComponent size={22} className="text-accent group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-primary mb-1">{ind.name}</h3>
                    <p className="text-[10px] text-accent font-semibold mb-1">{ind.count}</p>
                    <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">{ind.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: TECHNOLOGIES BEHIND OUR PROJECTS (16 Official React-Icons) ─── */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full mb-3">
              • TECHNOLOGIES WE USE
            </span>
            <h2 className="text-3xl font-black text-primary tracking-tight">
              Technologies Behind <span className="text-accent">Our Projects</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              We leverage modern technologies and enterprise platforms to build scalable, secure, and future-ready digital solutions.
            </p>
          </div>

          {/* 16 Grid Cards using react-icons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {TECH_STACK_ITEMS.map((item, idx) => {
              const TechIcon = item.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl p-5 border border-blue-100 hover:border-accent/40 shadow-sm hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center justify-center hover:-translate-y-0.5"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50/60 group-hover:bg-blue-100/60 flex items-center justify-center mb-3 transition-colors">
                    <TechIcon size={26} className={`${item.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <h4 className="font-bold text-sm text-primary mb-1">{item.name}</h4>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/80 font-mono">
                    {item.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: HOW WE DELIVER SUCCESSFUL PROJECTS (Roadmap with 7 Steps) ─── */}
      <section className="py-16 border-y border-blue-100/60 bg-white/40 backdrop-blur-xs">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full mb-3">
              • OUR PROJECT DELIVERY APPROACH
            </span>
            <h2 className="text-3xl font-black text-primary tracking-tight">
              How We Deliver Successful <span className="text-accent">Software Projects</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Every project follows a proven agile methodology focused on collaboration, quality assurance, transparency, and continuous improvement.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {DELIVERY_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="group relative bg-white/80 hover:bg-white rounded-2xl p-4 border border-blue-100 hover:border-accent/30 shadow-xs hover:shadow-md transition-all text-center flex flex-col justify-between"
              >
                <div>
                  <span className="w-7 h-7 mx-auto mb-2 rounded-full bg-accent/10 text-accent font-black text-xs flex items-center justify-center">
                    {step.step}
                  </span>
                  <h3 className="font-bold text-xs text-primary mb-1.5">{step.title}</h3>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: FREQUENTLY ASKED QUESTIONS (FAQ) ─── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full mb-3">
              • FAQ
            </span>
            <h2 className="text-3xl font-black text-primary tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Have questions about our custom engineering capabilities or previous projects?
            </p>
          </div>

          <div className="space-y-4">
            {PORTFOLIO_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-bold text-sm text-primary hover:text-accent transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-accent shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-slate-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default PortfolioView;
