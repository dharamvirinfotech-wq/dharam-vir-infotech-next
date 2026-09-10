import { useEffect, useMemo, useState } from "react";
import { Search, Eye, MapPin, Loader2, Briefcase, CheckCircle2, XCircle, Clock, Mail, Phone, Building2, Calendar, Download, } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { hireApi } from "@/lib/api";
const STATUS_OPTIONS = [
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "scheduled", label: "Scheduled" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "completed", label: "Completed" },
    { value: "closed", label: "Closed" },
];
const statusBadgeClass = {
    new: "bg-blue-100 text-blue-700 border-blue-200",
    contacted: "bg-indigo-100 text-indigo-700 border-indigo-200",
    scheduled: "bg-amber-100 text-amber-800 border-amber-200",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected: "bg-rose-100 text-rose-700 border-rose-200",
    completed: "bg-teal-100 text-teal-700 border-teal-200",
    closed: "bg-slate-200 text-slate-700 border-slate-300",
};
const fmtDate = (d) => new Date(d).toLocaleString();
const mapsLink = (lat, lng) => lat != null && lng != null ? `https://www.google.com/maps?q=${lat},${lng}` : null;
const escapeCsv = (val) => {
    const s = String(val ?? "").replace(/"/g, '""');
    if (s.includes(",") || s.includes("\n") || s.includes('"'))
        return `"${s}"`;
    return s;
};
const exportToCSV = (rows, filename = "hire-requests.csv") => {
    const headers = [
        "ID", "User ID", "Developer Slug", "Developer Name", "Developer Role",
        "Name", "Email", "Phone", "Company",
        "Engagement Type", "Budget", "Timeline", "Project Description",
        "Latitude", "Longitude", "Location Accuracy", "Location Address",
        "Status", "Admin Notes", "Created At", "Updated At",
    ];
    const lines = [
        headers.join(","),
        ...rows.map((r) => [
            r.id, r.user_id, r.developer_slug, r.developer_name, r.developer_role,
            r.name, r.email, r.phone, r.company,
            r.engagement_type, r.budget, r.timeline, r.project_description,
            r.latitude, r.longitude, r.location_accuracy, r.location_address,
            r.status, r.admin_notes, r.created_at, r.updated_at,
        ].map(escapeCsv).join(",")),
    ];
    const csv = lines.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
const HireRequests = () => {
    const { toast } = useToast();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [devFilter, setDevFilter] = useState("all");
    const [viewing, setViewing] = useState(null);
    const [editing, setEditing] = useState(null);
    const [editStatus, setEditStatus] = useState("new");
    const [editNotes, setEditNotes] = useState("");
    const [saving, setSaving] = useState(false);
    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await hireApi.list({
                status: statusFilter === "all" ? undefined : statusFilter,
                developer_slug: devFilter === "all" ? undefined : devFilter,
                search: search || undefined,
            });
            setRequests(data.requests);
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : "Could not load hire requests";
            toast({ title: "Failed to load", description: msg, variant: "destructive" });
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFilter, devFilter]);
    const developers = useMemo(() => Array.from(new Set(requests.map((r) => r.developer_slug))), [requests]);
    const counts = useMemo(() => {
        const c = { total: requests.length, new: 0, approved: 0, rejected: 0, completed: 0 };
        for (const r of requests) {
            if (r.status === "new")
                c.new++;
            if (r.status === "approved")
                c.approved++;
            if (r.status === "rejected")
                c.rejected++;
            if (r.status === "completed")
                c.completed++;
        }
        return c;
    }, [requests]);
    const openEdit = (r) => {
        setEditing(r);
        setEditStatus(r.status);
        setEditNotes(r.admin_notes || "");
    };
    const saveEdit = async () => {
        if (!editing)
            return;
        setSaving(true);
        try {
            await hireApi.update(editing.id, { status: editStatus, admin_notes: editNotes });
            toast({ title: "Hire request updated", description: `Status set to ${editStatus}.` });
            setEditing(null);
            fetchData();
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : "Update failed";
            toast({ title: "Update failed", description: msg, variant: "destructive" });
        }
        finally {
            setSaving(false);
        }
    };
    const quickStatus = async (r, status) => {
        try {
            await hireApi.update(r.id, { status });
            toast({ title: `Marked ${status}`, description: `Request #${r.id} updated.` });
            fetchData();
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : "Update failed";
            toast({ title: "Update failed", description: msg, variant: "destructive" });
        }
    };
    return (<div className="min-h-screen bg-background flex">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((s) => !s)}/>

      <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
        <header className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2">
            <Briefcase className="text-accent"/> Hire Requests
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review, approve, reject and mark hire requests as completed. Live location is captured on submission.
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { label: "Total", value: counts.total, icon: Briefcase, color: "text-foreground" },
            { label: "New", value: counts.new, icon: Clock, color: "text-blue-600" },
            { label: "Approved", value: counts.approved, icon: CheckCircle2, color: "text-emerald-600" },
            { label: "Rejected", value: counts.rejected, icon: XCircle, color: "text-rose-600" },
            { label: "Completed", value: counts.completed, icon: CheckCircle2, color: "text-teal-600" },
        ].map((s) => (<Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <s.icon className={`h-5 w-5 ${s.color}`}/>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-semibold">{s.value}</p>
                </div>
              </CardContent>
            </Card>))}
        </div>

        {/* Filters */}
        <Card className="mb-4">
          <CardContent className="p-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
              <Input placeholder="Search by name, email, company, developer…" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && fetchData()} className="pl-9"/>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="md:w-44"><SelectValue placeholder="Status"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {STATUS_OPTIONS.map((s) => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
              </SelectContent>
            </Select>
            <Select value={devFilter} onValueChange={setDevFilter}>
              <SelectTrigger className="md:w-56"><SelectValue placeholder="Developer"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All developers</SelectItem>
                {developers.map((d) => (<SelectItem key={d} value={d}>{d}</SelectItem>))}
              </SelectContent>
            </Select>
            <Button onClick={fetchData} variant="secondary">Apply</Button>
            <Button variant="outline" onClick={() => exportToCSV(requests, "hire-requests.csv")} disabled={requests.length === 0} className="gap-2">
              <Download className="h-4 w-4"/> Export CSV
            </Button>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (<div className="p-10 flex items-center justify-center text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin mr-2"/> Loading…
              </div>) : requests.length === 0 ? (<div className="p-10 text-center text-muted-foreground">No hire requests found.</div>) : (<div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Requester</th>
                      <th className="px-4 py-3">Developer</th>
                      <th className="px-4 py-3">Engagement</th>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Submitted</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((r) => {
                const m = mapsLink(r.latitude, r.longitude);
                return (<tr key={r.id} className="border-t hover:bg-muted/30">
                          <td className="px-4 py-3 text-muted-foreground">#{r.id}</td>
                          <td className="px-4 py-3">
                            <div className="font-medium">{r.name}</div>
                            <div className="text-xs text-muted-foreground">{r.email}</div>
                            {r.company && <div className="text-xs text-muted-foreground">{r.company}</div>}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium">{r.developer_name}</div>
                            <div className="text-xs text-muted-foreground">{r.developer_role || r.developer_slug}</div>
                          </td>
                          <td className="px-4 py-3 text-xs">
                            {r.engagement_type}
                            <div className="text-muted-foreground">{r.budget || "—"} · {r.timeline || "—"}</div>
                          </td>
                          <td className="px-4 py-3 text-xs max-w-[220px]">
                            <div className="flex items-start gap-1">
                              <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0"/>
                              <div className="truncate" title={r.location_address || ""}>
                                {r.location_address || "—"}
                              </div>
                            </div>
                            {m && (<a href={m} target="_blank" rel="noreferrer" className="text-accent hover:underline text-xs">
                                View on Maps
                              </a>)}
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                            {fmtDate(r.created_at)}
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={statusBadgeClass[r.status]}>
                              {r.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
                            <Button size="sm" variant="ghost" onClick={() => setViewing(r)}>
                              <Eye className="h-4 w-4"/>
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => quickStatus(r, "approved")}>
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => quickStatus(r, "rejected")}>
                              Reject
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => quickStatus(r, "completed")}>
                              Complete
                            </Button>
                            <Button size="sm" onClick={() => openEdit(r)}>Edit</Button>
                          </td>
                        </tr>);
            })}
                  </tbody>
                </table>
              </div>)}
          </CardContent>
        </Card>
      </main>

      {/* View dialog */}
      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-w-2xl">
          {viewing && (<>
              <DialogHeader>
                <DialogTitle>Hire Request #{viewing.id}</DialogTitle>
                <DialogDescription>
                  Submitted {fmtDate(viewing.created_at)} · Status: <strong>{viewing.status}</strong>
                </DialogDescription>
              </DialogHeader>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <Info icon={<Briefcase className="h-4 w-4"/>} label="Developer" value={`${viewing.developer_name}${viewing.developer_role ? ` (${viewing.developer_role})` : ""}`}/>
                <Info icon={<Calendar className="h-4 w-4"/>} label="Engagement" value={`${viewing.engagement_type} · ${viewing.budget || "—"} · ${viewing.timeline || "—"}`}/>
                <Info icon={<Mail className="h-4 w-4"/>} label="Email" value={viewing.email}/>
                <Info icon={<Phone className="h-4 w-4"/>} label="Phone" value={viewing.phone || "—"}/>
                <Info icon={<Building2 className="h-4 w-4"/>} label="Company" value={viewing.company || "—"}/>
                <Info icon={<MapPin className="h-4 w-4"/>} label="Coordinates" value={viewing.latitude && viewing.longitude
                ? `${viewing.latitude}, ${viewing.longitude}` : "—"}/>
              </div>
              <div className="mt-2">
                <Label className="text-xs text-muted-foreground">Address</Label>
                <p className="text-sm">{viewing.location_address || "—"}</p>
                {mapsLink(viewing.latitude, viewing.longitude) && (<a href={mapsLink(viewing.latitude, viewing.longitude)} target="_blank" rel="noreferrer" className="text-accent text-sm hover:underline inline-flex items-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5"/> Open in Google Maps
                  </a>)}
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Project Description</Label>
                <p className="text-sm whitespace-pre-wrap mt-1">{viewing.project_description}</p>
              </div>
              {viewing.admin_notes && (<div>
                  <Label className="text-xs text-muted-foreground">Admin Notes</Label>
                  <p className="text-sm whitespace-pre-wrap mt-1">{viewing.admin_notes}</p>
                </div>)}
              <DialogFooter>
                <Button variant="secondary" onClick={() => setViewing(null)}>Close</Button>
                <Button onClick={() => { openEdit(viewing); setViewing(null); }}>Edit</Button>
              </DialogFooter>
            </>)}
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          {editing && (<>
              <DialogHeader>
                <DialogTitle>Update Hire Request #{editing.id}</DialogTitle>
                <DialogDescription>{editing.name} → {editing.developer_name}</DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label>Status</Label>
                  <Select value={editStatus} onValueChange={(v) => setEditStatus(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Admin Notes</Label>
                  <Textarea rows={4} value={editNotes} onChange={(e) => setEditNotes(e.target.value)} placeholder="Internal notes about this request…"/>
                </div>
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
                <Button onClick={saveEdit} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin mr-2"/>} Save
                </Button>
              </DialogFooter>
            </>)}
        </DialogContent>
      </Dialog>
    </div>);
};
const Info = ({ icon, label, value }) => (<div>
    <div className="text-xs text-muted-foreground flex items-center gap-1">{icon}{label}</div>
    <div className="text-sm">{value}</div>
  </div>);
export default HireRequests;
