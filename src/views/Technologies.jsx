import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Code2, Database, Cloud, Smartphone, Brain, Blocks,
  Server, Shield, ArrowRight, CheckCircle, Zap,
} from "lucide-react";
import { Link } from "@/lib/router-compat";

const techCategories = [
  {
    id: "frontend",
    icon: Code2,
    title: "Frontend Technologies",
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    desc: "Building stunning, responsive user interfaces with modern frameworks that deliver exceptional user experiences.",
    techs: ["React.js", "Next.js", "Angular", "Vue.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3", "Bootstrap"],
    contactHref: "/contact",
    contactLabel: "Get Frontend Experts",
  },
  {
    id: "backend",
    icon: Server,
    title: "Backend Technologies",
    color: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    desc: "Scalable server-side architectures powering your applications with high performance and reliability.",
    techs: ["Node.js", "Python", "Django", "PHP", "Laravel", "Java", "Spring Boot", ".NET Core"],
    contactHref: "/contact",
    contactLabel: "Get Backend Experts",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Technologies",
    color: "from-green-500/20 to-emerald-500/10",
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10 border-green-500/20",
    desc: "Native and cross-platform mobile solutions for iOS & Android with seamless performance.",
    techs: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic", "Xamarin"],
    contactHref: "/contact",
    contactLabel: "Get Mobile Experts",
  },
  {
    id: "database",
    icon: Database,
    title: "Database & Storage",
    color: "from-orange-500/20 to-amber-500/10",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10 border-orange-500/20",
    desc: "Robust data management solutions for every scale — from relational to NoSQL.",
    techs: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "Elasticsearch", "DynamoDB"],
    contactHref: "/contact",
    contactLabel: "Get Data Experts",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & DevOps",
    color: "from-sky-500/20 to-blue-500/10",
    iconColor: "text-sky-500",
    iconBg: "bg-sky-500/10 border-sky-500/20",
    desc: "Cloud infrastructure and CI/CD pipeline management for enterprise-grade deployment.",
    techs: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Jenkins", "Terraform", "GitHub Actions"],
    contactHref: "/contact",
    contactLabel: "Get DevOps Experts",
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI & Machine Learning",
    color: "from-pink-500/20 to-rose-500/10",
    iconColor: "text-pink-500",
    iconBg: "bg-pink-500/10 border-pink-500/20",
    desc: "Intelligent solutions with cutting-edge AI & ML technologies to automate and innovate.",
    techs: ["TensorFlow", "PyTorch", "OpenAI", "LangChain", "Scikit-learn", "Hugging Face", "Computer Vision"],
    contactHref: "/contact",
    contactLabel: "Get AI/ML Experts",
  },
  {
    id: "cms",
    icon: Blocks,
    title: "CMS & E-commerce",
    color: "from-teal-500/20 to-green-500/10",
    iconColor: "text-teal-500",
    iconBg: "bg-teal-500/10 border-teal-500/20",
    desc: "Content management and online store platforms that scale with your business growth.",
    techs: ["WordPress", "Shopify", "Magento", "WooCommerce", "Strapi", "Contentful"],
    contactHref: "/contact",
    contactLabel: "Get CMS Experts",
  },
  {
    id: "security",
    icon: Shield,
    title: "Security & Testing",
    color: "from-red-500/20 to-orange-500/10",
    iconColor: "text-red-500",
    iconBg: "bg-red-500/10 border-red-500/20",
    desc: "Ensuring quality, reliability, and security of your products with comprehensive testing.",
    techs: ["Jest", "Cypress", "Selenium", "OAuth 2.0", "JWT", "SSL/TLS", "Penetration Testing"],
    contactHref: "/contact",
    contactLabel: "Get QA & Security Experts",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Technologies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageBanner
        title="Technologies We Master"
        subtitle="Leveraging cutting-edge technologies to build future-proof, scalable, and high-performance digital solutions."
        breadcrumb="Technologies"
      />

      {/* Tech Stack Overview */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        {/* Ambient Glow Bg */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-4">
              <Zap size={13} />
              Our Tech Stack
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight leading-tight mb-4">
              Tools & Technologies<br />
              <span className="text-accent">We Excel In</span>
            </h2>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
              We work with the best-in-class technologies across every domain to deliver reliable, scalable, and innovative software solutions.
            </p>
          </motion.div>

          {/* Tech Category Cards */}
          <motion.div
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {techCategories.map((cat) => (
              <motion.div
                key={cat.id}
                id={cat.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative bg-background border border-border/70 rounded-2xl p-6 hover:border-border hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Gradient Background Tint */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl`} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${cat.iconBg} transition-transform group-hover:scale-110 duration-300`}>
                      <cat.icon className={cat.iconColor} size={23} />
                    </div>
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-primary leading-snug">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cat.techs.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-muted text-foreground border border-border hover:bg-accent/10 hover:text-accent hover:border-accent/30 transition-colors cursor-default"
                      >
                        <CheckCircle size={10} className="text-accent opacity-70" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="relative z-10 pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className={`text-xs font-semibold ${cat.iconColor} flex items-center gap-1.5`}>
                    <cat.icon size={13} />
                    {cat.techs.length} Technologies
                  </span>
                  <Link
                    to={cat.contactHref}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-accent text-white px-3.5 py-1.5 rounded-lg hover:bg-primary transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    {cat.contactLabel}
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Technologies;
