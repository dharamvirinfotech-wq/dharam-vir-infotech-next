import { useState, useEffect } from "react";
import {
  FileText,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  ExternalLink,
  Eye,
  Trash2,
  Phone,
  Mail,
  Briefcase,
  DollarSign,
  Calendar,
  Filter,
  Loader2,
  RefreshCw,
  UserCheck,
  Award,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { jobsApi } from "@/lib/api";
import { useRouter } from "next/router";

const statusColors = {
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  reviewed: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
  shortlisted: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
  rejected: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
  hired: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
};

export default function JobApplications() {
  const router = useRouter();
  const { job_id: queryJobId } = router.query;

  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterJob, setFilterJob] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedApp, setSelectedApp] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [editStatus, setEditStatus] = useState("pending");
  const [adminNotes, setAdminNotes] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [appsRes, jobsRes] = await Promise.allSettled([
        jobsApi.listApplications(),
        jobsApi.listAdmin(),
      ]);

      if (appsRes.status === "fulfilled" && appsRes.value?.data) {
        setApplications(appsRes.value.data);
      }
      if (jobsRes.status === "fulfilled" && jobsRes.value?.data) {
        setJobs(jobsRes.value.data);
      }
    } catch (err) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (queryJobId) {
      setFilterJob(String(queryJobId));
    }
  }, [queryJobId]);

  const openDetail = (app) => {
    setSelectedApp(app);
    setEditStatus(app.status || "pending");
    setAdminNotes(app.admin_notes || "");
    setDetailModalOpen(true);
  };

  const handleUpdateStatusAndNotes = async () => {
    if (!selectedApp) return;
    setStatusUpdateLoading(true);
    try {
      await jobsApi.updateApplication(selectedApp.id, {
        status: editStatus,
        admin_notes: adminNotes,
      });

      setApplications((prev) =>
        prev.map((a) =>
          a.id === selectedApp.id
            ? { ...a, status: editStatus, admin_notes: adminNotes }
            : a
        )
      );
      setSelectedApp((prev) => ({
        ...prev,
        status: editStatus,
        admin_notes: adminNotes,
      }));
      toast.success("Application status updated");
      setDetailModalOpen(false);
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete application from ${name}?`)) return;
    try {
      await jobsApi.removeApplication(id);
      toast.success("Application removed");
      setApplications((prev) => prev.filter((a) => a.id !== id));
      if (selectedApp?.id === id) setDetailModalOpen(false);
    } catch (err) {
      toast.error("Failed to delete application");
    }
  };

  const filteredApps = applications.filter((app) => {
    const q = searchQuery.toLowerCase().trim();
    const matchQ =
      !q ||
      app.full_name?.toLowerCase().includes(q) ||
      app.email?.toLowerCase().includes(q) ||
      app.phone?.toLowerCase().includes(q) ||
      app.job_title?.toLowerCase().includes(q);

    const matchJob =
      filterJob === "all" || String(app.job_id) === String(filterJob);
    const matchStatus =
      filterStatus === "all" || app.status === filterStatus;

    return matchQ && matchJob && matchStatus;
  });

  const getResumeUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    const backendBase =
      process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
      "http://localhost:4000";
    return `${backendBase}${url}`;
  };

  return (
    <AdminLayout
      title="Candidate Applications"
      subtitle="Review submissions, inspect resumes, and update recruitment pipeline statuses"
      icon={FileText}
      actions={
        <Button
          variant="outline"
          onClick={loadData}
          className="border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
        >
          <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      }
    >
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Applications
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {applications.length}
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Pending Review
              </p>
              <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                {applications.filter((a) => a.status === "pending").length}
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Shortlisted
              </p>
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                {applications.filter((a) => a.status === "shortlisted").length}
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Hired
              </p>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {applications.filter((a) => a.status === "hired").length}
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-3">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate name, email, phone, or position..."
              className="pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Select value={filterJob} onValueChange={setFilterJob}>
              <SelectTrigger className="w-[180px] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs">
                <SelectValue placeholder="Filter by Job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {jobs.map((j) => (
                  <SelectItem key={j.id} value={String(j.id)}>
                    {j.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900 overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-500 mb-2" />
              <p className="text-xs text-slate-500 font-semibold">
                Loading applications...
              </p>
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="py-16 text-center">
              <FileText className="w-10 h-10 mx-auto text-slate-300 mb-3" />
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No Applications Found
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No candidate has applied under these filter options yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Applicant Info</th>
                    <th className="py-3 px-4">Applied Position</th>
                    <th className="py-3 px-4">Exp & Salary</th>
                    <th className="py-3 px-4">Resume</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Applied On</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {filteredApps.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50/75 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            {app.full_name}
                          </p>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" /> {app.email}
                          </p>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" /> {app.phone}
                          </p>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {app.job_title || "General Application"}
                          </span>
                          {app.job_slug && (
                            <span className="text-[10px] text-slate-400 font-mono">
                              /{app.job_slug}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                        <div className="space-y-0.5">
                          <p className="font-medium text-[11px]">
                            {app.experience || "N/A"}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Exp. CTC: {app.expected_salary || "Not specified"}
                          </p>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        {app.resume_url ? (
                          <a
                            href={getResumeUrl(app.resume_url)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition-colors"
                          >
                            <Download className="w-3 h-3" /> View CV
                          </a>
                        ) : (
                          <span className="text-slate-400 text-[11px]">
                            No file
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                            statusColors[app.status] || statusColors.pending
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                        {app.created_at
                          ? new Date(app.created_at).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "N/A"}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDetail(app)}
                            className="h-8 text-[11px] font-bold text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" /> Review
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(app.id, app.full_name)}
                            className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-slate-200 dark:border-slate-700"
                            title="Delete application"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Candidate Dialog */}
      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>Candidate Application Review</span>
              {selectedApp && (
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                    statusColors[selectedApp.status] || statusColors.pending
                  }`}
                >
                  {selectedApp.status}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedApp && (
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Candidate Name
                  </span>
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    {selectedApp.full_name}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Applied Position
                  </span>
                  <span className="font-bold text-sm text-amber-600 dark:text-amber-400">
                    {selectedApp.job_title}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${selectedApp.email}`}
                    className="font-medium text-slate-700 dark:text-slate-300 hover:text-accent"
                  >
                    {selectedApp.email}
                  </a>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Phone Number
                  </span>
                  <a
                    href={`tel:${selectedApp.phone}`}
                    className="font-medium text-slate-700 dark:text-slate-300 hover:text-accent"
                  >
                    {selectedApp.phone}
                  </a>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Total Experience
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {selectedApp.experience}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Expected Salary / CTC
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {selectedApp.expected_salary || "Not specified"}
                  </span>
                </div>

                {selectedApp.portfolio_url && (
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Portfolio / Profile URL
                    </span>
                    <a
                      href={selectedApp.portfolio_url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-accent hover:underline inline-flex items-center gap-1"
                    >
                      {selectedApp.portfolio_url} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {selectedApp.cover_letter && (
                <div className="space-y-1">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Cover Letter / Candidate Note
                  </Label>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap border border-slate-100 dark:border-slate-700">
                    {selectedApp.cover_letter}
                  </div>
                </div>
              )}

              {selectedApp.resume_url && (
                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Uploaded Resume Document
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Candidate CV submitted via application form
                      </p>
                    </div>
                  </div>
                  <a
                    href={getResumeUrl(selectedApp.resume_url)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-600 transition-colors inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" /> Download / Open
                  </a>
                </div>
              )}

              {/* Status & Recruitment Notes Form */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-wider">
                      Recruitment Pipeline Status
                    </Label>
                    <Select value={editStatus} onValueChange={setEditStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="hired">Hired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider">
                    Internal Admin & Interview Notes
                  </Label>
                  <Textarea
                    rows={3}
                    placeholder="Enter notes about phone screening, technical evaluation, salary negotiations..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDetailModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  disabled={statusUpdateLoading}
                  onClick={handleUpdateStatusAndNotes}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                >
                  {statusUpdateLoading && (
                    <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                  )}
                  Save Status & Notes
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
