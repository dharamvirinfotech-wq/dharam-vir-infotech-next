import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ShoppingCart, CreditCard, BarChart3, Package, Search, Globe, } from "lucide-react";
const features = [
  { icon: ShoppingCart, title: "Custom E-commerce Stores", desc: "Fully custom online stores built from scratch with unique designs and features." },
  { icon: CreditCard, title: "Payment Gateway Integration", desc: "Secure payment processing with Stripe, Razorpay, PayPal, and more." },
  { icon: BarChart3, title: "Analytics & Reporting", desc: "Real-time dashboards tracking sales, inventory, customer behavior, and ROI." },
  { icon: Package, title: "Inventory Management", desc: "Automated stock management, order tracking, and supply chain integration." },
  { icon: Search, title: "SEO & Performance", desc: "Search-optimized product pages with blazing-fast load times for higher conversions." },
  { icon: Globe, title: "Marketplace Development", desc: "Multi-vendor marketplace platforms with seller dashboards and commission systems." },
];
const techStack = [
  "Shopify", "WooCommerce", "Magento", "BigCommerce", "React.js",
  "Node.js", "Stripe", "Razorpay", "Elasticsearch", "Redis",
];
const process = [
  { step: "01", title: "Business Analysis", desc: "Understand your products, target audience, and revenue goals to plan the perfect store." },
  { step: "02", title: "Design & UX", desc: "Conversion-focused design with intuitive navigation and mobile-first approach." },
  { step: "03", title: "Development & Integration", desc: "Build your store with payment gateways, shipping APIs, and CRM integration." },
  { step: "04", title: "Launch & Optimize", desc: "Go live with marketing tools, A/B testing, and continuous conversion optimization." },
];
const Ecommerce = () => {
  return (
    <div className="min-h-screen bg-backgrounds bg-gradient-to-br from-[#f6f9fc] via-[#edf2f8] to-[#f8fafc] ">
      <AnimatedNavbar />
      <PageBanner title="E-commerce Solutions" subtitle="Scalable online stores & marketplaces that drive sales and delight customers." breadcrumb="E-commerce" />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">E-commerce Development Services</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (<div key={f.title} className="group bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:border-accent/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <f.icon className="text-accent" size={28} />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Our Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">How We Build Your Store</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((p) => (<div key={p.step} className="relative">
              <span className="text-6xl font-black text-accent/10 absolute -top-4 -left-2">{p.step}</span>
              <div className="relative pt-8">
                <h3 className="text-lg font-bold text-primary mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Technologies</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Technologies We Use</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (<span key={tech} className="px-5 py-2.5 bg-card border border-border rounded-full text-sm font-medium text-primary hover:border-accent hover:text-accent transition-colors">
              {tech}
            </span>))}
          </div>
        </div>
      </section>

      <CTASection />
      <ContactSection />
      <Footer />
    </div>);
};
export default Ecommerce;
