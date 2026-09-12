import { useEffect, useMemo, useState } from "react";
import { 
  Mail, Bell, Search, Eye, Trash2, Reply, Phone, Calendar, Filter, 
  Loader2, MoreVertical, Send, CheckCircle2, Sparkles 
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { contactApi, emailApi } from "@/lib/api";

const Inquiries = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState([]);
  const [counts, setCounts] = useState({ total: 0, new_count: 0, replied_count: 0, closed_count: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  const [viewing, setViewing] = useState(null);
  const [clientEmailLogs, setClientEmailLogs] = useState([]);
  const [loadingEmailLogs, setLoadingEmailLogs] = useState(false);
  const [replying, setReplying] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Custom Mail Sender State
  const [customMailTarget, setCustomMailTarget] = useState(null);
  const [customSubject, setCustomSubject] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [sendingCustomMail, setSendingCustomMail] = useState(false);

  const services = useMemo(() => Array.from(new Set(inquiries.map((i) => i.service).filter(Boolean))), [inquiries]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await contactApi.list({
        status: statusFilter,
        service: serviceFilter,
        search: search || undefined,
      });
      setInquiries(data.inquiries || []);
      setCounts({
        total: Number(data.counts?.total) || 0,
        new_count: Number(data.counts?.new_count) || 0,
        replied_count: Number(data.counts?.replied_count) || 0,
        closed_count: Number(data.counts?.closed_count) || 0,
      });
    } catch (err) {
      toast({
        title: "Failed to load",
        description: err?.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchData, 250);
    return () => clearTimeout(t);
  }, [statusFilter, serviceFilter, search]);

  useEffect(() => {
    if (viewing && viewing.email) {
      setLoadingEmailLogs(true);
      emailApi
        .getLogs({ search: viewing.email })
        .then((res) => {
          setClientEmailLogs(res?.logs || []);
        })
        .catch(() => {
          setClientEmailLogs([]);
        })
        .finally(() => {
          setLoadingEmailLogs(false);
        });
    } else {
      setClientEmailLogs([]);
    }
  }, [viewing]);

  const updateStatus = async (id, status) => {
    try {
      await contactApi.update(id, { status });
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
      toast({ title: "Status updated", description: `Marked as ${status}.` });
      fetchData();
    } catch (err) {
      toast({ title: "Update failed", description: err?.response?.data?.message || "Try again.", variant: "destructive" });
    }
  };

  const deleteInquiry = async (id) => {
    try {
      await contactApi.remove(id);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      toast({ title: "Inquiry deleted" });
      fetchData();
    } catch (err) {
      toast({ title: "Delete failed", description: err?.response?.data?.message || "Try again.", variant: "destructive" });
    }
  };

  const sendReply = async () => {
    if (!replying || !replyText.trim()) return;
    try {
      await contactApi.update(replying.id, { status: "replied", admin_notes: replyText });
      toast({ title: "Reply recorded", description: "Inquiry marked as replied." });
      setReplying(null);
      setReplyText("");
      fetchData();
    } catch (err) {
      toast({ title: "Failed", description: err?.response?.data?.message || "Try again.", variant: "destructive" });
    }
  };

  const handleSendCustomMail = async () => {
    if (!customMailTarget || !customSubject.trim() || !customMessage.trim()) {
      toast({ title: "Missing fields", description: "Subject and message are required.", variant: "destructive" });
      return;
    }
    setSendingCustomMail(true);
    try {
      const res = await contactApi.sendCustomEmail({
        recipient_email: customMailTarget.email,
        recipient_name: customMailTarget.name,
        subject: customSubject.trim(),
        message: customMessage.trim(),
        inquiry_id: customMailTarget.id,
      });

      if (res.success) {
        toast({
          title: "Email Sent Successfully!",
          description: `Custom email delivered to ${customMailTarget.email}`,
        });
        setCustomMailTarget(null);
        setCustomSubject("");
        setCustomMessage("");
        fetchData();
      }
    } catch (err) {
      toast({
        title: "Email delivery failed",
        description: err?.response?.data?.message || "Could not send email. Check SMTP settings.",
        variant: "destructive",
      });
    } finally {
      setSendingCustomMail(false);
    }
  };

  const openCustomMailModal = (inquiry) => {
    setCustomMailTarget(inquiry);
    setCustomSubject(`Regarding your inquiry with Dharam Vir Infotech - ${inquiry.subject || inquiry.service || "IT Services"}`);
    setCustomMessage(`Hello ${inquiry.name},\n\nThank you for reaching out to us. We have reviewed your inquiry regarding "${inquiry.service || inquiry.subject || "our services"}" and would love to assist you.\n\nBest regards,\nDharam Vir Infotech Team`);
  };

  const statusBadge = (s) => {
    const map = {
      new: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800",
      replied: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800",
      closed: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
    };
    const labels = { new: "New Lead", replied: "Replied", closed: "Closed" };
    return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[s] || map.new}`}>{labels[s] || s}</span>;
  };

  const fmtDate = (d) => {
    try {
      return new Date(d).toLocaleString();
    } catch {
      return d;
    }
  };

  return (
    <AdminLayout
      title="Inquiry / Leads / Clients"
      subtitle="Manage incoming client inquiries, lead pipeline, and communication dispatch logs"
      icon={Mail}
      actions={
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-full text-xs font-medium text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 size={13} />
          <span>Auto-Welcome Mail Active</span>
        </div>
      }
    >
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Leads", value: counts.total, color: "bg-blue-500/10 text-blue-600" },
              { label: "New Leads", value: counts.new_count, color: "bg-amber-500/10 text-amber-600" },
              { label: "Replied", value: counts.replied_count, color: "bg-emerald-500/10 text-emerald-600" },
              { label: "Closed", value: counts.closed_count, color: "bg-slate-500/10 text-slate-600" },
            ].map((s) => (
              <Card key={s.label} className="border-border bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{s.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                    <Mail size={18} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search & Filters */}
          <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
            <CardContent className="p-4 flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Search by client name, email, phone or subject..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-10 bg-slate-50 dark:bg-slate-800/60"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-44 h-10">
                  <Filter size={14} className="mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-full md:w-52 h-10">
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {services.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Inquiries Table */}
          <Card className="border-border bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
            <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Client Inquiries ({inquiries.length})</span>
                  {loading && <Loader2 size={15} className="animate-spin text-amber-500" />}
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Click 'Send Custom Mail' to email any client directly from this panel
                </CardDescription>
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-slate-50/60 dark:bg-slate-800/40 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Contact Details</th>
                    <th className="py-3 px-4">Service & Subject</th>
                    <th className="py-3 px-4">Submitted At</th>
                    <th className="py-3 px-4">Welcome Mail</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {!loading && inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-muted-foreground">
                        <Mail size={32} className="mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                        No inquiries found matching your filters
                      </td>
                    </tr>
                  ) : (
                    inquiries.map((i) => (
                      <tr key={i.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                          {i.name}
                        </td>
                        <td className="py-3.5 px-4 text-xs">
                          <div className="font-medium text-slate-800 dark:text-slate-200">{i.email}</div>
                          <div className="text-muted-foreground mt-0.5">{i.phone || "—"}</div>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          {i.service && i.service.startsWith("Portfolio") ? (
                            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-1">
                              📁 {i.service}
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-1">
                              {i.service || "General Inquiry"}
                            </span>
                          )}
                          <div className="text-xs text-muted-foreground truncate" title={i.subject}>
                            {i.subject || i.message}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-muted-foreground whitespace-nowrap">
                          {fmtDate(i.created_at)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100/70 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                            <CheckCircle2 size={12} /> Auto-Sent
                          </span>
                        </td>
                        <td className="py-3.5 px-4">{statusBadge(i.status)}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openCustomMailModal(i)}
                              className="h-8 px-2.5 text-xs text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/60 hover:bg-amber-500/10 gap-1.5"
                            >
                              <Send size={13} />
                              <span className="hidden sm:inline">Send Mail</span>
                            </Button>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => setViewing(i)}>
                                  <Eye size={14} className="mr-2" /> View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openCustomMailModal(i)}>
                                  <Send size={14} className="mr-2 text-amber-500" /> Send Custom Email
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { setReplying(i); setReplyText(i.admin_notes || ""); }}>
                                  <Reply size={14} className="mr-2" /> Internal Note
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => updateStatus(i.id, "new")}>Mark as New</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateStatus(i.id, "replied")}>Mark as Replied</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateStatus(i.id, "closed")}>Mark as Closed</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => deleteInquiry(i.id)} className="text-destructive">
                                  <Trash2 size={14} className="mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>

      {/* Inquiry View Modal */}
      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Client Inquiry Overview</DialogTitle>
            <DialogDescription className="text-xs">Original message received from contact form</DialogDescription>
          </DialogHeader>
          {viewing && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-border text-xs">
                <div>
                  <Label className="text-muted-foreground">Client Name</Label>
                  <p className="font-semibold text-slate-900 dark:text-white mt-0.5">{viewing.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-0.5">{statusBadge(viewing.status)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email Address</Label>
                  <p className="font-mono text-slate-900 dark:text-white mt-0.5 flex items-center gap-1">
                    <Mail size={12} className="text-amber-500" /> {viewing.email}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium text-slate-900 dark:text-white mt-0.5 flex items-center gap-1">
                    <Phone size={12} className="text-amber-500" /> {viewing.phone || "—"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Interested Service</Label>
                  <p className="font-medium text-slate-900 dark:text-white mt-0.5">{viewing.service || "General Inquiry"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Received Date</Label>
                  <p className="font-medium text-slate-900 dark:text-white mt-0.5 flex items-center gap-1">
                    <Calendar size={12} className="text-amber-500" /> {fmtDate(viewing.created_at)}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Subject</Label>
                <p className="font-medium text-slate-900 dark:text-white mt-1 p-2.5 rounded-lg border border-border bg-slate-50 dark:bg-slate-800/40">
                  {viewing.subject || "—"}
                </p>
              </div>

              <div>
                <Label className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Client's Message</Label>
                <div className="mt-1 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-border text-xs leading-relaxed whitespace-pre-wrap">
                  {viewing.message}
                </div>
              </div>

              {/* Email Communication History & Dispatch Logs for this Lead/Client */}
              <div className="pt-3 border-t border-border space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Mail size={14} className="text-amber-500" />
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                      Email Communication & Dispatch Logs ({clientEmailLogs.length})
                    </Label>
                  </div>
                  {loadingEmailLogs && (
                    <Loader2 size={13} className="animate-spin text-amber-500" />
                  )}
                </div>

                {loadingEmailLogs ? (
                  <p className="text-xs text-muted-foreground italic py-1">Loading email records...</p>
                ) : clientEmailLogs.length === 0 ? (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-border text-xs text-muted-foreground flex items-center justify-between">
                    <span>No previous email logs recorded for <strong>{viewing.email}</strong>.</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-[11px] gap-1"
                      onClick={() => {
                        const target = viewing;
                        setViewing(null);
                        openCustomMailModal(target);
                      }}
                    >
                      <Send size={12} /> Send Email
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                    {clientEmailLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-2.5 rounded-xl border border-border bg-slate-50/70 dark:bg-slate-800/40 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-slate-900 dark:text-white truncate">
                            {log.subject}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                              log.status === "sent"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                                : "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300"
                            }`}
                          >
                            {log.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                          <span className="font-mono text-[10px]">{log.email_type || "welcome_client"}</span>
                          <span>{fmtDate(log.created_at)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setViewing(null)}>Close</Button>
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold gap-1.5"
              onClick={() => {
                const target = viewing;
                setViewing(null);
                openCustomMailModal(target);
              }}
            >
              <Send size={14} /> Send Custom Email to Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Direct Custom Email Modal */}
      <Dialog open={!!customMailTarget} onOpenChange={(o) => !o && setCustomMailTarget(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-500/10 text-amber-500">
                <Send size={18} />
              </span>
              <DialogTitle className="text-lg font-bold">Send Direct Email to Client</DialogTitle>
            </div>
            <DialogDescription className="text-xs">
              Dispatches a branded HTML email directly to <strong>{customMailTarget?.email}</strong> using configured SMTP
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-sm mt-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-border text-xs flex justify-between">
              <div>
                <span className="text-muted-foreground">Recipient Name:</span>
                <p className="font-semibold">{customMailTarget?.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Recipient Email:</span>
                <p className="font-mono font-medium">{customMailTarget?.email}</p>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold">Email Subject</Label>
              <Input
                placeholder="Enter email subject line..."
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Message Content</Label>
              <Textarea
                rows={7}
                placeholder="Write your custom message for the client..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="mt-1 leading-relaxed text-xs"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                This will be wrapped automatically in the professional Dharam Vir Infotech branded email template.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 mt-4">
            <Button variant="outline" onClick={() => setCustomMailTarget(null)} disabled={sendingCustomMail}>
              Cancel
            </Button>
            <Button
              onClick={handleSendCustomMail}
              disabled={sendingCustomMail || !customSubject.trim() || !customMessage.trim()}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold gap-2"
            >
              {sendingCustomMail ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Sending Email...
                </>
              ) : (
                <>
                  <Send size={15} /> Send Email Now
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Internal Note Reply Dialog */}
      <Dialog open={!!replying} onOpenChange={(o) => !o && setReplying(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Internal Log Note for {replying?.name}</DialogTitle>
            <DialogDescription className="text-xs">
              Record telephone call or internal followup notes on this inquiry
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Notes</Label>
              <Textarea
                rows={5}
                placeholder="Type your notes here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplying(null)}>Cancel</Button>
            <Button onClick={sendReply} disabled={!replyText.trim()} className="bg-amber-500 text-slate-950 font-bold hover:bg-amber-600">
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Inquiries;
