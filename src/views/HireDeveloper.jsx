import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { hireCategories } from "@/data/navigation";
import { ArrowRight, CheckCircle, Users, Clock, Shield } from "lucide-react";
const benefits = [
    { icon: Users, title: "Vetted Experts", desc: "Pre-screened developers with 5+ years of experience" },
    { icon: Clock, title: "Quick Onboarding", desc: "Start your project within 24-48 hours" },
    { icon: Shield, title: "100% NDA Protected", desc: "Your ideas and code remain fully secure" },
];
const HireDeveloper = () => {
    return (<div className="min-h-screen">
      <Navbar />
      <PageBanner title="Hire Dedicated Developers" subtitle="Scale your team with top-tier developers, hand-picked for your project" breadcrumb="Hire Developer"/>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b) => (<div key={b.title} className="flex items-start gap-4 bg-background border border-border rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <b.icon className="text-accent" size={24}/>
                </div>
                <div>
                  <h3 className="font-display font-bold text-primary text-base">
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{b.desc}</p>
                </div>
              </div>))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-primary mb-3">
              Hire Developers By Expertise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our pool of skilled developers across multiple
              technologies and domains
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hireCategories.map((cat) => (<div key={cat.label} className="bg-background border border-border rounded-xl p-7 hover:shadow-lg transition-shadow">
                <h3 className="font-display text-lg font-bold text-primary mb-5">
                  {cat.label}
                </h3>
                <ul className="space-y-3">
                  {cat.technologies.map((tech) => (<li key={tech.name}>
                      <a href={tech.href} className="group flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors">
                        <CheckCircle size={16} className="text-accent flex-shrink-0"/>
                        {tech.name}
                        <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-accent"/>
                      </a>
                    </li>))}
                </ul>
              </div>))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>);
};
export default HireDeveloper;
