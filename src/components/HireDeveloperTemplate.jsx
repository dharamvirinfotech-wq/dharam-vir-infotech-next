import { Link } from "@/lib/router-compat";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import { CheckCircle, Clock, DollarSign, Shield, Users, Zap, Star, MapPin, Briefcase } from "lucide-react";
const defaultBenefits = [
    { icon: Clock, title: "Quick Onboarding", desc: "Get your dedicated developer up and running within 24-48 hours." },
    { icon: DollarSign, title: "Cost Effective", desc: "Save up to 60% compared to hiring locally in the US, UK, or Europe." },
    { icon: Shield, title: "IP Protection", desc: "Strict NDAs and data security protocols to protect your intellectual property." },
    { icon: Users, title: "Dedicated Resources", desc: "Full-time developers working exclusively on your project." },
    { icon: Zap, title: "Agile Development", desc: "Sprint-based delivery with daily standups and weekly demos." },
    { icon: CheckCircle, title: "Quality Assurance", desc: "Code reviews, automated testing, and continuous integration included." },
];
const hiringProcess = [
    { step: "01", title: "Share Requirements", desc: "Tell us about your project scope, technology stack, and timeline." },
    { step: "02", title: "Screen & Select", desc: "Review pre-vetted developer profiles and conduct interviews." },
    { step: "03", title: "Onboard & Start", desc: "Your developer integrates with your team and starts contributing." },
    { step: "04", title: "Manage & Scale", desc: "Scale your team up or down based on project needs." },
];
const generateDefaultDevelopers = (role) => [
    { name: "Rahul Sharma", role, experience: "8+ Years", hourlyRate: "$25-35", rating: 4.9, location: "Bangalore, India", avatar: "RS", skills: ["Team Lead", "Architecture", "Mentoring"] },
    { name: "Priya Patel", role, experience: "6+ Years", hourlyRate: "$20-30", rating: 4.8, location: "Pune, India", avatar: "PP", skills: ["UI/UX", "Performance", "Testing"] },
    { name: "Amit Kumar", role, experience: "5+ Years", hourlyRate: "$18-25", rating: 4.7, location: "Hyderabad, India", avatar: "AK", skills: ["API Design", "Database", "Security"] },
    { name: "Sneha Reddy", role, experience: "7+ Years", hourlyRate: "$22-32", rating: 4.9, location: "Chennai, India", avatar: "SR", skills: ["Full Stack", "DevOps", "Agile"] },
    { name: "Vikram Singh", role, experience: "4+ Years", hourlyRate: "$15-22", rating: 4.6, location: "Noida, India", avatar: "VS", skills: ["Frontend", "Mobile", "CI/CD"] },
    { name: "Ananya Gupta", role, experience: "9+ Years", hourlyRate: "$28-40", rating: 5.0, location: "Mumbai, India", avatar: "AG", skills: ["Enterprise", "Cloud", "Strategy"] },
];
const HireDeveloperTemplate = ({ title, subtitle, breadcrumb, description, skills, benefits = defaultBenefits, whyHire, developers, }) => {
    const roleLabel = title.replace("Hire ", "");
    const devProfiles = developers || generateDefaultDevelopers(roleLabel);
    return (<div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner title={title} subtitle={subtitle} breadcrumb={breadcrumb}/>

    {/* Overview */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Why {title}?</h2>
          <p className="text-muted-foreground text-center mb-10 text-lg">{description}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {whyHire.map((point, i) => (<div key={i} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={20}/>
                <p className="text-sm text-foreground">{point}</p>
              </div>))}
          </div>
        </div>
      </div>
    </section>

    {/* Developer Profiles Gallery */}
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">Meet Our {roleLabel}s</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">Pre-vetted, experienced developers ready to join your team immediately.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {devProfiles.map((dev) => {
            const devSlug = dev.name.toLowerCase().replace(/\s+/g, "-");
            return (<Link to={`/developer/${devSlug}?role=${encodeURIComponent(dev.role)}`} key={dev.name} className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 group block">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center text-xl font-bold text-accent">
                  {dev.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-primary text-lg">{dev.name}</h3>
                  <p className="text-muted-foreground text-sm">{dev.role}</p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase size={14} className="text-accent"/>
                    <span>{dev.experience}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500"/>
                    <span className="text-sm font-semibold text-foreground">{dev.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={14} className="text-accent"/>
                  <span>{dev.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={14} className="text-accent"/>
                  <span className="text-lg font-bold text-primary">{dev.hourlyRate}</span>
                  <span className="text-xs text-muted-foreground">/ hour</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {dev.skills.map((s) => (<span key={s} className="text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full font-medium">{s}</span>))}
              </div>
              <span className="block w-full text-center bg-accent text-accent-foreground py-2.5 rounded-lg font-semibold text-sm group-hover:bg-accent/90 transition-colors">
                View Profile & Hire
              </span>
            </Link>);
        })}
        </div>
      </div>
    </section>

    {/* Skills */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">Core Skills & Expertise</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">Our developers are proficient in a wide range of tools and technologies.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {skills.map((skill) => (<div key={skill.name} className="bg-card border border-border rounded-lg p-4 text-center hover:border-accent transition-colors">
              <p className="font-semibold text-primary text-sm">{skill.name}</p>
            </div>))}
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">Benefits of Hiring From India</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">Access top-tier Indian developers at competitive rates with no compromise on quality.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => (<div key={b.title} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <b.icon className="text-accent" size={24}/>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{b.title}</h3>
              <p className="text-muted-foreground text-sm">{b.desc}</p>
            </div>))}
        </div>
      </div>
    </section>

    {/* Hiring Process */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">Simple Hiring Process</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {hiringProcess.map((p) => (<div key={p.step} className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">{p.step}</div>
              <h3 className="font-bold text-primary mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm">{p.desc}</p>
            </div>))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-primary rounded-2xl p-10 md:p-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to Hire Your Developer?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Get a skilled, dedicated developer for your project within 48 hours. No long-term contracts required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
              Hire Now
            </Link>
            <Link to="/portfolio" className="border border-primary-foreground/30 text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors">
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>);
};
export default HireDeveloperTemplate;
