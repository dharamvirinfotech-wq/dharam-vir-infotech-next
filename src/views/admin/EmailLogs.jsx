import { useEffect, useState } from "react";
import { 
  Mail, Search, RefreshCw, Eye, CheckCircle2, XCircle, Clock, 
  Send, ShieldCheck, AlertCircle, Filter, ChevronLeft, ChevronRight 
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { emailApi } from "@/lib/api";

const EmailLogs = () => {
  const { toast } = useToast();
  const [logs, setLogs] = useState([]);
  const [counts, setCounts] = useState({ total: 0, sent: 0, failed: 0, welcome: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewingLog, setViewingLog] = useState(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await emailApi.getLogs({
        page,
        limit: 15,
        status: statusFilter,
        type: typeFilter,
        search: search.trim() || undefined,
      });

      if (res.success) {
        setLogs(res.logs || []);
        setCounts(res.counts || { total: 0, sent: 0, failed: 0, welcome: 0 });
        setTotalPages(res.pagination?.pages || 1);
      }
    } catch (err) {
      toast({
        title: "Failed to load logs",
        description: err?.response?.data?.message || "Could not fetch email logs from server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchLogs, 250);
    return () => clearTimeout(timer);
  }, [page, statusFilter, typeFilter, search]);

  const fmtDate = (d) => {
    try {
      return new Date(d).toLocaleString();
    } catch {
      return d;
    }
  };

  const renderTypeBadge = (type) => {
    switch (type) {
      case "welcome_client":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">Welcome Mail</span>;
      case "admin_alert":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800">Admin Alert</span>;
      case "custom_admin":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800">Custom Mail</span>;
      case "test_smtp":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-200 dark:border-purple-800">Test SMTP</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">{type}</span>;
    }
  };

  const renderStatusBadge = (status) => {
    if (status === "sent") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100/70 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
          <CheckCircle2 size={12} /> Sent
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-rose-100/70 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
        <XCircle size={12} /> Failed
      </span>
    );
  };

  return (
    <AdminLayout
      title="Email Delivery Logs"
      subtitle="Live audit of all Welcome Mails, Admin Notifications, and Client Custom Dispatches"
      icon={Mail}
      actions={
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchLogs} 
          disabled={loading}
          className="gap-2 text-xs font-semibold shadow-xs"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-amber-500" : ""} />
          Refresh
        </Button>
      }
    >
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Dispatched</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{counts.total}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Mail size={20} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Delivered Successfully</p>
                  <p className="text-2xl font-black text-emerald-600 mt-1">{counts.sent}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Failed Deliveries</p>
                  <p className="text-2xl font-black text-rose-600 mt-1">{counts.failed}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                  <AlertCircle size={20} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Welcome Clients</p>
                  <p className="text-2xl font-black text-amber-500 mt-1">{counts.welcome}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search & Filters */}
          <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
            <CardContent className="p-4 flex flex-col md:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Search recipient email, subject, sender..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-9 h-10 bg-slate-50 dark:bg-slate-800/60"
                />
              </div>

              <div className="flex w-full md:w-auto items-center gap-2">
                <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1); }}>
                  <SelectTrigger className="w-full md:w-44 h-10">
                    <Filter size={14} className="mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Email Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Email Types</SelectItem>
                    <SelectItem value="welcome_client">Welcome Mail</SelectItem>
                    <SelectItem value="admin_alert">Admin Alert</SelectItem>
                    <SelectItem value="custom_admin">Custom Mail</SelectItem>
                    <SelectItem value="test_smtp">Test SMTP</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
                  <SelectTrigger className="w-full md:w-36 h-10">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Logs Table */}
          <Card className="border-border bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
            <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Email Dispatch History</CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Showing {logs.length} of {counts.total} logged messages
                </CardDescription>
              </div>
            </CardHeader>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-slate-50/60 dark:bg-slate-800/40 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    <th className="py-3 px-4">Recipient</th>
                    <th className="py-3 px-4">Email Type</th>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Sender User</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-muted-foreground">
                        <RefreshCw size={24} className="animate-spin text-amber-500 mx-auto mb-2" />
                        Fetching live email activity...
                      </td>
                    </tr>
                  ) : logs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-muted-foreground">
                        <Mail size={32} className="mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                        No email activity recorded matching your filters.
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">
                          <div className="truncate max-w-[200px]" title={log.recipient_email}>
                            {log.recipient_email}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          {renderTypeBadge(log.email_type)}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 max-w-xs truncate" title={log.subject}>
                          {log.subject || "—"}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-muted-foreground font-mono truncate max-w-[150px]">
                          {log.sender_email || "System SMTP"}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-muted-foreground whitespace-nowrap">
                          {fmtDate(log.created_at)}
                        </td>
                        <td className="py-3.5 px-4">
                          {renderStatusBadge(log.status)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setViewingLog(log)}
                            className="h-8 px-2.5 text-xs text-amber-600 hover:text-amber-700 dark:text-amber-400 gap-1.5"
                          >
                            <Eye size={14} /> Preview
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span>Page {page} of {totalPages}</span>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={page <= 1} 
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="h-8 gap-1"
                  >
                    <ChevronLeft size={14} /> Prev
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={page >= totalPages} 
                    onClick={() => setPage((p) => p + 1)}
                    className="h-8 gap-1"
                  >
                    Next <ChevronRight size={14} />
                  </Button>
                </div>
              </div>
            )}
          </Card>

      {/* Email Preview Dialog */}
      <Dialog open={!!viewingLog} onOpenChange={(o) => !o && setViewingLog(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <div className="flex items-center gap-2">
              {viewingLog && renderTypeBadge(viewingLog.email_type)}
              <DialogTitle className="text-lg font-bold">Email Details</DialogTitle>
            </div>
            <DialogDescription className="text-xs">
              Delivery metadata and rendered content
            </DialogDescription>
          </DialogHeader>

          {viewingLog && (
            <div className="space-y-4 overflow-y-auto flex-1 pr-1 text-sm">
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-border text-xs">
                <div>
                  <span className="text-muted-foreground font-semibold">To:</span>
                  <p className="font-mono text-foreground font-medium mt-0.5">{viewingLog.recipient_email}</p>
                </div>
                <div>
                  <span className="text-muted-foreground font-semibold">From Account:</span>
                  <p className="font-mono text-foreground font-medium mt-0.5">{viewingLog.sender_email || "Default SMTP"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground font-semibold">Status:</span>
                  <div className="mt-0.5">{renderStatusBadge(viewingLog.status)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground font-semibold">Delivered At:</span>
                  <p className="text-foreground font-medium mt-0.5">{fmtDate(viewingLog.created_at)}</p>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Subject Line</span>
                <p className="font-medium text-slate-900 dark:text-white mt-1 p-2.5 rounded-lg border border-border bg-slate-50 dark:bg-slate-800/40">
                  {viewingLog.subject}
                </p>
              </div>

              {viewingLog.error_message && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-lg">
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-400 block mb-1">Failure Reason:</span>
                  <p className="text-xs font-mono text-rose-800 dark:text-rose-300">{viewingLog.error_message}</p>
                </div>
              )}

              {viewingLog.body_html && (
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Rendered HTML Preview</span>
                  <div 
                    className="mt-1.5 p-4 rounded-xl border border-border bg-white dark:bg-slate-950 max-h-72 overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: viewingLog.body_html }}
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter className="border-t border-border pt-3">
            <Button variant="outline" onClick={() => setViewingLog(null)}>Close Preview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default EmailLogs;
