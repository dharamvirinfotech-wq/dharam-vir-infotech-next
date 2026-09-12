import React, { useState } from "react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import FaqSection from "@/components/FaqSection";
import { BLOG_POSTS, BLOG_CATEGORIES, blogFaqsData } from "@/data/blog-data";
import { Link } from "@/lib/router-compat";
import { contactApi } from "@/lib/api";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Sparkles,
  BookOpen,
  TrendingUp,
  Mail,
  CheckCircle2,
  Share2,
} from "lucide-react";

export default function BlogView() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  // Filter blog posts by category and search keyword
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchCat = selectedCategory === "All" || post.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchQuery =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      (post.tags || []).some((t) => t.toLowerCase().includes(query));
    return matchCat && matchQuery;
  });

  // Featured Hero Post is the first article
  const featuredPost = BLOG_POSTS[0];

  const [subscribing, setSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes("@")) return;
    setSubscribing(true);
    setSubscribeMessage("");
    try {
      await contactApi.submit({
        name: "Tech Radar Subscriber",
        email: emailInput.trim(),
        service: "Newsletter",
        subject: "Tech Radar Newsletter Subscription",
        message: "User subscribed to Tech Radar bi-weekly engineering newsletter from /blog page.",
      });
      setEmailSubscribed(true);
      setEmailInput("");
      setTimeout(() => {
        setEmailSubscribed(false);
      }, 6000);
    } catch (err) {
      setSubscribeMessage(err?.response?.data?.message || "Subscription failed. Please try again.");
      setTimeout(() => setSubscribeMessage(""), 5000);
    } finally {
      setSubscribing(false);
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

      {/* Hero Banner with Modern Title and Breadcrumb */}
      <PageBanner
        title="Engineering Insights & Tech Radar"
        subtitle="In-depth technical architecture breakdowns, emerging AI paradigms, cloud scalability blueprints, and software engineering best practices."
        breadcrumb="Blog"
      />

      {/* ─── 1. FEATURED HERO EDITORIAL ARTICLE (Modern Asymmetrical Split with DVI Brand Colors) ─── */}
      <section className="py-[40px] relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <SectionHeader
            badge="EDITORIAL SPOTLIGHT"
            titlePrefix="Insights, Trends & Ideas That"
            titleHighlight="Drive Digital Transformation"
            description="Explore production-grade blueprints, real-world benchmarks, and software architecture updates written by our senior engineers and architects."
            centered={false}
            className="mb-10 max-w-4xl"
          />

          {/* Featured Spotlight Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group">
            {/* Left Image (7 cols) */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[320px] overflow-hidden bg-slate-900">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              {/* Floating Pill Badges */}
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-accent text-slate-900 text-xs font-black uppercase tracking-wider font-mono shadow-md">
                  {featuredPost.badge}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/20 text-xs font-semibold">
                  {featuredPost.category}
                </span>
              </div>
            </div>

            {/* Right Details (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-accent" />
                    {featuredPost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-accent" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <Link to={`/blog/${featuredPost.slug}`}>
                  <h3 className="text-2xl sm:text-3xl font-black text-primary dark:text-white tracking-tight leading-tight mb-4 group-hover:text-accent transition-colors">
                    {featuredPost.title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 dark:bg-slate-800/60 border border-blue-100/60 dark:border-slate-700/60 mb-6">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-accent"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-primary dark:text-white leading-tight">
                      {featuredPost.author.name}
                    </h5>
                    <p className="text-[11px] text-slate-400">{featuredPost.author.role}</p>
                  </div>
                </div>
              </div>

              <Link
                to={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center justify-between px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs sm:text-sm transition-all group/btn shadow-md hover:shadow-lg"
              >
                <span>Read Complete Article</span>
                <ArrowRight
                  size={16}
                  className="text-accent group-hover/btn:translate-x-1.5 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. CATEGORY PILL FILTER & SEARCH BAR ─── */}
      <section className="py-[20px]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-white/80 dark:bg-slate-900/80 rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {BLOG_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition-all duration-300 border cursor-pointer ${
                    selectedCategory === category
                      ? "bg-accent text-slate-900 border-accent font-black shadow-md shadow-accent/20"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-accent hover:text-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search technical topics, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent shadow-2xs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. BLOG POSTS GRID & SIDEBAR WIDGET ─── */}
      <section className="py-[40px]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Articles Stream (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {filteredPosts.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm">
                  <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-lg font-bold text-primary dark:text-white mb-1">
                    No Matching Articles Found
                  </h3>
                  <p className="text-xs text-slate-500">
                    Try searching with another keyword or resetting the category filter.
                  </p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-accent/60 transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 cursor-pointer block"
                  >
                    {/* Left Thumbnail (5 cols) */}
                    <div className="sm:col-span-5 relative h-52 sm:h-full min-h-[200px] overflow-hidden bg-slate-900">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-mono font-bold border border-white/20">
                        {post.category}
                      </span>
                    </div>

                    {/* Right Body (7 cols) */}
                    <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5 font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} className="text-accent" />
                            {post.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="text-accent" />
                            {post.readTime}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-primary dark:text-white mb-2 leading-snug group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </h4>

                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Footer Info */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-accent" />
                          {post.author.name}
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
                          <span>Read Article</span>
                          <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Right Sidebar Widgets (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Popular Tech Topics Pill Matrix */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-5 rounded-full bg-accent" />
                  <h4 className="text-base font-bold text-primary dark:text-white">
                    Trending Topics
                  </h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Agentic AI",
                    "Kubernetes",
                    "Microservices",
                    "Flutter",
                    "React 19",
                    "C++ Systems",
                    "Zero-Trust Security",
                    "Terraform IaC",
                    "PostgreSQL",
                    "LLM Optimization",
                  ].map((topic, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSearchQuery(topic)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-accent hover:text-slate-900 hover:shadow-xs transition-all cursor-pointer border border-slate-200/60 dark:border-slate-700"
                    >
                      #{topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter & Tech Digest Subscribe Card (DVI Brand Blue Card) */}
              <div className="bg-gradient-to-br from-[#0c2e63] to-[#0e3a7e] text-white rounded-3xl p-7 border border-blue-900/60 shadow-xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/20 rounded-full blur-2xl pointer-events-none" />

                <div className="w-12 h-12 rounded-2xl bg-white/10 text-accent flex items-center justify-center mb-5 border border-white/15">
                  <Mail size={22} />
                </div>

                <h4 className="text-lg font-black text-white mb-2 leading-snug">
                  Stay Updated with Engineering Insights
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Receive our bi-weekly architectural breakdowns, AI case studies, and engineering updates directly in your inbox. No spam.
                </p>

                {emailSubscribed ? (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>Thank you! You are now subscribed to our Tech Digest.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <input
                      type="email"
                      required
                      placeholder="Enter your corporate email..."
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button
                      type="submit"
                      disabled={subscribing}
                      className="w-full py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-slate-900 font-extrabold text-xs transition-all shadow-md cursor-pointer disabled:opacity-60"
                    >
                      {subscribing ? "Subscribing..." : "Subscribe to Tech Radar"}
                    </button>
                    {subscribeMessage && (
                      <p className="text-xs text-rose-300 font-medium">{subscribeMessage}</p>
                    )}
                  </form>
                )}
              </div>

              {/* Quick Navigation to Related Case Studies & Services */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
                <h5 className="text-xs font-mono uppercase font-bold text-slate-400 mb-3 tracking-wider">
                  EXPLORE ARCHITECTURES
                </h5>
                <div className="space-y-2">
                  <Link
                    to="/portfolio"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/nav"
                  >
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover/nav:text-accent">
                      Verified Case Studies & Portfolios
                    </span>
                    <ArrowRight size={14} className="text-accent group-hover/nav:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/services"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/nav"
                  >
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover/nav:text-accent">
                      Full-Cycle Enterprise Services
                    </span>
                    <ArrowRight size={14} className="text-accent group-hover/nav:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. BLOG & ENGINEERING FAQ SECTION ─── */}
      <FaqSection
        id="blog-faq"
        badge="BLOG & RESEARCH FAQ"
        titlePrefix="Engineering &"
        titleHighlight="Publishing FAQs"
        description="Learn more about how Dharam Vir Infotech compiles engineering deep dives, benchmarks, open-source repositories, and consultation resources."
        items={blogFaqsData}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
