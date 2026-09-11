import { useState, useEffect } from "react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { caseStudiesApi } from "@/lib/api";
import { Link } from "@/lib/router-compat";
import { ArrowRight, Clock, Users, Tag, TrendingUp, CheckCircle, ExternalLink, Loader2, Search } from "lucide-react";

const INDUSTRY_COLORS = {
  "FinTech": "from-blue-600 to-cyan-500",
  "E-Commerce": "from-orange-500 to-amber-400",
  "Healthcare": "from-emerald-600 to-teal-500",
  "EdTech": "from-purple-600 to-violet-500",
  "Real Estate": "from-rose-500 to-pink-500",
  "Logistics": "from-slate-600 to-slate-400",
  "default": "from-accent to-primary",
};

const INDUSTRY_BG = {
  "FinTech": "bg-blue-50 text-blue-700 border-blue-200",
  "E-Commerce": "bg-orange-50 text-orange-700 border-orange-200",
  "Healthcare": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "EdTech": "bg-purple-50 text-purple-700 border-purple-200",
  "Real Estate": "bg-rose-50 text-rose-700 border-rose-200",
  "default": "bg-accent/10 text-accent border-accent/20",
};

const getGradient = (industry) => INDUSTRY_COLORS[industry] || INDUSTRY_COLORS.default;
const getIndustryBadge = (industry) => INDUSTRY_BG[industry] || INDUSTRY_BG.default;

const MetricCard = ({ metric }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
    <p className="text-2xl font-black text-white">{metric.value}</p>
    <p className="text-xs text-white/70 mt-1 font-medium">{metric.label}</p>
  </div>
);

const CaseStudyCard = ({ cs, featured }) => {
  const gradient = getGradient(cs.industry);
  const badge = getIndustryBadge(cs.industry);

  if (featured) {
    return (
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col md:flex-row">
        {/* Gradient Visual Panel */}
        <div className={`bg-gradient-to-br ${gradient} md:w-2/5 p-8 flex flex-col justify-between min-h-[280px] md:min-h-0 relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-4 border-white" />
            <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full border-4 border-white" />
          </div>
          <div className="relative z-10">
            <span className="inline-block bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/30 mb-4">
              ⭐ Featured
            </span>
            <h3 className="text-2xl font-black text-white leading-tight">{cs.title}</h3>
            {cs.subtitle && <p className="text-white/80 text-sm mt-2 leading-relaxed">{cs.subtitle}</p>}
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-3 mt-4">
            {(cs.metrics || []).slice(0, 4).map((m, i) => (
              <MetricCard key={i} metric={m} />
            ))}
          </div>
        </div>
        {/* Content Panel */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badge}`}>{cs.industry}</span>
              {cs.client_name && <span className="text-xs text-slate-500 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">{cs.client_name}</span>}
            </div>
            <div className="flex gap-4 text-xs text-slate-500 mb-4">
              {cs.duration && <span className="flex items-center gap-1"><Clock size={12} />{cs.duration}</span>}
              {cs.team_size && <span className="flex items-center gap-1"><Users size={12} />{cs.team_size}</span>}
            </div>
            {cs.challenge && (
              <div className="mb-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Challenge</p>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{cs.challenge}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {(cs.technologies || []).slice(0, 5).map((t) => (
                <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-medium">{t}</span>
              ))}
              {(cs.technologies || []).length > 5 && (
                <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded font-mono">+{cs.technologies.length - 5} more</span>
              )}
            </div>
          </div>
          <Link
            to={`/portfolio/${cs.slug}`}
            className={`mt-6 inline-flex items-center gap-2 bg-gradient-to-r ${gradient} text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group/btn w-fit`}
          >
            View Case Study <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 border border-slate-100 flex flex-col hover:-translate-y-1">
      {/* Top gradient bar */}
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badge}`}>{cs.industry}</span>
          {cs.featured && <span className="text-[10px] text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-bold">⭐ Featured</span>}
        </div>
        <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1 group-hover:text-accent transition-colors">{cs.title}</h3>
        {cs.subtitle && <p className="text-sm text-slate-500 mb-3 line-clamp-2">{cs.subtitle}</p>}

        <div className="flex gap-3 text-xs text-slate-400 mb-4">
          {cs.duration && <span className="flex items-center gap-1"><Clock size={11} />{cs.duration}</span>}
          {cs.team_size && <span className="flex items-center gap-1"><Users size={11} />{cs.team_size}</span>}
        </div>

        {/* Mini metrics */}
        {(cs.metrics || []).length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {(cs.metrics || []).slice(0, 2).map((m, i) => (
              <div key={i} className={`rounded-lg p-2.5 bg-gradient-to-br ${gradient} text-center`}>
                <p className="text-sm font-black text-white">{m.value}</p>
                <p className="text-[10px] text-white/80">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1 mb-4">
          {(cs.technologies || []).slice(0, 4).map((t) => (
            <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">{t}</span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100">
          <Link
            to={`/portfolio/${cs.slug}`}
            className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm hover:gap-2.5 transition-all duration-200 group/link"
          >
            Read Full Case Study <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeIndustry, setActiveIndustry] = useState("All");

  useEffect(() => {
    caseStudiesApi.list()
      .then((d) => setCaseStudies(d.case_studies || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const industries = ["All", ...Array.from(new Set(caseStudies.map((c) => c.industry).filter(Boolean)))];

  const filtered = caseStudies.filter((c) => {
    const matchIndustry = activeIndustry === "All" || c.industry === activeIndustry;
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || (c.industry || "").toLowerCase().includes(q) || (c.client_name || "").toLowerCase().includes(q) || (c.technologies || []).join(" ").toLowerCase().includes(q);
    return matchIndustry && matchSearch;
  });

  const featured = filtered.filter((c) => c.featured);
  const regular = filtered.filter((c) => !c.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f9fc] via-[#edf2f8] to-[#f8fafc]">
      <AnimatedNavbar />
      <PageBanner
        title="Case Studies"
        subtitle="Real projects, real results. See how we've transformed businesses across industries."
        breadcrumb="Case Studies"
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">

          {/* Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {[
              { value: `${caseStudies.length}+`, label: "Projects Delivered" },
              { value: "50+", label: "Happy Clients" },
              { value: "10+", label: "Industries Served" },
              { value: "99%", label: "Client Satisfaction" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-slate-100">
                <p className="text-3xl font-black text-accent">{s.value}</p>
                <p className="text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-10">
            {/* Industry Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setActiveIndustry(ind)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
                    activeIndustry === ind
                      ? "bg-accent text-white border-accent shadow-md shadow-accent/20"
                      : "bg-white text-slate-600 border-slate-200 hover:border-accent hover:text-accent"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-24 flex items-center justify-center gap-3 text-slate-400">
              <Loader2 className="animate-spin text-accent" size={22} />
              <span className="text-sm font-medium">Loading case studies...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center text-slate-400">
              <TrendingUp size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No case studies found</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-8 h-0.5 bg-accent rounded" />
                    <p className="text-xs font-bold uppercase tracking-widest text-accent">Featured Projects</p>
                  </div>
                  <div className="space-y-6">
                    {featured.map((cs) => (
                      <CaseStudyCard key={cs.id} cs={cs} featured />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Grid */}
              {regular.length > 0 && (
                <div>
                  {featured.length > 0 && (
                    <div className="flex items-center gap-2 mb-6">
                      <span className="w-8 h-0.5 bg-slate-300 rounded" />
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">All Projects</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regular.map((cs) => (
                      <CaseStudyCard key={cs.id} cs={cs} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default CaseStudies;
