import { useState } from "react";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { jobPosts } from "@/data/careers";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, Users, Award, Zap, CheckCircle2, ArrowRight,
  Heart, Globe, Coffee, MapPin, Clock, DollarSign, Upload, X,
  Send, FileCheck, Building2, Sparkles, Star, TrendingUp,
  Laptop, Shield,
} from "lucide-react";
import { toast } from "sonner";

const perks = [
  { icon: Globe, title: "Remote-First Work", desc: "Flexibility to work from anywhere in the world with flexible hours.", color: "text-blue-500", bg: "bg-blue-50 border-blue-100" },
  { icon: TrendingUp, title: "Career Growth", desc: "Fast-track career advancement with continuous learning and mentorship.", color: "text-violet-500", bg: "bg-violet-50 border-violet-100" },
  { icon: Award, title: "Competitive Salary", desc: "Industry-leading remuneration package with performance bonuses.", color: "text-amber-500", bg: "bg-amber-50 border-amber-100" },
  { icon: Heart, title: "Health Insurance", desc: "Comprehensive health, dental, and medical insurance for your family.", color: "text-rose-500", bg: "bg-rose-50 border-rose-100" },
  { icon: Coffee, title: "Great Work Culture", desc: "Collaborative, inclusive environment with regular team events and retreats.", color: "text-orange-500", bg: "bg-orange-50 border-orange-100" },
  { icon: Laptop, title: "Latest Equipment", desc: "Work with top-of-the-line laptops, tools, and software paid by the company.", color: "text-green-500", bg: "bg-green-50 border-green-100" },
];

const hiringSteps = [
  { step: "01", label: "Apply Online", desc: "Submit your resume & cover letter" },
  { step: "02", label: "HR Screening", desc: "30-minute intro call with HR team" },
  { step: "03", label: "Technical Round", desc: "Live coding or design assessment" },
  { step: "04", label: "Final Interview", desc: "Meet with team lead & management" },
  { step: "05", label: "Offer & Onboard", desc: "Get your offer letter & join us!" },
];

const deptColors = {
  "Frontend Engineering": "bg-blue-100 text-blue-700 border-blue-200",
  "Backend Engineering": "bg-violet-100 text-violet-700 border-violet-200",
  "Software Development": "bg-green-100 text-green-700 border-green-200",
  "Mobile Engineering": "bg-orange-100 text-orange-700 border-orange-200",
  "Product Design": "bg-pink-100 text-pink-700 border-pink-200",
  "Infrastructure": "bg-sky-100 text-sky-700 border-sky-200",
};

