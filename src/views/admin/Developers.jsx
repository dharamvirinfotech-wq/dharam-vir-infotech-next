import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Star, MoreVertical, Loader2, MapPin, ExternalLink } from "lucide-react";
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
import { developersApi } from "@/lib/api";

const emptyForm = {
  slug: "", name: "", role: "Developer", experience: "", hourlyRate: "", rating: 4.5,
  location: "", avatar: "", skills: "", bio: "", languages: "", availability: "Full-time",
  projectsCompleted: 0, certifications: "", education: "", categories: "",
  status: "active", featured: false,
};

const toList = (s) => (s ? s.split(",").map((x) => x.trim()).filter(Boolean) : []);

const AdminDevelopers = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [formData, setFormData] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const res = await developersApi.list();
      setDevelopers(res.developers || []);
    } catch (e) {
      toast({
        title: "Failed to load developers",
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

  const filtered = developers.filter((d) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      d.name.toLowerCase().includes(q) ||
      d.role.toLowerCase().includes(q) ||
      (d.skills || []).join(" ").toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || d.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleCreate = () => {
    setEditing(null);
    setFormData(emptyForm);
    setDialogOpen(true);
  };

  const handleEdit = (d) => {
    setEditing(d);
    setFormData({
      slug: d.slug, name: d.name, role: d.role, experience: d.experience,
      hourlyRate: d.hourlyRate || "", rating: d.rating, location: d.location || "",
      avatar: d.avatar || "", skills: (d.skills || []).join(", "), bio: d.bio || "",
      languages: (d.languages || []).join(", "), availability: d.availability || "Full-time",
      projectsCompleted: d.projectsCompleted,
      certifications: (d.certifications || []).join(", "),
      education: d.education || "", categories: (d.categories || []).join(", "),
      status: d.status, featured: d.featured,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this developer profile?")) return;
    try {
      await developersApi.remove(id);
      setDevelopers((prev) => prev.filter((d) => d.id !== id));
      toast({ title: "Developer deleted", description: "Profile has been removed." });
    } catch (e) {
      toast({
        title: "Delete failed",
        description: e instanceof Error ? e.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.role || !formData.experience) {
      toast({ title: "Missing fields", description: "Name, role and experience are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      slug: formData.slug || undefined,
      name: formData.name, role: formData.role, experience: formData.experience,
      hourlyRate: formData.hourlyRate, rating: Number(formData.rating) || 0,
      location: formData.location, avatar: formData.avatar || undefined,
      bio: formData.bio, availability: formData.availability,
      projectsCompleted: Number(formData.projectsCompleted) || 0,
      education: formData.education,
      skills: toList(formData.skills),
      languages: toList(formData.languages),
      certifications: toList(formData.certifications),
      categories: toList(formData.categories),
      status: formData.status, featured: formData.featured,
    };
    try {
      if (editing) {
        const res = await developersApi.update(editing.id, payload);
        setDevelopers((prev) => prev.map((d) => (d.id === editing.id ? res.developer : d)));
        toast({ title: "Developer updated", description: `${res.developer.name} has been updated.` });
      } else {
        const res = await developersApi.create(payload);
        setDevelopers((prev) => [res.developer, ...prev]);
        toast({ title: "Developer added", description: `${res.developer.name} has been created.` });
      }
      setDialogOpen(false);
    } catch (e) {
      toast({
        title: "Save failed",
        description: e instanceof Error ? e.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Company Developers"
      subtitle="Manage your team profiles — visible on public /developer/[slug] pages"
      icon={Star}
    >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <Card className="border-border bg-white dark:bg-slate-900 shadow-xs"><CardContent className="p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Developers</p><p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{developers.length}</p></CardContent></Card>
            <Card className="border-border bg-white dark:bg-slate-900 shadow-xs"><CardContent className="p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active</p><p className="text-2xl font-black text-emerald-600 mt-1">{developers.filter((d) => d.status === "active").length}</p></CardContent></Card>
            <Card className="border-border bg-white dark:bg-slate-900 shadow-xs"><CardContent className="p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Featured</p><p className="text-2xl font-black text-amber-500 mt-1">{developers.filter((d) => d.featured).length}</p></CardContent></Card>
            <Card className="border-border bg-white dark:bg-slate-900 shadow-xs"><CardContent className="p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Avg. Rating</p><p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{developers.length ? (developers.reduce((s, d) => s + d.rating, 0) / developers.length).toFixed(1) : "0.0"}</p></CardContent></Card>
          </div>

          <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
            <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="flex gap-3 flex-1 w-full sm:w-auto">
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input placeholder="Search by name, role, skills..." className="pl-9 text-xs" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-36 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreate} className="gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"><Plus size={16} /> Add Developer</Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
            <CardContent className="p-0">
              {loading ? (
                <div className="py-16 text-center text-muted-foreground flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin text-amber-500" size={18} /> Loading developers...
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-border bg-slate-50/60 dark:bg-slate-800/40 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        <th className="py-3 px-4">Developer</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Experience</th>
                        <th className="py-3 px-4">Rate</th>
                        <th className="py-3 px-4">Rating</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Projects</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filtered.map((d) => (
                        <tr key={d.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                            <div className="flex items-center gap-2">
                              {d.featured && <Star size={13} className="text-amber-500 fill-amber-500 shrink-0" />}
                              <span>{d.name}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-xs">{d.role}</td>
                          <td className="py-3.5 px-4 text-xs text-muted-foreground">{d.experience}</td>
                          <td className="py-3.5 px-4 text-xs font-mono font-semibold">{d.hourlyRate ? `$${d.hourlyRate}/hr` : "—"}</td>
                          <td className="py-3.5 px-4 text-xs font-bold text-amber-500">★ {d.rating}</td>
                          <td className="py-3.5 px-4 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><MapPin size={12} />{d.location}</span></td>
                          <td className="py-3.5 px-4 text-xs text-muted-foreground">{d.projectsCompleted}+</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${d.status === "active" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-slate-100 text-slate-700"}`}>
                              {d.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical size={16} /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <a href={`/developer/${d.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 cursor-pointer">
                                    <ExternalLink size={14} /> View Profile
                                  </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEdit(d)} className="gap-2"><Edit size={14} /> Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(d.id)} className="gap-2 text-destructive"><Trash2 size={14} /> Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr><td colSpan={9} className="py-12 text-center text-muted-foreground">No developers found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Developer Profile" : "Add New Developer"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Full Name *</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Rahul Sharma" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Slug (URL)</Label>
                <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="auto-generated from name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Role / Title *</Label>
                <Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="Senior React Developer" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Experience *</Label>
                <Input value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} placeholder="5+ Years" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Hourly Rate ($)</Label>
                <Input value={formData.hourlyRate} onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })} placeholder="45" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Rating (1-5)</Label>
                <Input type="number" step="0.1" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Location</Label>
                <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Noida, India" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Skills (comma separated)</Label>
              <Input value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} placeholder="React, Node.js, Next.js, TypeScript" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Bio / Summary</Label>
              <Textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Short introduction..." rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Availability</Label>
                <Select value={formData.availability} onValueChange={(v) => setFormData({ ...formData, availability: v })}>
                  <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Projects Completed</Label>
                <Input type="number" value={formData.projectsCompleted} onChange={(e) => setFormData({ ...formData, projectsCompleted: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Featured</Label>
                <Select value={formData.featured ? "yes" : "no"} onValueChange={(v) => setFormData({ ...formData, featured: v === "yes" })}>
                  <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)} disabled={saving}>Cancel</Button>
              <Button size="sm" onClick={handleSubmit} disabled={saving} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                {saving && <Loader2 className="animate-spin mr-2" size={14} />}
                {editing ? "Save Changes" : "Add Developer"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminDevelopers;
