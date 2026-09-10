import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Link } from "@/lib/router-compat";
import { CheckCircle, ArrowRight } from "lucide-react";
const PromotionServiceTemplate = ({ title, subtitle, breadcrumb, features, benefits, process }) => (<div className="min-h-screen bg-background">
    <AnimatedNavbar />
    <PageBanner title={title} subtitle={subtitle} breadcrumb={breadcrumb}/>

    {/* Features */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-primary text-center mb-12">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

    {/* Benefits */}
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-primary text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {benefits.map((b) => (<div key={b} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
              <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={20}/>
              <span className="text-foreground text-sm">{b}</span>
            </div>))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-primary text-center mb-12">
          Our Process
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {process.map((p, i) => (<div key={i} className="text-center">
              <div className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {p.step}
              </div>
              <h3 className="font-bold text-primary mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm">{p.desc}</p>
            </div>))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Ready to Grow Your Business?</h2>
        <p className="mb-8 opacity-90 max-w-2xl mx-auto">Let our experts craft a customized strategy that drives real results.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
          Get a Free Consultation <ArrowRight size={18}/>
        </Link>
      </div>
    </section>

    <ContactSection />
    <Footer />
  </div>);
export default PromotionServiceTemplate;
