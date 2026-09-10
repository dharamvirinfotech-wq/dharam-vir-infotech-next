import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Globe, Smartphone, Brain, ShoppingCart, Code2, Users, CheckCircle, ArrowRight, } from "lucide-react";
const services = [
    {
        icon: Globe,
        title: "Web & Software Development",
        desc: "Custom software and web applications built for performance, security, and growth. We craft solutions that align with your business goals and scale with your success.",
        items: [
            "Enterprise Software Solutions",
            "CRM & ERP Development",
            "Responsive Website Design",
            "API Development & Integration",
            "Cloud-Based Applications",
            "Maintenance & Support",
        ],
    },
    {
        icon: Smartphone,
        title: "Mobile App Development",
        desc: "High-performing mobile apps that function smoothly across all platforms. From concept to deployment, we build apps users love.",
        items: [
            "Android & iOS Native Apps",
            "Cross-Platform Development",
            "UI/UX for Mobile",
            "App Store Deployment",
            "App Performance Optimization",
            "Post-Launch Support",
        ],
    },
    {
        icon: Brain,
        title: "AI & ML Development",
        desc: "Advanced AI and machine learning solutions to transform operations, automate workflows, and deliver actionable insights.",
        items: [
            "Custom AI Solutions",
            "Chatbot Development",
            "Generative AI Integration",
            "Predictive Modeling",
            "Natural Language Processing",
            "Computer Vision Solutions",
        ],
    },
    {
        icon: ShoppingCart,
        title: "E-commerce Solutions",
        desc: "Engaging, secure, and scalable online stores that drive conversions and build customer loyalty across all channels.",
        items: [
            "Custom Store Development",
            "Platform Integration (Shopify, WooCommerce)",
            "Payment Gateway Setup",
            "Inventory Management Systems",
            "Multi-Vendor Marketplaces",
            "Maintenance & Support",
        ],
    },
    {
        icon: Code2,
        title: "Software Product Engineering",
        desc: "End-to-end software services to guide your project from prototype to live launch with quality at every stage.",
        items: [
            "MVP Development",
            "Progressive Web Apps",
            "UI/UX Design & Prototyping",
            "App Modernization",
            "Quality Assurance & Testing",
            "DevOps & CI/CD Pipelines",
        ],
    },
    {
        icon: Users,
        title: "Dedicated Teams",
        desc: "On-demand access to skilled developers and engineers for seamless project scaling without the overhead.",
        items: [
            "Offshore Development Teams",
            "Staff Augmentation",
            "Hire Dedicated Developers",
            "Agile Team Integration",
            "Project-Based Teams",
            "Managed IT Services",
        ],
    },
];
const Services = () => {
    return (<div className="min-h-screen">
      <Navbar />
      <PageBanner title="Our Services" subtitle="Full-cycle digital services to design, build, and support your business growth with cutting-edge technology solutions." breadcrumb="Services"/>

      {/* Services Detail Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, index) => (<div key={service.title} className={`flex flex-col lg:flex-row gap-10 items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center">
                      <service.icon className="text-accent" size={28}/>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                    {service.items.map((item) => (<li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                        <CheckCircle className="text-accent flex-shrink-0" size={16}/>
                        {item}
                      </li>))}
                  </ul>
                  <a href="#contact" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:bg-accent/90 transition-colors">
                    Get Started <ArrowRight size={16}/>
                  </a>
                </div>

                {/* Visual Card */}
                <div className="flex-1 w-full">
                  <div className="bg-muted rounded-xl p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2"/>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2"/>
                    <service.icon className="text-accent/20 mb-6" size={80}/>
                    <h3 className="text-xl font-bold text-primary mb-3">
                      Why Choose Us for {service.title}?
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0"/>
                        Industry-experienced team with proven track record
                      </li>
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0"/>
                        Agile methodology for faster delivery
                      </li>
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0"/>
                        24/7 support and maintenance
                      </li>
                    </ul>
                  </div>
                </div>
              </div>))}
          </div>
        </div>
      </section>

      <CTASection />
      <ContactSection />
      <Footer />
    </div>);
};
export default Services;
