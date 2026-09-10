import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Code2, Rocket, GitBranch, TestTube, Settings, Users, } from "lucide-react";
const features = [
  { icon: Rocket, title: "MVP Development", desc: "Rapidly build and launch minimum viable products to validate your idea in the market." },
  { icon: Code2, title: "Full Product Development", desc: "End-to-end product engineering from architecture design to production deployment." },
  { icon: GitBranch, title: "Product Modernization", desc: "Migrate legacy systems to modern tech stacks with zero downtime." },
  { icon: TestTube, title: "QA & Testing", desc: "Comprehensive testing strategies including unit, integration, e2e, and performance testing." },
  { icon: Settings, title: "DevOps & CI/CD", desc: "Automated build, test, and deployment pipelines for rapid and reliable releases." },
  { icon: Users, title: "Product Consulting", desc: "Strategic guidance on product roadmap, architecture, and technology decisions." },
];
const techStack = [
  "React.js", "Node.js", "TypeScript", "Docker", "Kubernetes",
  "AWS", "GitHub Actions", "Jenkins", "Terraform", "Redis",
];
const process = [
  { step: "01", title: "Ideation & Validation", desc: "Validate your product idea with market research, user interviews, and feasibility analysis." },
  { step: "02", title: "Architecture & Design", desc: "Design scalable system architecture and intuitive user interfaces." },
  { step: "03", title: "Iterative Development", desc: "Agile sprints with bi-weekly releases and continuous stakeholder feedback." },
  { step: "04", title: "Scale & Evolve", desc: "Performance optimization, feature expansion, and scaling for growth." },
];
const ProductEngineering = () => {
  return (
    <div className="min-h-screen bg-backgrounds bg-gradient-to-br from-[#f6f9fc] via-[#edf2f8] to-[#f8fafc] ">
      <AnimatedNavbar />
      <PageBanner title="Software Product Engineering" subtitle="End-to-end product development from ideation to launch and beyond." breadcrumb="Product Engineering" />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Product Engineering Services</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Engineering Process</h2>
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
export default ProductEngineering;
