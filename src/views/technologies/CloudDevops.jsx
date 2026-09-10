import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Cloud, Shield, Zap, Server, Layers, Code2 } from "lucide-react";
const techs = [
    { name: "AWS", desc: "Amazon's comprehensive cloud platform with 200+ services for computing, storage, and more." },
    { name: "Google Cloud", desc: "Google's cloud infrastructure with strengths in data analytics, AI/ML, and Kubernetes." },
    { name: "Microsoft Azure", desc: "Enterprise cloud platform with seamless integration into Microsoft ecosystems." },
    { name: "Docker", desc: "Containerization platform for consistent development, testing, and deployment environments." },
    { name: "Kubernetes", desc: "Container orchestration system for automated deployment, scaling, and management." },
    { name: "Terraform", desc: "Infrastructure as Code tool for provisioning and managing cloud resources declaratively." },
];
const features = [
    { icon: Cloud, title: "Cloud Migration", desc: "Seamless migration of applications and data to cloud infrastructure." },
    { icon: Shield, title: "Security & Compliance", desc: "Cloud security best practices with compliance frameworks." },
    { icon: Zap, title: "CI/CD Pipelines", desc: "Automated build, test, and deployment pipelines for rapid delivery." },
    { icon: Server, title: "Infrastructure as Code", desc: "Reproducible, version-controlled infrastructure management." },
    { icon: Layers, title: "Container Orchestration", desc: "Docker and Kubernetes for scalable microservices deployments." },
    { icon: Code2, title: "Monitoring & Logging", desc: "Real-time monitoring, alerting, and centralized log management." },
];
const CloudDevops = () => (<div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner title="Cloud & DevOps" subtitle="Accelerate delivery with modern cloud infrastructure and DevOps practices" breadcrumb="Technologies / Cloud & DevOps"/>
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">Cloud-Native Engineering</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">We help you leverage cloud infrastructure and DevOps automation for faster, more reliable software delivery.</p>
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
export default CloudDevops;
