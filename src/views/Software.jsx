import { Link } from "@/lib/router-compat";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { ArrowRight } from "lucide-react";
import { softwareCategories, megaSoftware } from "@/data/navigation";
const Software = () => (
  <div className="min-h-screen bg-backgrounds bg-gradient-to-br from-[#f6f9fc] via-[#edf2f8] to-[#f8fafc] ">
    <Seo title="Software Products — PDF Tools, Email Migration & Backup Utilities | Dharam Vir Infotech" description="Powerful Windows utilities for PDF unlocking, Bates numbering, MBOX to PDF conversion, IMAP and Gmail backups. Trusted by legal, IT and compliance teams." path="/software" image="/og/software.jpg" />
    <AnimatedNavbar />
    <PageBanner title="Software Products" subtitle="Powerful desktop utilities for PDF management, email migration, and secure backups" breadcrumb="Software" />

    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {megaSoftware.map((item) => (<Link key={item.title} to={item.href} className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-accent transition-all">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20">
              <item.icon className="text-accent" size={24} />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </Link>))}
        </div>

        <div className="space-y-12">
          {softwareCategories.map((cat) => (<div key={cat.label}>
            <h2 className="text-2xl font-display font-bold text-primary mb-6 border-l-4 border-accent pl-4">
              {cat.label}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {cat.technologies.map((tech) => (<Link key={tech.href} to={tech.href} className="group flex items-center justify-between p-5 bg-card border border-border rounded-lg hover:border-accent hover:shadow-md transition-all">
                <span className="text-foreground font-medium group-hover:text-accent">
                  {tech.name}
                </span>
                <ArrowRight className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
              </Link>))}
            </div>
          </div>))}
        </div>
      </div>
    </section>

    <CTASection />
    <Footer />
  </div>);
export default Software;
