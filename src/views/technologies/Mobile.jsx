import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Smartphone, Zap, Shield, Layers, Globe, Code2 } from "lucide-react";
const techs = [
    { name: "React Native", desc: "Cross-platform mobile development with native performance using JavaScript and React." },
    { name: "Flutter", desc: "Google's UI toolkit for building natively compiled apps from a single Dart codebase." },
    { name: "Swift", desc: "Apple's modern language for building fast, safe, and expressive iOS and macOS applications." },
    { name: "Kotlin", desc: "Modern JVM language for Android development with concise syntax and null safety." },
    { name: "Ionic", desc: "Hybrid app framework using web technologies for cross-platform mobile applications." },
    { name: "Xamarin", desc: "Microsoft's framework for building native mobile apps with shared C# codebase." },
];
const features = [
    { icon: Smartphone, title: "Native Performance", desc: "Apps that feel truly native on both iOS and Android platforms." },
    { icon: Zap, title: "Fast Development", desc: "Cross-platform frameworks for rapid development and deployment." },
    { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security with encrypted data and secure APIs." },
    { icon: Layers, title: "Offline Support", desc: "Apps that work seamlessly even without internet connectivity." },
    { icon: Globe, title: "Push Notifications", desc: "Real-time engagement through targeted push notifications." },
    { icon: Code2, title: "App Store Ready", desc: "Optimized for Apple App Store and Google Play Store guidelines." },
];
const Mobile = () => (<div className="min-h-screen bg-background">
    <AnimatedNavbar />
    <PageBanner title="Mobile Technologies" subtitle="Building native and cross-platform mobile experiences that users love" breadcrumb="Technologies / Mobile"/>
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">Mobile-First Development</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">We deliver high-performance mobile apps with intuitive UX for iOS and Android platforms.</p>
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
export default Mobile;
