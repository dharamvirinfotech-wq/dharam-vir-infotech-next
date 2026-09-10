import { useParams, useSearchParams, Link } from "@/lib/router-compat";
import { useEffect, useState } from "react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import { Star, MapPin, Briefcase, DollarSign, CheckCircle, Clock, Award, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { hireApi, developersApi } from "@/lib/api";
const DeveloperProfile = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const roleOverride = searchParams.get("role");
  const [dev, setDev] = useState(null);
  const [loadingDev, setLoadingDev] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    if (!slug)
      return;
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
    company: "",
    projectDescription: "",
    budget: "",
    timeline: "",
    engagementType: "full-time",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [geo, setGeo] = useState(null);
  const [geoStatus, setGeoStatus] = useState("idle");
  // Request live location on mount (non-blocking)
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoStatus("unsupported");
      return;
    }
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      let address = null;
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14`, { headers: { Accept: "application/json" } });
        if (r.ok) {
          const j = await r.json();
          address = j?.display_name || null;
        }
      }
      catch { /* ignore reverse-geocode errors */ }
      setGeo({ latitude, longitude, accuracy, address });
      setGeoStatus("ready");
    }, () => setGeoStatus("denied"), { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
  }, []);
  if (loadingDev) {
    return (<div className="min-h-screen bg-background">
      <AnimatedNavbar />
      <div className="container mx-auto px-4 py-32 flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
      <Footer />
    </div>);
  }
  if (notFound || !dev) {
    return (<div className="min-h-screen bg-background">
      <AnimatedNavbar />
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Developer Not Found</h1>
        <p className="text-muted-foreground mb-8">The developer profile you're looking for doesn't exist.</p>
        <Link to="/hire-developer" className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold">
          Browse Developers
        </Link>
      </div>
      <Footer />
    </div>);
  }
  const devWithRole = { ...dev, role: roleOverride || dev.role };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await hireApi.submit({
        developer_slug: slug || "",
        developer_name: devWithRole.name,
        developer_role: devWithRole.role,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        engagement_type: formData.engagementType,
        budget: formData.budget || undefined,
        timeline: formData.timeline || undefined,
        project_description: formData.projectDescription,
        latitude: geo?.latitude ?? null,
        longitude: geo?.longitude ?? null,
        location_accuracy: geo?.accuracy ?? null,
        location_address: geo?.address ?? null,
      });
      toast.success("Hire request submitted successfully!", {
        description: res.user_created
          ? `Account created for ${formData.email}. We'll reach out within 24 hours.`
          : `We'll get back to you within 24 hours about hiring ${devWithRole.name}.`,
      });
      setFormData({ name: "", email: "", phone: "", company: "", projectDescription: "", budget: "", timeline: "", engagementType: "full-time" });
    }
    catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to submit hire request";
      toast.error(msg);
    }
    finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="min-h-screen bg-backgrounds bg-gradient-to-br from-[#f6f9fc] via-[#edf2f8] to-[#f8fafc] ">
      <AnimatedNavbar />
      <PageBanner title={devWithRole.name} subtitle={`${devWithRole.role} · ${devWithRole.experience} Experience`} breadcrumb={`Hire Developer / ${devWithRole.role} / ${devWithRole.name}`} />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {/* Left: Profile Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Header Card */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="w-24 h-24 rounded-full bg-accent/10 border-3 border-accent flex items-center justify-center text-3xl font-bold text-accent flex-shrink-0">
                    {devWithRole.avatar}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-primary mb-1">{devWithRole.name}</h2>
                    <p className="text-accent font-semibold mb-3">{devWithRole.role}</p>
                    <p className="text-muted-foreground leading-relaxed">{devWithRole.bio}</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <Briefcase className="text-accent mx-auto mb-2" size={22} />
                  <p className="text-lg font-bold text-primary">{devWithRole.experience}</p>
                  <p className="text-xs text-muted-foreground">Experience</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <Star className="text-accent mx-auto mb-2 fill-accent" size={22} />
                  <p className="text-lg font-bold text-primary">{devWithRole.rating}/5</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <CheckCircle className="text-accent mx-auto mb-2" size={22} />
                  <p className="text-lg font-bold text-primary">{devWithRole.projectsCompleted}+</p>
                  <p className="text-xs text-muted-foreground">Projects</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <DollarSign className="text-accent mx-auto mb-2" size={22} />
                  <p className="text-lg font-bold text-primary">{devWithRole.hourlyRate}</p>
                  <p className="text-xs text-muted-foreground">Per Hour</p>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                    <MapPin size={18} className="text-accent" /> Location & Languages
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{devWithRole.location}</p>
                  <div className="flex flex-wrap gap-2">
                    {devWithRole.languages.map((lang) => (<span key={lang} className="text-xs bg-muted px-2.5 py-1 rounded-full text-foreground">{lang}</span>))}
                  </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-accent" /> Availability
                  </h3>
                  <p className="text-muted-foreground text-sm mb-2">{devWithRole.availability}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-green-500/10 text-green-600 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Available Now
                  </span>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <Award size={18} className="text-accent" /> Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {devWithRole.skills.map((skill) => (<span key={skill} className="bg-accent/10 text-accent px-3 py-1.5 rounded-full text-sm font-medium">{skill}</span>))}
                </div>
              </div>

              {/* Certifications & Education */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-4">Certifications</h3>
                  <ul className="space-y-2">
                    {devWithRole.certifications.map((cert) => (<li key={cert} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      {cert}
                    </li>))}
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-4">Education</h3>
                  <p className="text-sm text-muted-foreground">{devWithRole.education}</p>
                </div>
              </div>
            </div>

            {/* Right: Hire Form */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-primary mb-2">Hire {devWithRole.name.split(" ")[0]}</h3>
                <p className="text-muted-foreground text-sm mb-6">Fill in your project details and we'll connect you within 24 hours.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" placeholder="john@company.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Company</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Your Company" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Engagement Type *</label>
                    <select name="engagementType" value={formData.engagementType} onChange={handleChange} required className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="project-based">Project Based</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Budget Range</label>
                    <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                      <option value="">Select budget</option>
                      <option value="1k-5k">$1,000 - $5,000</option>
                      <option value="5k-15k">$5,000 - $15,000</option>
                      <option value="15k-50k">$15,000 - $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Timeline</label>
                    <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                      <option value="">Select timeline</option>
                      <option value="immediately">Start Immediately</option>
                      <option value="1-2weeks">1-2 Weeks</option>
                      <option value="1month">Within 1 Month</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Project Description *</label>
                    <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} required rows={4} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none" placeholder="Describe your project requirements..." />
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 border border-border rounded-lg px-3 py-2">
                    <MapPin size={14} className="mt-0.5 shrink-0" />
                    <span>
                      {geoStatus === "loading" && "Detecting your location…"}
                      {geoStatus === "ready" && geo && (<>Location attached: {geo.address ? geo.address : `${geo.latitude.toFixed(4)}, ${geo.longitude.toFixed(4)}`}</>)}
                      {geoStatus === "denied" && "Location permission denied — request will be submitted without location."}
                      {geoStatus === "unsupported" && "Geolocation unsupported by this browser."}
                      {geoStatus === "idle" && "Live location will be attached to your request."}
                    </span>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                    <Send size={16} />
                    {isSubmitting ? "Submitting..." : `Hire ${devWithRole.name.split(" ")[0]} Now`}
                  </button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-4">No commitment required. We'll respond within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>);
};
export default DeveloperProfile;
