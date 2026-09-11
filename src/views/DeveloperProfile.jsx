import { useParams, useSearchParams, Link } from "@/lib/router-compat";
import { useEffect, useState } from "react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import { Star, MapPin, Briefcase, Award, Send, Loader2, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { contactApi, developersApi } from "@/lib/api";

const DeveloperProfile = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const roleOverride = searchParams.get("role");
  const [dev, setDev] = useState(null);
  const [loadingDev, setLoadingDev] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoadingDev(true);
    setNotFound(false);
    developersApi
      .get(slug)
      .then((r) => setDev(r.developer))
      .catch(() => setNotFound(true))
      .finally(() => setLoadingDev(false));
  }, [slug]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loadingDev) {
    return (
      <div className="min-h-screen bg-background">
        <AnimatedNavbar />
        <div className="container mx-auto px-4 py-32 flex items-center justify-center">
          <Loader2 className="animate-spin text-accent" size={32} />
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !dev) {
    return (
      <div className="min-h-screen bg-background">
        <AnimatedNavbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Developer Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The developer profile you are looking for does not exist or has been removed.
          </p>
          <Link to="/developer" className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
            View All Developers <ArrowRight size={16} />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const devWithRole = { ...dev, role: roleOverride || dev.role };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await contactApi.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        service: `Developer Inquiry (${devWithRole.name} - ${devWithRole.role})`,
        subject: `Project Inquiry regarding ${devWithRole.name}`,
        message: formData.message,
      });

      toast.success("Inquiry submitted successfully!", {
        description: `Thank you for reaching out! Our team will connect with you within 24 hours regarding ${devWithRole.name}.`,
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to submit inquiry";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatedNavbar />
      <PageBanner
        title={devWithRole.name}
        subtitle={`${devWithRole.role} · ${devWithRole.experience} Experience`}
        breadcrumb={`Team / ${devWithRole.role} / ${devWithRole.name}`}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Profile Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header card */}
              <div className="bg-card border border-border rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={devWithRole.image}
                  alt={devWithRole.name}
                  className="w-32 h-32 rounded-2xl object-cover border-2 border-accent/30 shadow-lg"
                />
                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-primary">{devWithRole.name}</h2>
                    {devWithRole.rating && (
                      <span className="inline-flex items-center gap-1 text-sm bg-accent/10 text-accent px-2.5 py-1 rounded-full font-medium">
                        <Star size={14} className="fill-accent" /> {devWithRole.rating}
                      </span>
                    )}
                  </div>
                  <p className="text-accent font-medium mb-3">{devWithRole.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{devWithRole.bio}</p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} /> {devWithRole.experience} Experience
                    </span>
                    <span className="flex items-center gap-1">
                      <Award size={14} /> {devWithRole.projectsCompleted} Projects Completed
                    </span>
                    {devWithRole.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {devWithRole.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h3 className="text-lg font-bold text-primary mb-4">Technical Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(devWithRole.skills) ? (
                    devWithRole.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-primary/5 text-primary border border-border text-sm px-3.5 py-1.5 rounded-lg font-medium hover:border-accent/40 transition-colors"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">Skills not specified</span>
                  )}
                </div>
              </div>

              {/* Overview Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-2">Primary Domain</h3>
                  <p className="text-sm text-muted-foreground">{devWithRole.role}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-2">Experience</h3>
                  <p className="text-sm text-muted-foreground">{devWithRole.experience} in software engineering</p>
                </div>
              </div>
            </div>

            {/* Right: Contact / Inquiry Form */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="text-accent" size={20} />
                  <h3 className="text-xl font-bold text-primary">Contact Our Team</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-6">
                  Interested in collaborating with {devWithRole.name.split(" ")[0]} or our engineering team? Send us an inquiry.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Project Requirements / Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      placeholder={`Tell us about your project requirements or work for ${devWithRole.name}...`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 shadow-md"
                  >
                    <Send size={16} />
                    {isSubmitting ? "Sending Inquiry..." : "Submit Inquiry"}
                  </button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  We treat all inquiries with confidentiality. We'll reply within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DeveloperProfile;
