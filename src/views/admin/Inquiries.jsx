import { useEffect, useMemo, useState } from "react";
import { Mail, Bell, Search, Eye, Trash2, Reply, Phone, Calendar, Filter, Loader2, MoreVertical } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { contactApi } from "@/lib/api";
const Inquiries = () => {
    const { toast } = useToast();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [inquiries, setInquiries] = useState([]);
    const [counts, setCounts] = useState({ total: 0, new_count: 0, replied_count: 0, closed_count: 0 });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [serviceFilter, setServiceFilter] = useState("all");
    const [viewing, setViewing] = useState(null);
    const [replying, setReplying] = useState(null);
    const [replyText, setReplyText] = useState("");
    const services = useMemo(() => Array.from(new Set(inquiries.map((i) => i.service).filter(Boolean))), [inquiries]);
    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await contactApi.list({
                status: statusFilter,
                service: serviceFilter,
                search: search || undefined,
            });
            setInquiries(data.inquiries);
            setCounts({
                total: Number(data.counts.total) || 0,
                new_count: Number(data.counts.new_count) || 0,
                replied_count: Number(data.counts.replied_count) || 0,
                closed_count: Number(data.counts.closed_count) || 0,
            });
        }
        catch (err) {
            toast({
                title: "Failed to load",
                description: err?.response?.data?.message || "Please try again.",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const t = setTimeout(fetchData, 250);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFilter, serviceFilter, search]);
    const updateStatus = async (id, status) => {
        try {
            await contactApi.update(id, { status });
            setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
            toast({ title: "Status updated", description: `Marked as ${status}.` });
            fetchData();
        }
        catch (err) {
            toast({ title: "Update failed", description: err?.response?.data?.message || "Try again.", variant: "destructive" });
        }
    };
    const deleteInquiry = async (id) => {
        try {
            await contactApi.remove(id);
            setInquiries((prev) => prev.filter((i) => i.id !== id));
            toast({ title: "Inquiry deleted" });
            fetchData();
        }
        catch (err) {
            toast({ title: "Delete failed", description: err?.response?.data?.message || "Try again.", variant: "destructive" });
        }
    };
    const sendReply = async () => {
        if (!replying || !replyText.trim())
            return;
        try {
            await contactApi.update(replying.id, { status: "replied", admin_notes: replyText });
            toast({ title: "Reply recorded", description: "Inquiry marked as replied." });
            setReplying(null);
            setReplyText("");
            fetchData();
        }
        catch (err) {
            toast({ title: "Failed", description: err?.response?.data?.message || "Try again.", variant: "destructive" });
        }
    };
    const statusBadge = (s) => {
        const map = {
            new: "bg-accent/10 text-accent",
            replied: "bg-blue-500/10 text-blue-600",
            closed: "bg-muted text-muted-foreground",
        };
        const labels = { new: "New", replied: "Replied", closed: "Closed" };
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[s]}`}>{labels[s]}</span>;
    };
    const fmtDate = (d) => {
        try {
            return new Date(d).toLocaleString();
        }
        catch {
            return d;
        }
    };
    return (<div className="min-h-screen bg-muted/30 flex">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}/>

      <main className="flex-1 min-h-screen">
        <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-primary">Contact Inquiries</h1>
            <p className="text-sm text-muted-foreground">Manage all messages submitted from the Contact Us page</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground">
              <Bell size={20}/>
              {counts.new_count > 0 && (<span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">{counts.new_count}</span>)}
            </button>
            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">A</div>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
            { label: "Total", value: counts.total, color: "bg-primary/10 text-primary" },
            { label: "New", value: counts.new_count, color: "bg-accent/10 text-accent" },
            { label: "Replied", value: counts.replied_count, color: "bg-blue-500/10 text-blue-600" },
            { label: "Closed", value: counts.closed_count, color: "bg-muted text-muted-foreground" },
        ].map((s) => (<Card key={s.label} className="border-border">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="text-2xl font-bold text-primary mt-1">{s.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
                    <Mail size={18}/>
                  </div>
                </CardContent>
              </Card>))}
          </div>

          <Card className="border-border mb-6">
            <CardContent className="p-4 flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                <Input placeholder="Search by name, email or subject..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9"/>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-44"><Filter size={14} className="mr-2"/><SelectValue placeholder="Status"/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-full md:w-52"><SelectValue placeholder="Service"/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                All Inquiries ({inquiries.length})
                {loading && <Loader2 size={14} className="animate-spin text-muted-foreground"/>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Name</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Contact</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Subject</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Service</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                      <th className="text-right py-3 px-2 text-muted-foreground font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading && inquiries.length === 0 ? (<tr><td colSpan={7} className="py-8 text-center text-muted-foreground">No inquiries found</td></tr>) : inquiries.map((i) => (<tr key={i.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-2 font-medium text-foreground">{i.name}</td>
                        <td className="py-3 px-2 text-muted-foreground">
                          <div>{i.email}</div>
                          <div className="text-xs">{i.phone || "—"}</div>
                        </td>
                        <td className="py-3 px-2 text-foreground max-w-xs truncate">{i.subject || "—"}</td>
                        <td className="py-3 px-2 text-muted-foreground">{i.service || "—"}</td>
                        <td className="py-3 px-2 text-muted-foreground whitespace-nowrap">{fmtDate(i.created_at)}</td>
                        <td className="py-3 px-2">{statusBadge(i.status)}</td>
                        <td className="py-3 px-2 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreVertical size={16}/></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setViewing(i)}><Eye size={14} className="mr-2"/> View</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => { setReplying(i); setReplyText(i.admin_notes || ""); }}><Reply size={14} className="mr-2"/> Reply</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => updateStatus(i.id, "new")}>Mark as New</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateStatus(i.id, "replied")}>Mark as Replied</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateStatus(i.id, "closed")}>Mark as Closed</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => deleteInquiry(i.id)} className="text-destructive"><Trash2 size={14} className="mr-2"/> Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>Full message submitted via Contact Us</DialogDescription>
          </DialogHeader>
          {viewing && (<div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-muted-foreground">Name</Label><p className="font-medium">{viewing.name}</p></div>
                <div><Label className="text-muted-foreground">Status</Label><div className="mt-1">{statusBadge(viewing.status)}</div></div>
                <div><Label className="text-muted-foreground">Email</Label><p className="font-medium flex items-center gap-1"><Mail size={14}/> {viewing.email}</p></div>
                <div><Label className="text-muted-foreground">Phone</Label><p className="font-medium flex items-center gap-1"><Phone size={14}/> {viewing.phone || "—"}</p></div>
                <div><Label className="text-muted-foreground">Service</Label><p className="font-medium">{viewing.service || "—"}</p></div>
                <div><Label className="text-muted-foreground">Date</Label><p className="font-medium flex items-center gap-1"><Calendar size={14}/> {fmtDate(viewing.created_at)}</p></div>
              </div>
              <div>
                <Label className="text-muted-foreground">Subject</Label>
                <p className="font-medium">{viewing.subject || "—"}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Message</Label>
                <div className="mt-1 p-4 bg-muted/50 rounded-lg text-sm whitespace-pre-wrap">{viewing.message}</div>
              </div>
              {viewing.admin_notes && (<div>
                  <Label className="text-muted-foreground">Admin Notes / Reply</Label>
                  <div className="mt-1 p-4 bg-muted/50 rounded-lg text-sm whitespace-pre-wrap">{viewing.admin_notes}</div>
                </div>)}
            </div>)}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewing(null)}>Close</Button>
            <Button onClick={() => { if (viewing) {
        setReplying(viewing);
        setViewing(null);
        setReplyText(viewing.admin_notes || "");
    } }}>
              <Reply size={14} className="mr-2"/> Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!replying} onOpenChange={(o) => !o && setReplying(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Reply to {replying?.name}</DialogTitle>
            <DialogDescription>Save a response note for {replying?.email}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Subject</Label>
              <Input defaultValue={`Re: ${replying?.subject ?? ""}`}/>
            </div>
            <div>
              <Label>Message / Internal Note</Label>
              <Textarea rows={6} placeholder="Type your reply..." value={replyText} onChange={(e) => setReplyText(e.target.value)}/>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplying(null)}>Cancel</Button>
            <Button onClick={sendReply} disabled={!replyText.trim()}>Save & Mark Replied</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);
};
export default Inquiries;
