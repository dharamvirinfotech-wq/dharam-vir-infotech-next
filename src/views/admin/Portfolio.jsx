import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Loader2,
  Globe,
  FolderKanban,
  Star,
  MoreVertical,
  HelpCircle,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { caseStudiesApi } from "@/lib/api";
import ProjectImageUploader from "@/components/admin/ProjectImageUploader";
import ProjectFaqBuilder from "@/components/admin/ProjectFaqBuilder";
import ProjectEditorialFields from "@/components/admin/ProjectEditorialFields";
import { getFallbackProjectBySlug } from "@/utils/portfolioData";

const emptyForm = {
  slug: "",
  title: "",
  subtitle: "",
  client_name: "",
  industry: "Web Engineering",
  duration: "4 months",
  team_size: "5 Engineers",
  technologies: "",
  services: "",
  challenge: "",
  solution: "",
  approach: "",
  overview: "",
  key_features: "",
  roi_metrics: "",
  what_they_gained: "",
  architecture_details: "",
  results: "",
  key_highlights: "",
  faqsList: [],
  live_url: "",
  cover_image: "",
  metrics: "",
  tags: "",
  status: "published",
  featured: false,
};

const toList = (s) => (s ? s.split(",").map((x) => x.trim()).filter(Boolean) : []);