const Career = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalTab, setModalTab] = useState("details");
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "",
    experience: "3-5 Years", expectedSalary: "",
    portfolioUrl: "", coverLetter: "",
  });

  const handleOpenModal = (job, initialTab = "details") => {
    setSelectedJob(job);
    setModalTab(initialTab);
    setSubmitted(false);
    setResumeFile(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) { toast.error("File size must be under 10MB"); return; }
      setResumeFile(file);
      toast.success(`Attached: ${file.name}`);
    }
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) { toast.error("Please fill in all required fields."); return; }
    if (!resumeFile) { toast.error("Please upload your resume (PDF or DOCX)."); return; }
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setSubmitted(true); toast.success(`Application submitted for ${selectedJob?.title}!`); }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageBanner
        title="Join Our Team & Build The Future"
        subtitle="Explore exciting career opportunities at Dharam Vir Infotech. Innovate, grow, and work on high-impact global projects."
        breadcrumb="Career"
      />

      {/* === Why Join Us / Perks === */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-slate-50/60">
        <div className="absolute -top-20 left-1/3 w-[400px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20 mb-3">
              <Star size={12} /> Work With Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary mt-2 tracking-tight">
              Perks & Culture at <span className="text-accent">Dharam Vir Infotech</span>
            </h2>
            <p className="text-slate-500 mt-3 text-sm md:text-base leading-relaxed">
              We empower engineers and creators with the resources, flexibility, and environment needed to do their best work.
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
            {perks.map((perk) => (
              <motion.div key={perk.title}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -5 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${perk.bg} ${perk.color} group-hover:scale-110 transition-transform duration-300`}>
                  <perk.icon size={22} />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-primary mb-1">{perk.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{perk.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === Hiring Process === */}
      <section className="py-14 md:py-16 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-10"
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20 mb-3">
              <Zap size={12} /> Our Process
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-primary mt-2 tracking-tight">
              How We Hire — Simple & Transparent
            </h2>
          </motion.div>
          <motion.div className="flex flex-wrap items-center justify-center gap-0"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            {hiringSteps.map((step, idx) => (
              <motion.div key={step.step}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex items-center">
                <div className="flex flex-col items-center text-center w-36 sm:w-40 py-4 px-2">
                  <div className="w-12 h-12 rounded-full bg-accent text-white font-extrabold text-sm flex items-center justify-center shadow-lg shadow-accent/20 mb-3">
                    {step.step}
                  </div>
                  <p className="text-sm font-bold text-primary leading-tight">{step.label}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{step.desc}</p>
                </div>
                {idx < hiringSteps.length - 1 && (
                  <ArrowRight size={18} className="text-accent/40 flex-shrink-0 hidden sm:block mb-4" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === Open Positions === */}
      <section id="open-positions" className="py-16 md:py-20 relative">
        <div className="absolute bottom-0 right-0 w-[350px] h-[300px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20 mb-3">
              <Sparkles size={12} /> Current Openings
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary mt-2 tracking-tight">
              Explore Active <span className="text-accent">Career Positions</span>
            </h2>
            <p className="text-slate-500 mt-3 text-sm md:text-base leading-relaxed">
              Click on any opening to view full requirements and submit your application directly.
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}>
            {jobPosts.map((job) => (
              <motion.div key={job.id}
                variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
                whileHover={{ y: -5 }}
                className="bg-background border border-border/80 hover:border-accent/40 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  {/* Department badge + type */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${deptColors[job.department] || "bg-accent/10 text-accent border-accent/20"}`}>
                      {job.department}
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1 flex-shrink-0">
                      <Clock size={11} /> {job.type}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-primary group-hover:text-accent transition-colors leading-snug mb-2">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><MapPin size={11} className="text-accent" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase size={11} className="text-accent" /> {job.experience} Exp</span>
                    <span className="flex items-center gap-1"><DollarSign size={11} className="text-accent" /> {job.salary}</span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">{job.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.skills.slice(0, 5).map((skill) => (
                      <span key={skill} className="px-2.5 py-1 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-md border border-slate-200">
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 5 && (
                      <span className="px-2.5 py-1 text-[10px] font-semibold bg-slate-100 text-slate-500 rounded-md border border-slate-200">
                        +{job.skills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3.5 border-t border-border/50 flex items-center gap-2.5">
                  <button onClick={() => handleOpenModal(job, "details")}
                    className="flex-1 text-xs font-semibold border border-border bg-muted/40 hover:bg-muted text-foreground py-2.5 px-3 rounded-xl transition-colors text-center">
                    View Details
                  </button>
                  <button onClick={() => handleOpenModal(job, "apply")}
                    className="flex-1 text-xs font-semibold bg-accent text-white hover:bg-primary py-2.5 px-3 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md">
                    Apply Now <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === Job Detail / Apply Modal === */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col custom-scrollbar my-auto"
              initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.25, ease: "easeOut" }}>

              {/* Modal Header */}
              <div className="p-5 md:p-6 border-b border-border flex items-start justify-between bg-muted/30 sticky top-0 bg-background/95 backdrop-blur z-10">
                <div>
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${deptColors[selectedJob.department] || "bg-accent/10 text-accent border-accent/20"}`}>
                    {selectedJob.department}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-primary mt-1.5">{selectedJob.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1"><MapPin size={11} className="text-accent" /> {selectedJob.location}</span>
                    <span className="flex items-center gap-1"><Clock size={11} className="text-accent" /> {selectedJob.type}</span>
                    <span className="flex items-center gap-1"><Briefcase size={11} className="text-accent" /> {selectedJob.experience}</span>
                    <span className="flex items-center gap-1"><DollarSign size={11} className="text-accent" /> {selectedJob.salary}</span>
                  </p>
                </div>
                <button onClick={() => setSelectedJob(null)} className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors flex-shrink-0" aria-label="Close dialog">
                  <X size={20} />
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="flex border-b border-border bg-muted/20 px-6">
                <button onClick={() => setModalTab("details")}
                  className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors ${modalTab === "details" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                  Job Description & Requirements
                </button>
                <button onClick={() => setModalTab("apply")}
                  className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${modalTab === "apply" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                  Application Form <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 flex-1">
                {modalTab === "details" ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-display font-bold text-primary text-base mb-2">About The Role</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedJob.description}</p>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-primary text-base mb-3">Key Responsibilities</h4>
                      <ul className="space-y-2.5">
                        {selectedJob.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90">
                            <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-primary text-base mb-3">Requirements & Skills</h4>
                      <ul className="space-y-2.5 mb-4">
                        {selectedJob.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90">
                            <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-primary text-xs uppercase tracking-wider mb-2">Required Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.skills.map((skill) => (
                          <span key={skill} className="px-3 py-1 text-xs font-semibold bg-accent/10 text-accent rounded-lg border border-accent/20">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-6 border-t border-border flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Ready to take the next step?</p>
                      <button onClick={() => setModalTab("apply")} className="bg-accent text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-primary transition-colors inline-flex items-center gap-2 shadow-md">
                        Apply For This Position <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {submitted ? (
                      <motion.div className="text-center py-10 space-y-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto">
                          <FileCheck size={40} />
                        </div>
                        <h4 className="font-display text-2xl font-bold text-primary">Application Submitted!</h4>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                          Thank you <span className="font-semibold text-primary">{formData.fullName}</span>! We received your application for <span className="font-semibold text-accent">{selectedJob.title}</span>. Our HR team will contact you at <span className="font-semibold text-primary">{formData.email}</span> within 24–48 hours.
                        </p>
                        <button onClick={() => setSelectedJob(null)} className="bg-primary text-white text-xs font-semibold px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-colors mt-4">
                          Close & Back to Careers
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmitApplication} className="space-y-5">
                        <div className="p-3.5 bg-accent/10 border border-accent/30 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Building2 size={18} className="text-accent" />
                            <div>
                              <p className="text-[11px] text-accent uppercase font-bold tracking-wider">Applied Position</p>
                              <p className="text-sm font-bold text-primary">{selectedJob.title}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-accent bg-background px-2.5 py-1 rounded-md border border-accent/30">{selectedJob.department}</span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          {[{ label: "Full Name *", key: "fullName", type: "text", placeholder: "e.g. Rahul Sharma" },
                            { label: "Email Address *", key: "email", type: "email", placeholder: "e.g. rahul@example.com" },
                            { label: "Phone Number *", key: "phone", type: "tel", placeholder: "+91 98765 43210" }].map(field => (
                            <div key={field.key}>
                              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">{field.label}</label>
                              <input type={field.type} required={field.label.includes("*")} placeholder={field.placeholder}
                                value={formData[field.key]} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                            </div>
                          ))}
                          <div>
                            <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">Total Experience *</label>
                            <select value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                              <option>1-2 Years</option>
                              <option>3-5 Years</option>
                              <option>5-8 Years</option>
                              <option>8+ Years</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">Expected Salary / CTC</label>
                            <input type="text" placeholder="e.g. ₹12 LPA or $2,000/mo" value={formData.expectedSalary}
                              onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">Portfolio / GitHub / LinkedIn URL</label>
                            <input type="url" placeholder="https://linkedin.com/in/username" value={formData.portfolioUrl}
                              onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">Upload Resume (PDF, DOC, DOCX) <span className="text-accent">*</span></label>
                          <div className="border-2 border-dashed border-border hover:border-accent rounded-xl p-5 text-center bg-muted/20 transition-colors relative cursor-pointer">
                            <input type="file" accept=".pdf,.doc,.docx" required onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            {resumeFile ? (
                              <div className="flex items-center justify-center gap-2 text-accent font-semibold text-sm">
                                <FileCheck size={20} /><span>{resumeFile.name}</span>
                                <span className="text-xs text-muted-foreground">({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <Upload size={24} className="text-accent mx-auto" />
                                <p className="text-xs font-semibold text-primary">Drag & drop or <span className="text-accent hover:underline">browse file</span></p>
                                <p className="text-[11px] text-muted-foreground">PDF, DOC, DOCX — max 10MB</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">Cover Letter / Additional Note</label>
                          <textarea rows={3} placeholder="Tell us briefly why you're a great fit for this role..."
                            value={formData.coverLetter} onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>

                        <button type="submit" disabled={isSubmitting}
                          className="w-full bg-accent text-white font-bold py-3.5 rounded-xl hover:bg-primary transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg shadow-accent/25 disabled:opacity-60">
                          {isSubmitting ? <span>Submitting Application...</span> : <><Send size={18} /> Submit Application For {selectedJob.title}</>}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Career;
