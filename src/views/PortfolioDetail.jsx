import { useState, useEffect } from "react";
import { useParams, Link } from "@/lib/router-compat";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { caseStudiesApi } from "@/lib/api";
import {
  ExternalLink,
  ArrowLeft,
  Loader2,
  TrendingUp,
  Cpu,
  Layers,
  Globe,
  Share2,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  HelpCircle,
  Activity,
  Server,
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

    caseStudiesApi
      .getBySlug(slug)
      .then((res) => {
        if (res.case_study) {
          setProject(res.case_study);
        } else {
          setNotFound(true);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setNotFound(true);
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

  return (
    <div
      className="min-h-screen text-foreground"
      style={{ background: "linear-gradient(180deg, #f0f7ff 0%, #e6f1ff 50%, #f0f7ff 100%)" }}
    >
      <AnimatedNavbar />
      <PageBanner
        title={project.title}
        subtitle={project.subtitle || `Engineering case study & technical architecture for ${project.client_name}`}
        breadcrumb={`Portfolio / ${project.title}`}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Top Back & Share Bar */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft size={16} /> Back to All Projects
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-blue-200/80 bg-white hover:border-accent text-muted-foreground hover:text-primary transition-all shadow-xs"
            >
              <Share2 size={13} /> Share Project
            </button>
          </div>

          {/* Featured Product Hero Card (With Real Mockup Image) */}
          <div className="bg-white border border-blue-100 rounded-3xl overflow-hidden shadow-xl mb-12">
            <div className="relative w-full h-80 sm:h-[420px] bg-slate-900 overflow-hidden">
              <img
                src={projectImg}
                alt={project.title}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.src = "/placeholder.svg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-6 sm:p-10">
                <div className="text-white max-w-3xl">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="bg-accent text-accent-foreground font-mono text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider inline-block shadow-sm">
                      {project.industry}
                    </span>
                    {Boolean(project.featured) && (
                      <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-[10px] px-3 py-1 rounded-md shadow-sm inline-flex items-center gap-1.5 uppercase tracking-wider">
                        <Sparkles size={11} className="fill-white" /> Featured Case Study
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black leading-tight mb-2">
                    {project.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-white/90 line-clamp-2">
                    {project.subtitle || project.challenge}
                  </p>
                </div>
              </div>
            </div>

            {/* Meta Strip */}
            <div className="p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-blue-100 bg-[#f9fcff]">
              <div>
                <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Client</p>
                <p className="text-sm font-bold text-primary mt-0.5">{project.client_name || "Confidential"}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Duration</p>
                <p className="text-sm font-bold text-primary mt-0.5">{project.duration || "6 Months"}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Team Size</p>
                <p className="text-sm font-bold text-primary mt-0.5">{project.team_size || "8 Developers"}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Live URL</p>
                {project.live_url ? (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-bold text-accent hover:underline mt-0.5"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <p className="text-sm font-bold text-muted-foreground mt-0.5">Enterprise Internal</p>
                )}
              </div>
            </div>
          </div>

          {/* Key Metrics / Quantitative Impact */}
          {(project.metrics || []).length > 0 && (
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-1 bg-accent rounded" />
                <h2 className="text-xl font-bold text-primary">Key Performance & Business Metrics</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {(project.metrics || []).map((m, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-blue-100 shadow-sm text-center hover:border-accent/40 transition-colors"
                  >
                    <p className="text-3xl font-black text-accent">{m.value}</p>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Project Highlights */}
          {Array.isArray(project.key_highlights) && project.key_highlights.length > 0 && (
            <div className="mb-14 bg-white border border-blue-100 rounded-3xl p-8 sm:p-10 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-accent" size={20} />
                <h2 className="text-xl font-bold text-primary">Key Deliverables & Architectural Highlights</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.key_highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-[#f0f7ff]/70 border border-blue-100/80">
                    <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/90 font-medium leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
            <div className="p-8 rounded-3xl bg-white border border-blue-100 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full mb-4 inline-block border border-rose-100">
                Problem Statement
              </span>
              <h3 className="text-2xl font-bold text-primary mb-4">The Challenge</h3>
              <p className="text-foreground/90 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {project.challenge || "The client required high-performance software with specialized architecture to eliminate operational bottlenecks and meet stringent compliance standards."}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-blue-100 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4 inline-block border border-emerald-100">
                Engineering Delivery
              </span>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Solution</h3>
              <p className="text-foreground/90 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {project.solution || "We designed a modern microservices architecture with optimized data structures, automated unit testing, and scalable cloud deployments."}
              </p>
            </div>
          </div>

          {/* Architecture & Engineering Details (If provided) */}
          {project.architecture_details && (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-blue-100 shadow-sm mb-14">
              <div className="flex items-center gap-2 mb-4">
                <Server className="text-accent" size={20} />
                <h3 className="text-xl font-bold text-primary">Deep Technical Architecture</h3>
              </div>
              <p className="text-foreground/90 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {project.architecture_details}
              </p>
            </div>
          )}

          {/* Results & Value */}
          {project.results && (
            <div className="p-8 sm:p-10 rounded-3xl bg-accent/10 border border-accent/20 mb-14 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/15 px-3 py-1 rounded-full mb-3 inline-block">
                Long-Term Value
              </span>
              <h3 className="text-2xl font-bold text-primary mb-3">Results & Business Outcomes</h3>
              <p className="text-foreground/90 leading-relaxed text-base sm:text-lg">
                {project.results}
              </p>
            </div>
          )}

          {/* Technology Stack Matrix */}
          <div className="p-8 rounded-3xl bg-white border border-blue-100 shadow-sm mb-14">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <Cpu className="text-accent" size={20} /> Technology Stack & Tools Used
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {(project.technologies || []).map((tech, idx) => (
                <span
                  key={idx}
                  className="text-sm font-mono font-medium px-4 py-2 rounded-xl bg-[#f0f7ff] text-primary border border-blue-200/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Specific FAQ Section (If populated from admin/DB) */}
          {Array.isArray(project.faqs) && project.faqs.length > 0 && (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-blue-100 shadow-sm mb-16">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="text-accent" size={20} />
                <h3 className="text-xl font-bold text-primary">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-3">
                {project.faqs.map((f, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={i} className="border border-blue-100/80 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full text-left px-5 py-3.5 flex items-center justify-between gap-4 font-bold text-sm text-primary hover:text-accent transition-colors bg-[#f9fcff]"
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

          {/* Bottom CTA Box */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#071a2f] to-[#0d2e53] text-white text-center shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-black mb-3">
              Ready to Engineer Your Next Solution?
            </h3>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto mb-6">
              Connect with Dharamvir Info Tech engineers to discuss custom desktop software, web applications, or cloud platforms.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="bg-accent text-accent-foreground font-bold px-6 py-3 rounded-xl hover:bg-accent/90 transition-all shadow-lg"
              >
                Discuss Your Project
              </Link>
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl border border-white/20 transition-all inline-flex items-center gap-1.5"
                >
                  <span>Visit {project.title.split("-")[0].trim()}</span>
                  <ArrowUpRight size={16} />
                </a>
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
