import { useState, useEffect } from "react";
import { useParams, Link } from "@/lib/router-compat";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ProjectEnquiryCard from "@/components/ProjectEnquiryCard";
import { caseStudiesApi } from "@/lib/api";
import { getFallbackProjectBySlug } from "@/utils/portfolioData";
import { getTechIconInfo } from "@/utils/techIcons";
import {
  ExternalLink,
  ArrowLeft,
  Loader2,
  Layers,
  Share2,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  HelpCircle,
  Server,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Target,
  FileCheck2,
  Award,
} from "lucide-react";
import { toast } from "sonner";

const getImageForProject = (slug, coverImage) => {
  if (coverImage) return coverImage;
  if (slug === "windowsutils") return "/portfolio/windowsutils.jpg";
  if (slug === "fairsearches") return "/portfolio/fairsearches.jpg";
  if (slug === "envirosure-audits") return "/portfolio/envirosure.jpg";
  return "/placeholder.svg";
};

const PortfolioDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    // Primary: fetch from Backend API
    caseStudiesApi
      .getBySlug(slug)
      .then((res) => {
        if (res?.case_study) {
          const apiCs = res.case_study;
          // Merge with fallback data so approach, key_features, roi_metrics exist even if DB row is minimal
          const fallback = getFallbackProjectBySlug(slug) || {};
          setProject({
            ...fallback,
            ...apiCs,
            approach: apiCs.approach || fallback.approach || "",
            overview: apiCs.overview || fallback.overview || "",
            key_features: Array.isArray(apiCs.key_features) && apiCs.key_features.length > 0 ? apiCs.key_features : fallback.key_features || [],
            roi_metrics: Array.isArray(apiCs.roi_metrics) && apiCs.roi_metrics.length > 0 ? apiCs.roi_metrics : fallback.roi_metrics || [],
            what_they_gained: Array.isArray(apiCs.what_they_gained) && apiCs.what_they_gained.length > 0 ? apiCs.what_they_gained : fallback.what_they_gained || [],
            // If API has faqs array with elements, use API; otherwise use fallback faqs
            faqs: Array.isArray(apiCs.faqs) && apiCs.faqs.length > 0 ? apiCs.faqs : fallback.faqs || [],
            key_highlights: Array.isArray(apiCs.key_highlights) && apiCs.key_highlights.length > 0 ? apiCs.key_highlights : fallback.key_highlights || [],
            metrics: Array.isArray(apiCs.metrics) && apiCs.metrics.length > 0 ? apiCs.metrics : fallback.metrics || [],
          });
        } else {
          // Fallback from utils
          const fallback = getFallbackProjectBySlug(slug);
          if (fallback) {
            setProject(fallback);
          } else {
            setNotFound(true);
          }
        }
      })
      .catch((err) => {
        console.warn("API failed to fetch case study, checking fallback data:", err);
        const fallback = getFallbackProjectBySlug(slug);
        if (fallback) {
          setProject(fallback);
        } else {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col justify-between"
        style={{ background: "linear-gradient(180deg, #f0f7ff 0%, #e6f1ff 50%, #f0f7ff 100%)" }}
      >
        <AnimatedNavbar />
        <div className="py-40 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="animate-spin text-accent" size={36} />
          <p className="text-sm font-medium">Loading project showcase...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div
        className="min-h-screen flex flex-col justify-between"
        style={{ background: "linear-gradient(180deg, #f0f7ff 0%, #e6f1ff 50%, #f0f7ff 100%)" }}
      >
        <AnimatedNavbar />
        <div className="py-40 text-center container mx-auto px-4 max-w-lg">
          <Layers className="mx-auto text-muted-foreground mb-4" size={48} />
          <h1 className="text-3xl font-black text-primary mb-2">Project Not Found</h1>
          <p className="text-muted-foreground text-sm mb-6">
            The project you are looking for might have been moved or is currently unpublished.
          </p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold px-6 py-3 rounded-xl hover:bg-accent/90 transition-all shadow-md"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const projectImg = getImageForProject(project.slug, project.cover_image);

  // Derive structured editorial fields with sensible defaults
  const approachText = project.approach || project.solution || "We designed a modern high-performance software architecture utilizing native binary stream handlers, asynchronous queues, and automated test pipelines with zero downtime.";
  const overviewText = project.overview || project.subtitle || project.challenge || "At Dharam Vir Infotech, we specialize in delivering innovative, tailored technology services that drive success and accelerate enterprise growth.";
  const keyFeaturesList = Array.isArray(project.key_features) && project.key_features.length > 0
    ? project.key_features
    : Array.isArray(project.key_highlights) && project.key_highlights.length > 0
      ? project.key_highlights
      : [
        "End-to-end system assessment and scalable migration roadmap.",
        "High-performance architecture optimization with zero memory leaks.",
        "Automated cryptographic verification ensuring strict data integrity.",
        "Continuous integration and automated QA regression testing.",
        "Role-based access control with comprehensive administrative audit logs."
      ];

  const roiList = Array.isArray(project.roi_metrics) && project.roi_metrics.length > 0
    ? project.roi_metrics
    : [
      "Sub-80ms low latency query response under enterprise peak concurrency.",
      "Zero data loss SLA maintained across all batch conversion cycles.",
      "Over 45% reduction in recurring cloud processing and infrastructure costs.",
      "Empowered non-technical teams through automated intuitive desktop workflows."
    ];

  const gainedList = Array.isArray(project.what_they_gained) && project.what_they_gained.length > 0
    ? project.what_they_gained
    : [
      "Future-ready software ecosystem built for continuous feature expansion.",
      "Streamlined operational workflows driven by real-time telemetry analytics.",
      "Enhanced customer trust through tamper-proof data privacy standards.",
      "Sustainable digital transformation backed by 24/7 dedicated engineering support."
    ];

  return (
    <div
      className="min-h-screen text-foreground"
      style={{ background: "linear-gradient(180deg, #f0f7ff 0%, #e6f1ff 50%, #f0f7ff 100%)" }}
    >
      <AnimatedNavbar />
      <PageBanner
        title={project.title}
        subtitle={project.subtitle || `Engineering case study & technical architecture for ${project.client_name}`}
        breadcrumb={`Portfolio / ${project.title.split("-")[0].trim()}`}
      />

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Top Back & Share Bar */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft size={16} /> Back to All Projects
            </Link>

            <div className="flex items-center gap-3">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-xs"
                >
                  <span>Visit Live Website</span>
                  <ExternalLink size={12} />
                </a>
              )}
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border border-blue-200/80 bg-white hover:border-accent text-muted-foreground hover:text-primary transition-all shadow-xs"
              >
                <Share2 size={13} /> Share
              </button>
            </div>
          </div>

          {/* ─── MAIN EDITORIAL 2-COLUMN LAYOUT (Matching Reference Document Style) ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-5">
            {/* LEFT SIDEBAR: Sticky Lead Inquiry Form & Quick Specs */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <ProjectEnquiryCard
                projectTitle={project.title}
                projectSlug={project.slug}
                clientName={project.client_name}
              />

              {/* Quick Project Meta Strip */}
              <div className="bg-whites rounded-3xl p-6 borders border-blue-100s shadow-sm space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
                  Project Metadata
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Client Organization</span>
                    <span className="font-bold text-primary">{project.client_name || "Enterprise"}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Industry Vertical</span>
                    <span className="font-bold text-accent">{project.industry}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Engagement Duration</span>
                    <span className="font-bold text-primary">{project.duration || "6 Months"}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Engineering Team</span>
                    <span className="font-bold text-primary">{project.team_size || "8 Engineers"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Rich Case Study Technical Document */}
            <div className="lg:col-span-8 bg-white/95s rounded-3xl p-6 sm:p-10 lg:p-12 borders border-blue-100s shadow-xls space-y-8">
              {/* Header Headline */}
              <div>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="bg-accent/10 text-accent font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-accent/20">
                    {project.industry}
                  </span>
                  {Boolean(project.featured) && (
                    <span className="bg-amber-500/10 text-amber-600 font-bold text-[10px] px-3 py-1 rounded-full border border-amber-500/20 inline-flex items-center gap-1">
                      <Sparkles size={11} /> Featured Case Study
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary leading-tight">
                  {project.title}
                </h1>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {project.subtitle}
                </p>
              </div>

              {/* Cover Showcase Image */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-md">
                <img
                  src={projectImg}
                  alt={project.title}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg";
                  }}
                />
              </div>

              {/* 1. Approach Section */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black text-primary flex items-center gap-2">
                  <Target size={18} className="text-accent" /> Approach:
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {approachText}
                </p>
              </div>

              {/* 2. Overview Section */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black text-primary flex items-center gap-2">
                  <FileCheck2 size={18} className="text-accent" /> Overview:
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {overviewText}
                </p>
              </div>

              {/* 3. Two-Column Split: Key Features & Return on Investment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Key Features */}
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-black text-primary flex items-center gap-2">
                    <ShieldCheck size={18} className="text-accent" /> Key Features:
                  </h3>
                  <ul className="space-y-2.5">
                    {keyFeaturesList.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Return On Investment */}
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-black text-primary flex items-center gap-2">
                    <TrendingUp size={18} className="text-emerald-600" /> Return Of Investment:
                  </h3>
                  <ul className="space-y-2.5">
                    {roiList.map((roi, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>{roi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 4. What They Gained */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base sm:text-lg font-black text-primary flex items-center gap-2">
                  <Award size={18} className="text-amber-500" /> What They Gained:
                </h3>
                <ul className="space-y-2.5">
                  {gainedList.map((gain, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                      <span>{gain}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 5. Deep Technical Architecture Details */}
              {project.architecture_details && (
                <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
                  <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                    <Server size={16} className="text-accent" /> Deep Technical Architecture
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {project.architecture_details}
                  </p>
                </div>
              )}

              {/* 6. Technology Stack With Official React-Icons */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base sm:text-lg font-black text-primary flex items-center gap-2">
                  <Cpu size={18} className="text-accent" /> Technologies Used:
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(project.technologies || []).map((tech, idx) => {
                    const iconInfo = getTechIconInfo(tech);
                    const TechIcon = iconInfo.icon;
                    return (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-blue-200/80 shadow-2xs hover:border-accent/50 transition-colors"
                      >
                        <TechIcon size={18} className={iconInfo.color} />
                        <span className="text-xs font-bold text-primary font-mono">{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 7. Frequently Asked Questions (Accordion) */}
              {Array.isArray(project.faqs) && project.faqs.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <HelpCircle size={18} className="text-accent" />
                    <h3 className="text-base sm:text-lg font-black text-primary">
                      Frequently Asked Questions ({project.title.split("-")[0].trim()})
                    </h3>
                  </div>
                  <div className="space-y-2.5">
                    {project.faqs.map((f, i) => {
                      const isOpen = openFaq === i;
                      return (
                        <div key={i} className="border border-blue-100/90 rounded-2xl overflow-hidden">
                          <button
                            onClick={() => setOpenFaq(isOpen ? null : i)}
                            className="w-full text-left px-5 py-3.5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-primary hover:text-accent transition-colors bg-[#f9fcff]"
                          >
                            <span>{f.question}</span>
                            <ChevronDown
                              size={16}
                              className={`text-accent shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-5 py-3 text-xs sm:text-sm text-muted-foreground leading-relaxed bg-white border-t border-blue-50">
                              {f.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default PortfolioDetail;
