import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Loader2, Send, Clock, ShieldCheck } from "lucide-react";
import { contactApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import SectionHeader from "@/components/SectionHeader";
const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    service: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await contactApi.submit(form);
      toast({
        title: "Message sent successfully!",
        description: "Our technical team will respond within 2 hours.",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        service: "",
        message: "",
      });
    }
    catch (err) {
      toast({
        title: "Failed to send message",
        description: err?.response?.data?.message || "Please try again later.",
        variant: "destructive",
      });
    }
    finally {
      setSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-10 sm:py-12 bg-backgrounds relative overflow-hidden select-none">
      {/* Ambient Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reusable Section Header */}
        <SectionHeader badge="GET IN TOUCH" titlePrefix="Let's Discuss Your Next" titleHighlight="Digital Innovation" description="Have a software project, mobile app idea, or cloud infrastructure need? Speak directly with our technical experts." centered={true} />

        {/* Main Glassmorphic Wrapper Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl max-w-6xl mx-auto relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            {/* Left Column: Direct Contact Info & Badges (5 Columns on LG) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-accent font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-accent/10 border border-accent/20 inline-block">
                  Direct Channels
                </span>
                <h3 className="font-display text-2xl font-bold text-primary dark:text-white leading-tight">
                  Reach Out To Our Engineering Lead
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                  We are available 24/7 for technical inquiries, project estimates, and technology consulting.
                </p>
              </div>

              {/* Interactive Contact Cards */}
              <div className="space-y-4 pt-2">
                {/* Phone */}
                <a href="tel:+918750299299" className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      Direct Phone / WhatsApp
                    </h4>
                    <p className="font-display font-bold text-primary dark:text-white text-base group-hover:text-accent transition-colors">
                      +91 8750 299 299
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:info@dharamvirinfotech.com" className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      Official Inquiry Email
                    </h4>
                    <p className="font-display font-bold text-primary dark:text-white text-sm sm:text-base group-hover:text-accent transition-colors break-all">
                      info@dharamvirinfotech.com
                    </p>
                  </div>
                </a>

                {/* Office Location */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      Global Headquarters
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                      Rani Laxmibai Nagar, Yusufpur, Center, Greater Noida, Chipyana Khurd Urf Tigri, Uttar Pradesh 201009, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time Guarantee Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 border-t border-border/40">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-accent" />
                  <span>Sub-2h Response Time</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-primary" />
                  <span>Strict NDA Protected</span>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Contact Form (7 Columns on LG) */}
            <div className="lg:col-span-7 bg-slate-50/50 dark:bg-slate-900/30 p-6 sm:p-7 rounded-2xl border border-slate-200/60 dark:border-slate-800">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Name & Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 uppercase font-mono">
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <input type="text" placeholder="e.g. Rahul Sharma" required maxLength={150} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all text-sm font-sans" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 uppercase font-mono">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input type="email" placeholder="e.g. rahul@company.com" required maxLength={190} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all text-sm font-sans" />
                  </div>
                </div>

                {/* Row 2: Phone & Subject */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 uppercase font-mono">
                      Phone Number
                    </label>
                    <input type="tel" placeholder="+91 98765 43210" maxLength={30} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all text-sm font-sans" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 uppercase font-mono">
                      Project Subject
                    </label>
                    <input type="text" placeholder="Web / Mobile / AI App" maxLength={255} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all text-sm font-sans" />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 uppercase font-mono">
                    Service Required
                  </label>
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all text-sm font-sans cursor-pointer">
                    <option value="">Select Primary Service Interest</option>
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="Mobile App Development">Mobile App Development (iOS/Android)</option>
                    <option value="Hire Dedicated Developers">Hire Dedicated Developers</option>
                    <option value="AI & Neural Engineering">AI & Neural Engineering</option>
                    <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
                    <option value="General Inquiry">General Technical Inquiry</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 uppercase font-mono">
                    Project Details <span className="text-accent">*</span>
                  </label>
                  <textarea placeholder="Tell us briefly about your project goals, timelines, and technical requirements..." rows={4} required maxLength={5000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all text-sm font-sans resize-none" />
                </div>

                {/* Submit Button */}
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={submitting} className="w-full bg-accent hover:bg-primary text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-60 flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-mono cursor-pointer">
                  {submitting ? (<>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Sending Request...</span>
                  </>) : (<>
                    <span>Send Project Request</span>
                    <Send size={16} />
                  </>)}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);
};
export default ContactSection;
