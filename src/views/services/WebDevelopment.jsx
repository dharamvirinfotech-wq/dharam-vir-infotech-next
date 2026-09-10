import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Server, Shield, Zap, Code2, Database, Layers, } from "lucide-react";
const features = [
  { icon: Code2, title: "Custom Web Applications", desc: "Tailored web apps designed to solve your unique business challenges with scalable architecture." },
  { icon: Server, title: "Enterprise Software Solutions", desc: "Robust enterprise-grade systems including CRM, ERP, and workflow automation platforms." },
  { icon: Database, title: "API Development & Integration", desc: "RESTful and GraphQL APIs that connect your systems and enable seamless data flow." },
  { icon: Layers, title: "Progressive Web Apps (PWA)", desc: "Fast, reliable web apps that work offline and deliver native-like experiences." },
  { icon: Shield, title: "Maintenance & Support", desc: "Ongoing monitoring, bug fixes, performance tuning, and feature enhancements." },
  { icon: Zap, title: "Cloud-Based Applications", desc: "Scalable cloud-native solutions leveraging AWS, Azure, and Google Cloud platforms." },
];
const techStack = [
  "React.js", "Angular", "Vue.js", "Next.js", "Node.js", "Python",
  "PHP", "Laravel", "Django", "Ruby on Rails", "PostgreSQL", "MongoDB",
];
const process = [
  { step: "01", title: "Discovery & Planning", desc: "We analyze your requirements, define scope, and create a detailed project roadmap." },
  { step: "02", title: "UI/UX Design", desc: "Our designers craft intuitive interfaces that delight users and drive engagement." },
  { step: "03", title: "Development & Testing", desc: "Agile development with continuous testing ensures quality at every sprint." },
  { step: "04", title: "Deployment & Support", desc: "Seamless deployment with ongoing maintenance and performance optimization." },
];
const WebDevelopment = () => {
  return (
    <div className="min-h-screen bg-backgrounds bg-gradient-to-br from-[#f6f9fc] via-[#edf2f8] to-[#f8fafc] ">
      <AnimatedNavbar />
      <PageBanner title="Web & Software Development" subtitle="Custom software and web applications built for performance, security, and growth." breadcrumb="Web Development" />

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Comprehensive Web Development Services
            </h2>
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

      {/* Process */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Our Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">How We Build Your Solution</h2>
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

      {/* Tech Stack */}
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
export default WebDevelopment;
