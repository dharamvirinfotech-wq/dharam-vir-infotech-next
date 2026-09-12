import React, { useState } from "react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import Footer from "@/components/Footer";
import { getBlogPostBySlug, BLOG_POSTS } from "@/data/blog-data";
import { Link } from "@/lib/router-compat";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Layers,
  BookOpen,
  Copy,
  Check,
  Twitter,
  Linkedin,
  Send,
  MessageSquareQuote,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Mail,
} from "lucide-react";
import { contactApi } from "@/lib/api";

export default function BlogPostDetail({ post, slug }) {
  const currentPost = post || getBlogPostBySlug(slug) || BLOG_POSTS[0];
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // Related articles (excluding current article)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== currentPost.slug).slice(0, 3);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Reading "${currentPost.title}" by Dharam Vir Infotech:`);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    }
  };

  // Newsletter Subscription in Right Sidebar
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterSubscribing, setNewsletterSubscribing] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) return;
    setNewsletterSubscribing(true);
    setNewsletterMessage("");
    try {
      await contactApi.submit({
        name: "Tech Radar Subscriber",
        email: newsletterEmail.trim(),
        service: "Newsletter",
        subject: "Tech Radar Newsletter Subscription",
        message: `User subscribed to Tech Radar Engineering Newsletter from blog details sidebar: ${currentPost.title}`,
      });
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
      setNewsletterMessage("Thank you! Welcome email has been sent.");
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterMessage("");
      }, 6000);
    } catch (err) {
      setNewsletterMessage(err?.response?.data?.message || "Failed to subscribe. Please try again.");
    } finally {
      setNewsletterSubscribing(false);
    }
  };

  return (
    <div
      className="min-h-screen text-foreground selection:bg-accent selection:text-white"
      style={{
        background: "linear-gradient(180deg, #f0f7ff 0%, #e6f1ff 50%, #f0f7ff 100%)",
      }}
    >
      <AnimatedNavbar />

      {/* ─── HERO HEADER ─── */}
      <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 bg-[#0c2e63] text-white overflow-hidden">
        {/* Background glow lines */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          {/* Breadcrumb row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-white transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Tech Radar</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                EST. READ: {currentPost.readTime}
              </span>
            </div>
          </div>

          {/* Badge & Metadata row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3.5 py-1 rounded-full bg-accent text-slate-900 text-xs font-black uppercase tracking-wider font-mono shadow-md shadow-accent/20">
              {currentPost.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
              <Calendar size={13} className="text-accent" />
              {currentPost.date}
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
              <Clock size={13} className="text-accent" />
              {currentPost.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.18] mb-6">
            {currentPost.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans max-w-3xl mb-8">
            {currentPost.summary || currentPost.excerpt}
          </p>

          {/* Author & Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-5 pt-4 border-t border-white/15">
            {/* Author Capsule */}
            <div className="inline-flex items-center gap-3.5 p-1.5 pr-5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
              <img
                src={currentPost.author.avatar}
                alt={currentPost.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-accent"
              />
              <div>
                <h5 className="text-xs font-bold text-white leading-tight">
                  {currentPost.author.name}
                </h5>
                <p className="text-[11px] text-accent font-medium">{currentPost.author.role}</p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-medium hidden sm:inline-block mr-1">
                Share:
              </span>
              <button
                onClick={handleShareTwitter}
                title="Share on X / Twitter"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white hover:text-accent transition-all duration-200 cursor-pointer"
              >
                <Twitter size={15} />
              </button>
              <button
                onClick={handleShareLinkedIn}
                title="Share on LinkedIn"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white hover:text-accent transition-all duration-200 cursor-pointer"
              >
                <Linkedin size={15} />
              </button>
              <button
                onClick={handleCopyLink}
                title="Copy Article Link"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white hover:text-accent text-xs font-semibold transition-all duration-200 cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT LAYOUT ─── */}
      <section className="py-[40px]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Featured Visual Image Banner */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900">
                <div className="aspect-[16/9] w-full">
                  <img
                    src={currentPost.image}
                    alt={currentPost.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Key Executive Takeaways Card (Clean transparent style with subtle border) */}
              {currentPost.keyTakeaways && currentPost.keyTakeaways.length > 0 && (
                <div className="rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-9 h-9 rounded-xl bg-accent text-slate-900 flex items-center justify-center font-bold shadow-md shadow-accent/20">
                      <Sparkles size={18} />
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-primary font-mono uppercase tracking-wider">
                        Key Architecture Takeaways
                      </h3>
                      <p className="text-xs text-slate-500">Essential engineering insights at a glance</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {currentPost.keyTakeaways.map((takeaway, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 p-3.5 rounded-2xl border border-slate-200/70"
                      >
                        <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {takeaway}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prose Content Body (No solid card background) */}
              <div className="rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xs space-y-12">
                {(currentPost.content || []).map((section, idx) => (
                  <div key={idx} id={`section-${idx}`} className="space-y-5 scroll-mt-28">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-7 rounded-full bg-accent inline-block" />
                      <h2 className="text-xl sm:text-2xl font-black text-primary tracking-tight">
                        {section.heading}
                      </h2>
                    </div>

                    {section.paragraphs.map((para, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans"
                      >
                        {para}
                      </p>
                    ))}

                    {/* Architecture Quote Highlight */}
                    {idx === 0 && (
                      <div className="my-6 p-6 rounded-2xl border-l-4 border-accent border-y border-r border-slate-200/70 text-slate-800">
                        <div className="flex items-start gap-3">
                          <MessageSquareQuote size={24} className="text-accent shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm italic font-medium leading-relaxed">
                            "Modern distributed systems must balance autonomy with verifiable governance. In production environments, deterministic SLAs and automated rollbacks differentiate enterprise architectures from fragile experiments."
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Tags Matrix */}
                <div className="pt-8 border-t border-slate-200/70">
                  <span className="text-xs font-mono font-bold uppercase text-slate-400 block mb-3 tracking-wider">
                    RELEVANT TOPICS & TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(currentPost.tags || []).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold px-3.5 py-1.5 rounded-xl text-slate-700 border border-slate-200 hover:border-accent hover:text-accent transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Share & Feedback Bar */}
                <div className="pt-6 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">
                      Was this architecture breakdown useful?
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleShareTwitter}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-700 border border-slate-200 text-xs font-bold hover:bg-accent hover:text-slate-900 transition-colors"
                    >
                      <Twitter size={13} />
                      Tweet
                    </button>
                    <button
                      onClick={handleShareLinkedIn}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-700 border border-slate-200 text-xs font-bold hover:bg-accent hover:text-slate-900 transition-colors"
                    >
                      <Linkedin size={13} />
                      Share
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-700 border border-slate-200 text-xs font-bold hover:bg-accent hover:text-slate-900 transition-colors"
                    >
                      {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Author Detailed Bio Card (Clean border, transparent background) */}
              <div className="rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <img
                  src={currentPost.author.avatar}
                  alt={currentPost.author.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-accent shrink-0 shadow-md"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <h4 className="text-base font-bold text-primary">
                      Written by {currentPost.author.name}
                    </h4>
                    <span className="text-xs font-mono font-bold text-accent px-2.5 py-0.5 rounded-md bg-accent/10">
                      {currentPost.author.role}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Lead engineer at Dharam Vir Infotech specializing in enterprise-grade web architectures, cloud-native DevOps pipelines, and mission-critical multi-platform system development.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Table of Contents Widget (Clean border, transparent background) */}
              <div className="rounded-3xl p-6 border border-slate-200/90 shadow-2xs sticky top-28">
                <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-200/70">
                  <BookOpen size={16} className="text-accent" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                    TABLE OF CONTENTS
                  </h4>
                </div>

                <nav className="space-y-2 mb-6">
                  {(currentPost.content || []).map((section, idx) => (
                    <a
                      key={idx}
                      href={`#section-${idx}`}
                      onClick={() => setActiveSection(idx)}
                      className={`block text-xs py-2 px-3 rounded-xl transition-all leading-snug ${
                        activeSection === idx
                          ? "bg-accent/15 text-primary font-bold border-l-3 border-accent"
                          : "text-slate-600 hover:text-accent hover:bg-black/5"
                      }`}
                    >
                      {idx + 1}. {section.heading}
                    </a>
                  ))}
                </nav>

                {/* Direct Consultation Box */}
                <div className="rounded-2xl bg-gradient-to-br from-[#0c2e63] to-[#081e42] p-5 text-white">
                  <span className="text-[10px] font-mono uppercase font-bold text-accent block mb-1">
                    ENTERPRISE ADVISORY
                  </span>
                  <h5 className="text-sm font-bold text-white mb-2 leading-snug">
                    Building a Similar Architecture?
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Our principal architects can audit your codebase, design resilient cloud topologies, and accelerate release cycles.
                  </p>
                  <Link
                    to="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-accent hover:bg-accent/90 text-slate-900 font-extrabold text-xs transition-all shadow-md"
                  >
                    <span>Request Engineering Call</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Production SLA & Guarantees (Clean border, transparent background) */}
              <div className="rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-accent" />
                  <h5 className="text-xs font-mono uppercase font-bold text-slate-700">
                    PRODUCTION GUARANTEES
                  </h5>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-medium">
                      Rigorous OWASP Top 10 security standards implemented in every code sample.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-medium">
                      Proven in real production deployments handling millions of monthly requests.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-medium">
                      Continuous architectural support and SLA-backed maintenance contracts.
                    </span>
                  </div>
                </div>
              </div>

              {/* Newsletter & Tech Digest Subscribe Card (Integrated API) */}
              <div className="rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-accent" />
                  <h5 className="text-xs font-mono uppercase font-bold text-slate-700">
                    TECH RADAR NEWSLETTER
                  </h5>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Join 10,000+ engineers receiving bi-weekly architecture breakdowns, benchmarks, and production insights.
                </p>

                {newsletterSubscribed ? (
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>Thank you! Welcome email sent to your inbox.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubscribe} className="space-y-2.5">
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="Your corporate email..."
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={newsletterSubscribing}
                      className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-accent text-white hover:text-slate-900 font-extrabold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-60 flex items-center justify-center gap-1.5"
                    >
                      {newsletterSubscribing ? "Subscribing..." : "Sign Up"}
                    </button>
                    {newsletterMessage && (
                      <p className="text-xs text-rose-500 font-medium">{newsletterMessage}</p>
                    )}
                  </form>
                )}
              </div>

              {/* Explore Portfolio (Clean border, transparent background) */}
              <div className="rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
                <h5 className="text-xs font-mono uppercase font-bold text-slate-500 mb-3 tracking-wider">
                  CASE STUDY REPOSITORIES
                </h5>
                <div className="space-y-2">
                  <Link
                    to="/portfolio"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-black/5 transition-colors group/link"
                  >
                    <span className="text-xs font-bold text-slate-700 group-hover/link:text-accent">
                      Verified Case Studies
                    </span>
                    <ArrowRight size={14} className="text-accent group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/services"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-black/5 transition-colors group/link"
                  >
                    <span className="text-xs font-bold text-slate-700 group-hover/link:text-accent">
                      Enterprise Services List
                    </span>
                    <ArrowRight size={14} className="text-accent group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ─── RELATED ARTICLES SECTION ─── */}
          <div className="mt-16 pt-12 border-t border-slate-200/80">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase font-bold text-accent block mb-1">
                  MORE FROM TECH RADAR
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-primary">
                  Related Technical Articles
                </h3>
              </div>
              <Link
                to="/blog"
                className="text-xs font-bold text-accent hover:underline inline-flex items-center gap-1.5"
              >
                <span>View All Articles</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug}`}
                  className="group rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-accent/60 transition-all duration-300 flex flex-col justify-between block"
                >
                  <div className="h-44 w-full overflow-hidden bg-slate-900 relative">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-xs text-[10px] font-bold font-mono text-white border border-white/20">
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium block mb-2">
                        {rel.date} • {rel.readTime}
                      </span>
                      <h4 className="text-sm font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 leading-snug mb-3">
                        {rel.title}
                      </h4>
                    </div>
                    <div className="flex items-center text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
                      <span>Read Breakdown</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  return {
    props: {
      slug: slug || "",
    },
  };
}
