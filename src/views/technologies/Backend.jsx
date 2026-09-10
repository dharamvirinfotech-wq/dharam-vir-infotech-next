import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Server, Shield, Zap, Database, Globe, Code2 } from "lucide-react";
const techs = [
    { name: "Node.js", desc: "Event-driven JavaScript runtime for scalable server-side applications and real-time systems." },
    { name: "Python", desc: "Versatile language for web development, data science, AI/ML, and automation with Django & Flask." },
    { name: "Java", desc: "Enterprise-grade language with Spring Boot for robust, secure, and high-performance applications." },
    { name: "PHP", desc: "Mature web language powering Laravel, Symfony, and WordPress for dynamic web applications." },
    { name: ".NET", desc: "Microsoft's framework for building secure, scalable enterprise applications and APIs." },
    { name: "Go", desc: "High-performance compiled language for microservices, APIs, and concurrent systems." },
];
const features = [
    { icon: Server, title: "Scalable Architecture", desc: "Microservices and monolith architectures designed for growth." },
    { icon: Shield, title: "Secure APIs", desc: "RESTful and GraphQL APIs with authentication and authorization." },
    { icon: Zap, title: "High Performance", desc: "Optimized backend systems handling millions of requests." },
    { icon: Database, title: "Data Management", desc: "Efficient database design, ORM integration, and caching." },
    { icon: Globe, title: "Third-Party Integrations", desc: "Seamless integration with payment gateways, CRMs, and more." },
    { icon: Code2, title: "Clean Code Practices", desc: "SOLID principles, design patterns, and comprehensive testing." },
];
const Backend = () => (<div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner title="Backend Technologies" subtitle="Powering applications with robust, scalable, and secure server-side solutions" breadcrumb="Technologies / Backend"/>
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">Robust Backend Engineering</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">We build the backbone of your application with scalable, secure, and maintainable server-side architectures.</p>
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
export default Backend;
