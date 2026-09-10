import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Brain, BarChart3, MessageSquare, Eye, Bot, Cpu, } from "lucide-react";
const features = [
    { icon: Brain, title: "Machine Learning Solutions", desc: "Custom ML models for prediction, classification, and recommendation systems." },
    { icon: MessageSquare, title: "Natural Language Processing", desc: "Chatbots, sentiment analysis, text summarization, and language translation tools." },
    { icon: Eye, title: "Computer Vision", desc: "Image recognition, object detection, and visual inspection systems for automation." },
    { icon: BarChart3, title: "Predictive Analytics", desc: "Data-driven insights and forecasting models to power smarter business decisions." },
    { icon: Bot, title: "AI Chatbots & Assistants", desc: "Intelligent conversational AI powered by GPT, LLaMA, and custom LLMs." },
    { icon: Cpu, title: "MLOps & Deployment", desc: "End-to-end ML pipeline setup, monitoring, and continuous model improvement." },
];
const techStack = [
    "TensorFlow", "PyTorch", "OpenAI", "Scikit-learn", "Hugging Face",
    "LangChain", "Python", "Jupyter", "Keras", "Apache Spark",
];
const process = [
    { step: "01", title: "Data Assessment", desc: "Evaluate your data assets and identify AI opportunities for maximum business impact." },
    { step: "02", title: "Model Development", desc: "Build and train custom models using state-of-the-art algorithms and frameworks." },
    { step: "03", title: "Integration & Testing", desc: "Seamlessly integrate AI models into your existing workflows and validate results." },
    { step: "04", title: "Monitoring & Optimization", desc: "Continuous model performance tracking with automated retraining pipelines." },
];
const AiDevelopment = () => {
    return (<div className="min-h-screen bg-background">
      <Navbar />
      <PageBanner title="AI & Machine Learning Development" subtitle="Intelligent automation & predictive analytics to transform your business operations." breadcrumb="AI & ML Development"/>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">AI & ML Development Services</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Our AI Development Process</h2>
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
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Technologies</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Technologies We Use</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (<span key={tech} className="px-5 py-2.5 bg-card border border-border rounded-full text-sm font-medium text-primary hover:border-accent hover:text-accent transition-colors">
                {tech}
              </span>))}
          </div>
        </div>
      </section>

      <CTASection />
      <ContactSection />
      <Footer />
    </div>);
};
export default AiDevelopment;
