import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Users, Clock, Shield, Headphones, Target, TrendingUp, } from "lucide-react";
const features = [
    { icon: Users, title: "Dedicated Development Teams", desc: "Hand-picked engineers fully dedicated to your project, working as an extension of your team." },
    { icon: Clock, title: "Flexible Engagement Models", desc: "Choose from full-time, part-time, or hourly engagement models that fit your needs." },
    { icon: Shield, title: "IP Protection & NDA", desc: "Complete intellectual property protection with strict NDAs and secure development environments." },
    { icon: Headphones, title: "24/7 Communication", desc: "Overlapping time zones, daily standups, and real-time collaboration via Slack, Teams, or Jira." },
    { icon: Target, title: "Rapid Team Scaling", desc: "Scale your team up or down within days based on project requirements." },
    { icon: TrendingUp, title: "Performance Tracking", desc: "Regular performance reviews, KPI tracking, and transparent reporting." },
];
const roles = [
    "Frontend Developers", "Backend Developers", "Full Stack Developers",
    "Mobile Developers", "DevOps Engineers", "QA Engineers",
    "UI/UX Designers", "Project Managers", "AI/ML Engineers",
];
const process = [
    { step: "01", title: "Share Requirements", desc: "Tell us about your project, tech stack, and the skills you need in your team." },
    { step: "02", title: "Meet Your Team", desc: "Review curated profiles, conduct interviews, and select your ideal developers." },
    { step: "03", title: "Onboard & Start", desc: "Quick onboarding with your tools, processes, and codebase within days." },
    { step: "04", title: "Deliver & Scale", desc: "Your team delivers quality code while we handle HR, payroll, and infrastructure." },
];
const DedicatedTeams = () => {
    return (<div className="min-h-screen bg-background">
      <Navbar />
      <PageBanner title="Dedicated Development Teams" subtitle="On-demand skilled developers & engineers who work as your extended team." breadcrumb="Dedicated Teams"/>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Why Choose Dedicated Teams</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (<div key={f.title} className="group bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:border-accent/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <f.icon className="text-accent" size={28}/>
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary">How It Works</h2>
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
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Available Roles</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Roles We Can Fill</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {roles.map((role) => (<span key={role} className="px-5 py-2.5 bg-card border border-border rounded-full text-sm font-medium text-primary hover:border-accent hover:text-accent transition-colors">
                {role}
              </span>))}
          </div>
        </div>
      </section>

      <CTASection />
      <ContactSection />
      <Footer />
    </div>);
};
export default DedicatedTeams;