const AdminPortfolio = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("all");
  const [formData, setFormData] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Collapsible sections state
  const [editorialCollapsed, setEditorialCollapsed] = useState(false);
  const [faqCollapsed, setFaqCollapsed] = useState(false);

  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const res = await caseStudiesApi.adminList();
      setItems(res.case_studies || []);
    } catch (e) {
      toast({
        title: "Failed to load portfolio projects",
        description: e instanceof Error ? e.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = items.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      p.title.toLowerCase().includes(q) ||
      (p.client_name || "").toLowerCase().includes(q) ||
      (p.industry || "").toLowerCase().includes(q) ||
      (p.technologies || []).join(" ").toLowerCase().includes(q);
    const matchIndustry = filterIndustry === "all" || p.industry === filterIndustry;
    return matchSearch && matchIndustry;
  });

  const handleCreate = () => {
    setEditing(null);
    setFormData({
      ...emptyForm,
      faqsList: [{ question: "", answer: "" }],
    });
    setEditorialCollapsed(false);
    setFaqCollapsed(false);
    setDialogOpen(true);
  };

  const handleEdit = (p) => {
    setEditing(p);

    // Merge with fallback data if database row doesn't have editorial fields yet
    const fallback = getFallbackProjectBySlug(p.slug) || {};

    let parsedFaqs = [];
    if (Array.isArray(p.faqs) && p.faqs.length > 0) {
      parsedFaqs = p.faqs.map((f) => ({ question: f.question || "", answer: f.answer || "" }));
    } else if (Array.isArray(fallback.faqs) && fallback.faqs.length > 0) {
      parsedFaqs = fallback.faqs.map((f) => ({ question: f.question || "", answer: f.answer || "" }));
    }

    if (parsedFaqs.length === 0) {
      parsedFaqs = [{ question: "", answer: "" }];
    }

    const keyFeaturesVal = Array.isArray(p.key_features) && p.key_features.length > 0
      ? p.key_features.join("\n")
      : Array.isArray(fallback.key_features)
      ? fallback.key_features.join("\n")
      : (p.key_features || "");

    const roiVal = Array.isArray(p.roi_metrics) && p.roi_metrics.length > 0
      ? p.roi_metrics.join("\n")
      : Array.isArray(fallback.roi_metrics)
      ? fallback.roi_metrics.join("\n")
      : (p.roi_metrics || "");

    const gainedVal = Array.isArray(p.what_they_gained) && p.what_they_gained.length > 0
      ? p.what_they_gained.join("\n")
      : Array.isArray(fallback.what_they_gained)
      ? fallback.what_they_gained.join("\n")
      : (p.what_they_gained || "");

    setFormData({
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle || fallback.subtitle || "",
      client_name: p.client_name || fallback.client_name || "",
      industry: p.industry || fallback.industry || "Web Engineering",
      duration: p.duration || fallback.duration || "",
      team_size: p.team_size || fallback.team_size || "",
      technologies: (p.technologies || fallback.technologies || []).join(", "),
      services: (p.services || fallback.services || []).join(", "),
      challenge: p.challenge || fallback.challenge || "",
      solution: p.solution || fallback.solution || "",
      approach: p.approach || fallback.approach || "",
      overview: p.overview || fallback.overview || "",
      key_features: keyFeaturesVal,
      roi_metrics: roiVal,
      what_they_gained: gainedVal,
      architecture_details: p.architecture_details || fallback.architecture_details || "",
      results: p.results || fallback.results || "",
      key_highlights: Array.isArray(p.key_highlights) && p.key_highlights.length > 0
        ? p.key_highlights.join("\n")
        : Array.isArray(fallback.key_highlights)
        ? fallback.key_highlights.join("\n")
        : "",
      faqsList: parsedFaqs,
      live_url: p.live_url || fallback.live_url || "",
      cover_image: p.cover_image || fallback.cover_image || "",
      metrics: Array.isArray(p.metrics)
        ? p.metrics.map((m) => `${m.label}: ${m.value}`).join(", ")
        : "",
      tags: (p.tags || []).join(", "),
      status: p.status || "published",
      featured: !!p.featured,
    });

    setEditorialCollapsed(false);
    setFaqCollapsed(false);
    setDialogOpen(true);
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await caseStudiesApi.remove(id);
      toast({ title: "Deleted", description: "Portfolio project removed successfully." });
      void load();
    } catch (e) {
      toast({
        title: "Delete failed",
        description: e instanceof Error ? e.message : "Error deleting project.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const metricsArray = formData.metrics
      ? formData.metrics
          .split(",")
          .map((item) => {
            const parts = item.split(":");
            if (parts.length >= 2) {
              return { label: parts[0].trim(), value: parts.slice(1).join(":").trim() };
            }
            return null;
          })
          .filter(Boolean)
      : [];

    const highlightsArray = formData.key_highlights
      ? formData.key_highlights
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const featuresArray = formData.key_features
      ? formData.key_features
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const roiArray = formData.roi_metrics
      ? formData.roi_metrics
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const gainedArray = formData.what_they_gained
      ? formData.what_they_gained
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    // Filter valid FAQs
    const validFaqs = (formData.faqsList || [])
      .filter((f) => f.question && f.question.trim().length > 0)
      .map((f) => ({ question: f.question.trim(), answer: (f.answer || "").trim() }));

    const payload = {
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: formData.title,
      subtitle: formData.subtitle,
      client_name: formData.client_name,
      industry: formData.industry,
      duration: formData.duration,
      team_size: formData.team_size,
      technologies: toList(formData.technologies),
      services: toList(formData.services),
      challenge: formData.challenge,
      solution: formData.solution,
      approach: formData.approach,
      overview: formData.overview,
      key_features: featuresArray,
      roi_metrics: roiArray,
      what_they_gained: gainedArray,
      architecture_details: formData.architecture_details,
      results: formData.results,
      key_highlights: highlightsArray,
      faqs: validFaqs,
      live_url: formData.live_url,
      cover_image: formData.cover_image,
      metrics: metricsArray,
      tags: toList(formData.tags),
      status: formData.status,
      featured: formData.featured,
    };

    try {
      if (editing) {
        await caseStudiesApi.update(editing.id, payload);
        toast({ title: "Updated", description: "Portfolio project & case study details updated." });
      } else {
        await caseStudiesApi.create(payload);
        toast({ title: "Created", description: "New portfolio project created successfully." });
      }
      setDialogOpen(false);
      void load();
    } catch (err) {
      toast({
        title: "Save failed",
        description: err instanceof Error ? err.message : "Error saving project.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const industries = ["all", ...new Set(items.map((i) => i.industry).filter(Boolean))];

  return (
    <AdminLayout
      title="Portfolio & Case Studies"
      subtitle="Manage projects, live URLs, FAQs, and full technical editorial content"
      icon={FolderKanban}
    >
      <div className="space-y-6">
        {/* Top Header Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Projects", value: items.length, color: "text-slate-900 dark:text-white" },
            { label: "Published Live", value: items.filter((c) => c.status === "published").length, color: "text-emerald-600" },
            { label: "Draft Hidden", value: items.filter((c) => c.status === "draft").length, color: "text-amber-500" },
            { label: "Featured Projects", value: items.filter((c) => c.featured).length, color: "text-blue-600" },
          ].map((s) => (
            <Card key={s.label} className="border-border bg-white dark:bg-slate-900 shadow-xs">
              <CardContent className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className={`text-2xl font-black mt-1 ${s.color}`}>{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Toolbar & Filters */}
        <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
                <Input
                  placeholder="Search projects, client, tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-xs bg-background"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                  <SelectTrigger className="w-full sm:w-[180px] text-xs bg-background">
                    <SelectValue placeholder="Industry Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((ind) => (
                      <SelectItem key={ind} value={ind} className="text-xs">
                        {ind === "all" ? "All Industries" : ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleCreate} className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 text-xs font-bold gap-2">
              <Plus size={16} /> Add New Project
            </Button>
          </CardContent>
        </Card>

        {/* Table View (Clean & Compact) */}
        <Card className="border-border bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
          <CardContent className="p-0">
            {loading ? (
              <div className="py-20 text-center flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="animate-spin text-accent" size={20} /> Loading projects...
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                <FolderKanban className="mx-auto mb-2 text-slate-300" size={36} />
                <p className="font-semibold">No portfolio projects found</p>
                <p className="text-xs mt-1">Try clearing filters or click "Add New Project".</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-border bg-slate-50/80 dark:bg-slate-800/40 text-[11px] uppercase tracking-wider text-muted-foreground font-bold">
                      <th className="py-3 px-4">Project & Slug</th>
                      <th className="py-3 px-4">Client / Industry</th>
                      <th className="py-3 px-4">Live URL</th>
                      <th className="py-3 px-4">Tech Stack</th>
                      <th className="py-3 px-4 text-center">FAQs</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-center">Featured</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-xs">
                    {filtered.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-3.5 px-4 max-w-[220px]">
                          <p className="font-bold text-slate-900 dark:text-white truncate">{p.title}</p>
                          <p className="text-[10px] text-muted-foreground font-mono truncate">{p.slug}</p>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                          <p className="font-medium text-slate-900 dark:text-white">{p.client_name || "—"}</p>
                          <span className="inline-block mt-0.5 text-[10px] bg-accent/10 text-accent font-semibold px-2 py-0.5 rounded-full">
                            {p.industry || "General"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {p.live_url ? (
                            <a
                              href={p.live_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-accent hover:underline flex items-center gap-1 font-mono text-[11px]"
                            >
                              <Globe size={12} /> {p.live_url.replace("https://", "").replace("http://", "").replace(/\/$/, "")}
                            </a>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {(p.technologies || []).slice(0, 3).map((t, idx) => (
                              <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded font-mono">
                                {t}
                              </span>
                            ))}
                            {(p.technologies || []).length > 3 && (
                              <span className="text-[10px] text-muted-foreground">+{p.technologies.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-mono">
                            <HelpCircle size={12} className="text-accent" />
                            {Array.isArray(p.faqs) ? p.faqs.length : 0}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              p.status === "published"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {p.featured ? (
                            <Star size={15} className="text-amber-500 fill-amber-500 mx-auto" />
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="text-xs">
                              {p.status === "published" && (
                                <DropdownMenuItem asChild>
                                  <a
                                    href={`/portfolio/${p.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 cursor-pointer"
                                  >
                                    <ExternalLink size={14} /> View Case Study
                                  </a>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleEdit(p)} className="gap-2 cursor-pointer">
                                <Edit size={14} /> Edit Project & Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(p.id, p.title)}
                                className="gap-2 text-destructive cursor-pointer"
                              >
                                <Trash2 size={14} /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ─── ADD / EDIT DIALOG (Clean Modular Components) ─── */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <FolderKanban className="text-accent" size={20} />
                {editing ? `Edit Project: ${editing.title}` : "Add New Case Study Project"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 pt-2">
              {/* Section 1: Basic Information */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-border space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent font-mono">1. Basic Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold">Project Title *</Label>
                    <Input
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. WindowsUtils - Desktop Suite"
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">URL Slug (e.g. windowsutils)</Label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="auto-generated-from-title"
                      className="text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold">Subtitle / Hero Tagline</Label>
                  <Input
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Short high-impact subtitle describing transformation or scale"
                    className="text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs font-semibold">Client Name</Label>
                    <Input
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      placeholder="e.g. WindowsUtils Inc."
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Industry / Category</Label>
                    <Input
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      placeholder="e.g. Software & Tools, Marketplace"
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Live URL</Label>
                    <Input
                      value={formData.live_url}
                      onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                      placeholder="https://windowsutils.com"
                      className="text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold">Project Duration</Label>
                    <Input
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g. 6 months"
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Team Size</Label>
                    <Input
                      value={formData.team_size}
                      onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
                      placeholder="e.g. 6 Engineers"
                      className="text-xs"
                    />
                  </div>
                </div>

                {/* Cover Image Uploader Component */}
                <ProjectImageUploader
                  value={formData.cover_image}
                  onChange={(val) => setFormData({ ...formData, cover_image: val })}
                />
              </div>

              {/* Section 2: Tech Stack & Benchmarks */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-border space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent font-mono">2. Tech Stack & Benchmarks</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold">Technologies (Comma separated)</Label>
                    <Input
                      value={formData.technologies}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      placeholder="React, Next.js, Node.js, C++, AWS, Docker, PostgreSQL"
                      className="text-xs font-mono"
                    />
                    <span className="text-[10px] text-muted-foreground mt-1 block">
                      * Real official brand icons will automatically display on the Details page!
                    </span>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Key Metrics (Label: Value, Label: Value)</Label>
                    <Input
                      value={formData.metrics}
                      onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                      placeholder="Active Users: 1M+, Latency: <80ms, Data Loss: 0%"
                      className="text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Modular Collapsible Editorial Content (Approach, Overview, Key Features, ROI, Gained) */}
              <ProjectEditorialFields
                formData={formData}
                onChange={setFormData}
                isCollapsed={editorialCollapsed}
                onToggleCollapse={() => setEditorialCollapsed((c) => !c)}
              />

              {/* Section 4: Modular Collapsible FAQ Builder */}
              <ProjectFaqBuilder
                faqs={formData.faqsList || []}
                onChange={(list) => setFormData({ ...formData, faqsList: list })}
                isCollapsed={faqCollapsed}
                onToggleCollapse={() => setFaqCollapsed((c) => !c)}
              />

              {/* Status & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <Label className="text-xs font-semibold">Publishing Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(val) => setFormData({ ...formData, status: val })}
                  >
                    <SelectTrigger className="text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="text-xs">
                      <SelectItem value="published">Published (Live on Website)</SelectItem>
                      <SelectItem value="draft">Draft (Hidden)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <Label htmlFor="featured-check" className="cursor-pointer font-medium text-xs">
                    Feature on Home & Top of Portfolio Showcase
                  </Label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="text-xs">
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs font-bold">
                  {saving ? "Saving..." : editing ? "Update Project & Details" : "Create Project"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminPortfolio;

