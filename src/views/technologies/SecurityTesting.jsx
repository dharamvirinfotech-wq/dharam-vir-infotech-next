import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Shield, Zap, Code2, Layers, Globe, Server } from "lucide-react";
const techs = [
    { name: "Jest", desc: "JavaScript testing framework with zero config, snapshot testing, and comprehensive mocking." },
    { name: "Cypress", desc: "End-to-end testing framework for modern web applications with real browser testing." },
    { name: "Selenium", desc: "Browser automation tool for cross-browser testing and regression test suites." },
    { name: "OAuth 2.0", desc: "Industry-standard authorization framework for secure third-party access." },
    { name: "JWT", desc: "JSON Web Tokens for stateless authentication and secure information exchange." },
    { name: "OWASP", desc: "Security best practices and vulnerability prevention following OWASP Top 10 guidelines." },
];
const features = [
    { icon: Shield, title: "Security Audits", desc: "Comprehensive vulnerability assessments and penetration testing." },
    { icon: Zap, title: "Automated Testing", desc: "CI/CD integrated test suites for continuous quality assurance." },
    { icon: Code2, title: "Code Reviews", desc: "Thorough code reviews with security-focused static analysis." },
    { icon: Layers, title: "Load Testing", desc: "Performance and stress testing to ensure reliability under load." },
    { icon: Globe, title: "Compliance", desc: "GDPR, HIPAA, SOC 2, and PCI DSS compliance implementation." },
    { icon: Server, title: "DevSecOps", desc: "Security integrated into every stage of the development lifecycle." },
];
const SecurityTesting = () => (<div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner title="Security & Testing" subtitle="Ensuring your applications are secure, reliable, and production-ready" breadcrumb="Technologies / Security & Testing"/>
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">Security-First Development</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">We embed security and quality assurance into every phase of development to deliver bulletproof applications.</p>
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
export default SecurityTesting;
