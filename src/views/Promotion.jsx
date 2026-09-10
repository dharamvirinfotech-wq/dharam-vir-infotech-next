import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Link } from "@/lib/router-compat";
import { promotionCategories } from "@/data/navigation";
import { ArrowRight, Search, Megaphone, Bot } from "lucide-react";
const categoryIcons = [Search, Megaphone, Bot];
const Promotion = () => (
  <div className="min-h-screen bg-backgrounds bg-gradient-to-br from-[#f6f9fc] via-[#edf2f8] to-[#f8fafc] ">
    <AnimatedNavbar />
    <PageBanner title="Promotion & Marketing Services" subtitle="Comprehensive digital marketing, SEO, and AI-powered marketing solutions to accelerate your business growth." breadcrumb="Promotion" />

    <section className="py-16">
      <div className="container mx-auto px-4">
        {promotionCategories.map((cat, idx) => (<div key={cat.label} className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            {(() => { const Icon = categoryIcons[idx]; return <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center"><Icon className="text-accent" size={24} /></div>; })()}
            <h2 className="text-2xl font-display font-bold text-primary">{cat.label}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.technologies.map((tech) => (<Link key={tech.name} to={tech.href} className="group flex items-center justify-between p-5 bg-card border border-border rounded-xl hover:shadow-lg hover:border-accent/30 transition-all">
              <span className="font-medium text-foreground group-hover:text-accent transition-colors">{tech.name}</span>
              <ArrowRight size={16} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>))}
          </div>
        </div>))}
      </div>
    </section>

    <CTASection />
    <ContactSection />
    <Footer />
  </div>);
export default Promotion;
