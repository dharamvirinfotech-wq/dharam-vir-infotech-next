import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Code2, Layers, Palette, Zap, Monitor, Globe } from "lucide-react";
const techs = [
    { name: "React.js", desc: "Component-based UI library for building interactive interfaces with virtual DOM and rich ecosystem." },
    { name: "Angular", desc: "Full-featured framework by Google with TypeScript, dependency injection, and enterprise-grade tooling." },
    { name: "Vue.js", desc: "Progressive framework with gentle learning curve, reactive data binding, and flexible architecture." },
    { name: "Next.js", desc: "React framework for production with SSR, SSG, API routes, and optimized performance out of the box." },
    { name: "TypeScript", desc: "Typed superset of JavaScript that catches errors early and improves developer productivity." },
    { name: "Tailwind CSS", desc: "Utility-first CSS framework for rapid UI development with consistent design systems." },
];
const features = [
    { icon: Code2, title: "Modern Frameworks", desc: "React, Angular, Vue.js and Next.js for scalable SPAs and SSR apps." },
    { icon: Layers, title: "Component Architecture", desc: "Reusable, modular UI components for maintainable codebases." },
    { icon: Palette, title: "Responsive Design", desc: "Pixel-perfect layouts that work seamlessly across all devices." },
    { icon: Zap, title: "Performance Optimized", desc: "Code splitting, lazy loading, and caching for blazing-fast load times." },
    { icon: Monitor, title: "Cross-Browser Support", desc: "Consistent experience across Chrome, Firefox, Safari, and Edge." },
    { icon: Globe, title: "Progressive Web Apps", desc: "Offline-capable, installable web apps with native-like experience." },
];
const Frontend = () => (<div className="min-h-screen bg-background">
    <AnimatedNavbar />
    <PageBanner title="Frontend Technologies" subtitle="Building stunning, high-performance user interfaces with modern frameworks" breadcrumb="Technologies / Frontend"/>
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">Why Our Frontend Expertise Matters</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">We craft pixel-perfect, responsive, and performant user interfaces that delight users and drive engagement.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (<div key={f.title} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <f.icon className="text-accent" size={24}/>
              </div>
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
export default Frontend;
