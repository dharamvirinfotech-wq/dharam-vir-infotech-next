import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Smartphone, CheckCircle, Layers, Zap, Shield, Globe, } from "lucide-react";
const features = [
  { icon: Smartphone, title: "Native App Development", desc: "High-performance iOS and Android apps built with Swift, Kotlin, and platform-specific tools." },
  { icon: Layers, title: "Cross-Platform Development", desc: "Single codebase apps using React Native and Flutter for faster time-to-market." },
  { icon: Zap, title: "App Performance Optimization", desc: "Speed up your existing mobile apps with profiling, caching, and architecture improvements." },
  { icon: Globe, title: "Progressive Web Apps", desc: "Mobile-first web apps that work offline and can be installed on any device." },
  { icon: Shield, title: "App Security & Compliance", desc: "Secure data handling, encryption, and compliance with GDPR, HIPAA standards." },
  { icon: CheckCircle, title: "App Store Deployment", desc: "End-to-end publishing support for Apple App Store and Google Play Store." },
];
const techStack = [
  "React Native", "Flutter", "Swift", "Kotlin", "Objective-C",
  "Java", "Dart", "Firebase", "GraphQL", "REST APIs",
];
const process = [
  { step: "01", title: "Strategy & Research", desc: "Market research, competitor analysis, and feature prioritization for your app." },
  { step: "02", title: "Wireframing & Prototyping", desc: "Interactive prototypes to validate user flows before development begins." },
  { step: "03", title: "Agile Development", desc: "Iterative sprints with regular demos to keep you in the loop." },
  { step: "04", title: "Launch & Growth", desc: "Store submission, analytics setup, and ongoing feature updates." },
];
const MobileDevelopment = () => {
  return (
    <div className="min-h-screen bg-backgrounds bg-gradient-to-br from-[#f6f9fc] via-[#edf2f8] to-[#f8fafc] ">
      <AnimatedNavbar />
      <PageBanner title="Mobile App Development" subtitle="Native & cross-platform mobile solutions that deliver exceptional user experiences." breadcrumb="Mobile Development" />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Mobile App Development Services</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary">From Idea to App Store</h2>
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
export default MobileDevelopment;
