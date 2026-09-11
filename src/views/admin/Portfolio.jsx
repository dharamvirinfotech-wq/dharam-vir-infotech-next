import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, ExternalLink, Loader2, Globe, Sparkles, FolderKanban } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { caseStudiesApi } from "@/lib/api";

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
  architecture_details: "",
  results: "",
  key_highlights: "",
  faqs: "",
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
    setFormData(emptyForm);
    setDialogOpen(true);
  };

  const handleEdit = (p) => {
    setEditing(p);
    setFormData({
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle || "",
      client_name: p.client_name || "",
      industry: p.industry || "Web Engineering",
      duration: p.duration || "",
      team_size: p.team_size || "",
      technologies: (p.technologies || []).join(", "),
      services: (p.services || []).join(", "),
      challenge: p.challenge || "",
      solution: p.solution || "",
      architecture_details: p.architecture_details || "",
      results: p.results || "",
      key_highlights: Array.isArray(p.key_highlights) ? p.key_highlights.join("\n") : "",
      faqs: Array.isArray(p.faqs)
        ? p.faqs.map((f) => `${f.question} | ${f.answer}`).join("\n")
        : "",
      live_url: p.live_url || "",
      cover_image: p.cover_image || "",
      metrics: Array.isArray(p.metrics)
        ? p.metrics.map((m) => `${m.label}: ${m.value}`).join(", ")
        : "",
      tags: (p.tags || []).join(", "),
      status: p.status || "published",
      featured: !!p.featured,
    });
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

    const faqsArray = formData.faqs
      ? formData.faqs
        .split("\n")
        .map((line) => {
          const parts = line.split("|");
          if (parts.length >= 2) {
            return { question: parts[0].trim(), answer: parts.slice(1).join("|").trim() };
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
      architecture_details: formData.architecture_details,
      results: formData.results,
      key_highlights: highlightsArray,
      faqs: faqsArray,
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
        toast({ title: "Updated", description: "Portfolio project updated successfully." });
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
    <AdminLayout title="Portfolio & Work Management bg-background">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <FolderKanban className="text-accent" size={24} />
              Portfolio & Featured Projects
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage client projects, live URLs (e.g. windowsutils.com, fairsearches.com), tech stacks, and case studies.
            </p>
          </div>
          <Button onClick={handleCreate} className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">
            <Plus size={16} className="mr-2" /> Add New Project
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-border bg-card">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search projects, client, tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue placeholder="Industry Filter" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind === "all" ? "All Industries" : ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Project Grid */}
        {loading ? (
          <div className="py-24 flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="animate-spin text-accent" size={24} />
            <span>Loading projects...</span>
          </div>
        ) : filtered.length === 0 ? (
          <Card className="border-dashed border-border bg-card/50 p-12 text-center">
            <FolderKanban className="mx-auto text-muted-foreground mb-3" size={40} />
            <h3 className="font-bold text-foreground mb-1">No Projects Found</h3>
            <p className="text-sm text-muted-foreground mb-4">Add your first project to showcase on the portfolio page.</p>
            <Button onClick={handleCreate} variant="outline">
              <Plus size={16} className="mr-2" /> Add Project
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <Card
                key={p.id}
                className="border-border bg-card overflow-hidden hover:border-accent/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                      {p.industry || "General"}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {p.featured && (
                        <span className="text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles size={11} /> Featured
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.status === "published"
                            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                            : "bg-muted text-muted-foreground border border-border"
                          }`}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {p.subtitle || p.challenge || "No description provided."}
                  </p>

                  {p.live_url && (
                    <a
                      href={p.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-accent font-semibold hover:underline mb-4"
                    >
                      <Globe size={13} /> {p.live_url.replace("https://", "").replace("http://", "")}
                      <ExternalLink size={11} />
                    </a>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(p.technologies || []).slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="text-[10px] bg-muted/60 text-muted-foreground px-2 py-0.5 rounded border border-border">
                        {tech}
                      </span>
                    ))}
                    {(p.technologies || []).length > 4 && (
                      <span className="text-[10px] text-muted-foreground px-1 py-0.5">
                        +{p.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="px-6 py-3 border-t border-border/80 bg-muted/20 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{p.client_name || "Confidential"}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(p)} className="h-8 px-2 text-xs">
                      <Edit size={14} className="mr-1" /> Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(p.id, p.title)}
                      className="h-8 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Create / Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Portfolio Project" : "Add Portfolio Project"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Project Title *</Label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="WindowsUtils.com - Desktop Utility Suite"
                  />
                </div>
                <div>
                  <Label>URL Slug (Unique) *</Label>
                  <Input
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="windowsutils"
                  />
                </div>
              </div>

              <div>
                <Label>Tagline / Subtitle</Label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Engineered high-speed desktop & cloud email conversion suite"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label>Client Name</Label>
                  <Input
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="e.g. WindowsUtils Inc."
                  />
                </div>
                <div>
                  <Label>Industry / Category</Label>
                  <Input
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g. Software & Tools, CleanTech"
                  />
                </div>
                <div>
                  <Label>Live Website URL</Label>
                  <Input
                    value={formData.live_url}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                    placeholder="https://windowsutils.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Technologies (comma separated)</Label>
                  <Input
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="Next.js, Node.js, PostgreSQL, AWS"
                  />
                </div>
                <div>
                  <Label>Key Metrics (Format: Label: Value, Label: Value)</Label>
                  <Input
                    value={formData.metrics}
                    onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                    placeholder="Active Users: 1M+, Data Loss: 0%, Rating: 4.9"
                  />
                </div>
              </div>

              <div>
                <Label>The Challenge / Problem</Label>
                <Textarea
                  rows={2}
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  placeholder="What problem did the client face?"
                />
              </div>

              <div>
                <Label>Our Solution</Label>
                <Textarea
                  rows={2}
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="How did our engineering team solve it?"
                />
              </div>

              <div>
                <Label>Technical Architecture Details</Label>
                <Textarea
                  rows={3}
                  value={formData.architecture_details}
                  onChange={(e) => setFormData({ ...formData, architecture_details: e.target.value })}
                  placeholder="Key engineering highlights, streaming algorithms, caching layers, database schemas..."
                />
              </div>

              <div>
                <Label>Key Highlights (One per line)</Label>
                <Textarea
                  rows={2}
                  value={formData.key_highlights}
                  onChange={(e) => setFormData({ ...formData, key_highlights: e.target.value })}
                  placeholder="100% Offline Processing&#10;Court-admissible Bates headers&#10;Sub-80ms search latency"
                />
              </div>

              <div>
                <Label>Project FAQs (Format: Question? | Answer (one per line))</Label>
                <Textarea
                  rows={3}
                  value={formData.faqs}
                  onChange={(e) => setFormData({ ...formData, faqs: e.target.value })}
                  placeholder="Is internet required? | No, all operations execute locally on the device.&#10;Does it support batch conversion? | Yes, up to gigabytes of data can be batch converted."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(val) => setFormData({ ...formData, status: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published (Live on Website)</SelectItem>
                      <SelectItem value="draft">Draft (Hidden)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <Label htmlFor="featured-check" className="cursor-pointer font-medium">
                    Feature on Home & Top of Portfolio
                  </Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  {saving ? "Saving..." : editing ? "Update Project" : "Create Project"}
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
