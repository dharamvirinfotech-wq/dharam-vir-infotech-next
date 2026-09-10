import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Brain, Zap, Shield, Layers, Globe, Code2 } from "lucide-react";
const techs = [
    { name: "TensorFlow", desc: "Google's open-source ML framework for building and deploying machine learning models at scale." },
    { name: "PyTorch", desc: "Facebook's deep learning framework known for flexibility and dynamic computation graphs." },
    { name: "OpenAI", desc: "GPT and DALL-E APIs for natural language processing, content generation, and image creation." },
    { name: "Scikit-learn", desc: "Python library for classical machine learning algorithms, preprocessing, and model evaluation." },
    { name: "Hugging Face", desc: "Platform for state-of-the-art NLP models, transformers, and model sharing." },
    { name: "LangChain", desc: "Framework for building applications powered by large language models with chaining capabilities." },
];
const features = [
    { icon: Brain, title: "Custom AI Models", desc: "Tailored machine learning models for your specific business needs." },
    { icon: Zap, title: "NLP & Chatbots", desc: "Intelligent conversational AI and natural language processing solutions." },
    { icon: Shield, title: "Computer Vision", desc: "Image recognition, object detection, and visual data analysis." },
    { icon: Layers, title: "Predictive Analytics", desc: "Data-driven insights and forecasting for business intelligence." },
    { icon: Globe, title: "AI Integration", desc: "Seamlessly integrate AI capabilities into existing applications." },
    { icon: Code2, title: "MLOps", desc: "End-to-end ML pipeline management, monitoring, and deployment." },
];
const AiMl = () => (<div className="min-h-screen bg-background">
    <AnimatedNavbar />
    <PageBanner title="AI & Machine Learning" subtitle="Harness the power of artificial intelligence to transform your business" breadcrumb="Technologies / AI & ML"/>
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">Intelligent Solutions</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">We build AI-powered applications that automate processes, unlock insights, and create competitive advantages.</p>
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
export default AiMl;
