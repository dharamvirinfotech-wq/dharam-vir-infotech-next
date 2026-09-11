import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, MoreVertical, Loader2, Star, ExternalLink, Search, Globe, FileText } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { caseStudiesApi } from "@/lib/api";

const emptyForm = {
  slug: "", title: "", subtitle: "", client_name: "", industry: "",
  duration: "", team_size: "", technologies: "", services: "",
  challenge: "", solution: "", results: "", cover_image: "",
  tags: "", status: "draft", featured: false,
};

const toList = (s) => s ? s.split(",").map((x) => x.trim()).filter(Boolean) : [];
const fromList = (a) => Array.isArray(a) ? a.join(", ") : "";

const INDUSTRIES = ["FinTech", "E-Commerce", "Healthcare", "EdTech", "Real Estate", "Logistics", "SaaS", "Retail", "Education", "Other"];

const AdminCaseStudies = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
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
      toast({ title: "Failed to load", description: e?.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const filtered = items.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = c.title.toLowerCase().includes(q) || (c.client_name || "").toLowerCase().includes(q) || (c.industry || "").toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleCreate = () => {
    setEditing(null);
    setFormData(emptyForm);
    setDialogOpen(true);
  };

  const handleEdit = (c) => {
    setEditing(c);
    setFormData({
      slug: c.slug, title: c.title, subtitle: c.subtitle || "",
      client_name: c.client_name || "", industry: c.industry || "",
      duration: c.duration || "", team_size: c.team_size || "",
      technologies: fromList(c.technologies), services: fromList(c.services),
      challenge: c.challenge || "", solution: c.solution || "", results: c.results || "",
      cover_image: c.cover_image || "", tags: fromList(c.tags),
      status: c.status || "draft", featured: !!c.featured,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this case study?")) return;
    try {
      await caseStudiesApi.remove(id);
      setItems((prev) => prev.filter((c) => c.id !== id));
      toast({ title: "Deleted successfully" });
    } catch (e) {
      toast({ title: "Delete failed", description: e?.message, variant: "destructive" });
    }
  };

  const handleSubmit = async () => {
    if (!formData.slug || !formData.title) {
      toast({ title: "Missing fields", description: "Slug and title are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      ...formData,
      technologies: toList(formData.technologies),
      services: toList(formData.services),
      tags: toList(formData.tags),
      featured: formData.featured,
    };
    try {
      if (editing) {
        const res = await caseStudiesApi.update(editing.id, payload);
        setItems((prev) => prev.map((c) => c.id === editing.id ? res.case_study : c));
        toast({ title: "Updated successfully" });
      } else {
        const res = await caseStudiesApi.create(payload);
        setItems((prev) => [res.case_study, ...prev]);
        toast({ title: "Created successfully" });
      }
      setDialogOpen(false);
    } catch (e) {
      toast({ title: "Save failed", description: e?.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const field = (key, label, type = "text", placeholder = "") => (
    <div>
      <Label className="text-xs font-semibold text-slate-700 mb-1 block">{label}</Label>
      {type === "textarea" ? (
        <Textarea
          rows={3}
          placeholder={placeholder}
          value={formData[key]}
          onChange={(e) => setFormData((p) => ({ ...p, [key]: e.target.value }))}
          className="text-xs"
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          value={formData[key]}
          onChange={(e) => setFormData((p) => ({ ...p, [key]: e.target.value }))}
          className="text-xs"
        />
      )}
    </div>
  );

  return (
    <AdminLayout title="Case Studies" subtitle="Manage client success stories shown on the public portfolio page" icon={Star}>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        {[
          { label: "Total", value: items.length, color: "text-slate-900 dark:text-white" },
          { label: "Published", value: items.filter((c) => c.status === "published").length, color: "text-emerald-600" },
          { label: "Draft", value: items.filter((c) => c.status === "draft").length, color: "text-amber-500" },
          { label: "Featured", value: items.filter((c) => c.featured).length, color: "text-blue-600" },
        ].map((s) => (
          <Card key={s.label} className="border-border bg-white dark:bg-slate-900 shadow-xs">
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-black mt-1 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex gap-3 flex-1 w-full sm:w-auto">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
              <Input placeholder="Search by title, client, industry..." className="pl-9 text-xs" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-36 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleCreate} className="gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs">
            <Plus size={15} /> Add Case Study
          </Button>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 text-center flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="animate-spin text-amber-500" size={18} /> Loading...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border bg-slate-50/60 dark:bg-slate-800/40 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Industry</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Technologies</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Featured</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white max-w-[200px]">
                        <p className="truncate">{c.title}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{c.slug}</p>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-muted-foreground">{c.client_name || "—"}</td>
                      <td className="py-3.5 px-4 text-xs">{c.industry || "—"}</td>
                      <td className="py-3.5 px-4 text-xs text-muted-foreground">{c.duration || "—"}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {(c.technologies || []).slice(0, 3).map((t) => (
                            <span key={t} className="text-[10px] bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded font-mono">{t}</span>
                          ))}
                          {(c.technologies || []).length > 3 && (
                            <span className="text-[10px] text-muted-foreground">+{c.technologies.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${c.status === "published" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {c.featured ? <Star size={15} className="text-amber-500 fill-amber-500" /> : <span className="text-slate-300">—</span>}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical size={16} /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {c.status === "published" && (
                              <DropdownMenuItem asChild>
                                <a href={`/portfolio/${c.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 cursor-pointer">
                                  <ExternalLink size={14} /> View Public
                                </a>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleEdit(c)} className="gap-2"><Edit size={14} /> Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(c.id)} className="gap-2 text-destructive"><Trash2 size={14} /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={8} className="py-12 text-center text-muted-foreground text-sm">No case studies found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Case Study" : "Add Case Study"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field("title", "Title *", "text", "FinTech Mobile Banking App")}
              {field("slug", "Slug *", "text", "fintech-mobile-app")}
              {field("subtitle", "Subtitle", "text", "Short tagline")}
              {field("client_name", "Client Name", "text", "Company Pvt Ltd")}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs font-semibold mb-1 block">Industry</Label>
                <Select value={formData.industry} onValueChange={(v) => setFormData((p) => ({ ...p, industry: v }))}>
                  <SelectTrigger className="text-xs"><SelectValue placeholder="Select industry" /></SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((ind) => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              {field("duration", "Duration", "text", "6 months")}
              {field("team_size", "Team Size", "text", "8 developers")}
            </div>
            {field("technologies", "Technologies (comma-separated)", "text", "React Native, Node.js, AWS")}
            {field("services", "Services (comma-separated)", "text", "Mobile Dev, API Development")}
            {field("challenge", "Challenge", "textarea", "What problem did the client face?")}
            {field("solution", "Solution", "textarea", "How did we solve it?")}
            {field("results", "Results", "textarea", "What were the outcomes?")}
            {field("cover_image", "Cover Image URL", "text", "https://...")}
            {field("tags", "Tags (comma-separated)", "text", "FinTech, Mobile, AWS")}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold mb-1 block">Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData((p) => ({ ...p, status: v }))}>
                  <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 pt-5">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
                  className="h-4 w-4 accent-amber-500"
                />
                <Label htmlFor="featured" className="text-xs font-semibold cursor-pointer">Featured (show prominently)</Label>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="text-xs">Cancel</Button>
            <Button onClick={handleSubmit} disabled={saving} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-2">
              {saving && <Loader2 size={14} className="animate-spin" />}
              {editing ? "Save Changes" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCaseStudies;
