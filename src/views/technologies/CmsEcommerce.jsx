import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Blocks, ShoppingCart, Zap, Shield, Layers, Globe } from "lucide-react";
const techs = [
    { name: "WordPress", desc: "World's most popular CMS powering 40%+ of all websites with extensive plugin ecosystem." },
    { name: "Shopify", desc: "Leading e-commerce platform for building online stores with built-in payment processing." },
    { name: "Magento", desc: "Enterprise-grade e-commerce platform for large-scale online retail operations." },
    { name: "WooCommerce", desc: "Flexible WordPress e-commerce plugin for customizable online stores." },
    { name: "Strapi", desc: "Open-source headless CMS for building content-rich applications with API-first approach." },
    { name: "Contentful", desc: "Cloud-based headless CMS for managing content across multiple digital channels." },
];
const features = [
    { icon: Blocks, title: "Custom CMS Development", desc: "Tailored content management systems for your unique workflow." },
    { icon: ShoppingCart, title: "E-commerce Stores", desc: "Feature-rich online stores with payment gateway integrations." },
    { icon: Zap, title: "Performance Optimization", desc: "Fast-loading CMS and e-commerce sites optimized for conversions." },
    { icon: Shield, title: "Security Hardening", desc: "Protection against vulnerabilities, malware, and data breaches." },
    { icon: Layers, title: "Theme & Plugin Development", desc: "Custom themes and plugins tailored to your brand and needs." },
    { icon: Globe, title: "Multi-channel Commerce", desc: "Sell across web, mobile, social media, and marketplaces." },
];
const CmsEcommerce = () => (<div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner title="CMS & E-commerce" subtitle="Powerful content management and online commerce solutions for your business" breadcrumb="Technologies / CMS & E-commerce"/>
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">Content & Commerce Solutions</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">We build and customize CMS and e-commerce platforms that empower your team and delight your customers.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (<div key={f.title} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4"><f.icon className="text-accent" size={24}/></div>
              <h3 className="text-lg font-bold text-primary mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>))}
        </div>
      </div>
    </section>
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">Technologies We Work With</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techs.map((t) => (<div key={t.name} className="bg-card border border-border rounded-xl p-6 hover:border-accent transition-colors">
              <h3 className="text-lg font-bold text-primary mb-2">{t.name}</h3>
              <p className="text-muted-foreground text-sm">{t.desc}</p>
            </div>))}
        </div>
      </div>
    </section>
    <CTASection />
    <Footer />
  </div>);
export default CmsEcommerce;
