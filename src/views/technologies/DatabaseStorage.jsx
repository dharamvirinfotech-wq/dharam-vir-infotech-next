import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Database, Shield, Zap, Server, Layers, Globe } from "lucide-react";
const techs = [
    { name: "PostgreSQL", desc: "Advanced open-source relational database with ACID compliance and extensibility." },
    { name: "MongoDB", desc: "Document-oriented NoSQL database for flexible, scalable data storage." },
    { name: "MySQL", desc: "World's most popular open-source relational database for web applications." },
    { name: "Redis", desc: "In-memory data store for caching, session management, and real-time analytics." },
    { name: "Elasticsearch", desc: "Distributed search and analytics engine for log analysis and full-text search." },
    { name: "Firebase", desc: "Google's real-time database and backend-as-a-service for rapid app development." },
];
const features = [
    { icon: Database, title: "Schema Design", desc: "Optimized database schemas for performance and data integrity." },
    { icon: Shield, title: "Data Security", desc: "Encryption at rest and in transit with role-based access control." },
    { icon: Zap, title: "High Performance", desc: "Query optimization, indexing, and caching for fast data access." },
    { icon: Server, title: "Replication & Backup", desc: "Automated backups, failover, and disaster recovery strategies." },
    { icon: Layers, title: "Data Migration", desc: "Seamless migration between database systems with zero downtime." },
    { icon: Globe, title: "Scalable Storage", desc: "Horizontal and vertical scaling for growing data needs." },
];
const DatabaseStorage = () => (<div className="min-h-screen bg-background">
    <Navbar />
    <PageBanner title="Database & Storage" subtitle="Reliable, scalable, and secure data storage solutions for modern applications" breadcrumb="Technologies / Database"/>
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">Data-Driven Solutions</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">We architect robust data layers that power your applications with reliability and speed.</p>
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
export default DatabaseStorage;
