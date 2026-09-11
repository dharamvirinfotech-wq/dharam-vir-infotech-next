import { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Users,
  Clock,
  MapPin,
  DollarSign,
  Loader2,
  RefreshCw,
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

const emptyJobForm = {
  title: "",
  slug: "",
  department: "Software Development",
  location: "Bhopal, India / Hybrid",
  type: "Full-time",
  experience: "2-4 Years",
  salary: "Best in Industry",
  description: "",
  skills: "",
  requirements: "",
  responsibilities: "",
  is_active: 1,
};

const toList = (s) =>
  Array.isArray(s)
    ? s
    : s
    ? s
        .split(/[\n,]+/)
        .map((x) => x.trim())
        .filter(Boolean)
    : [];

export default function JobPostings() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState(emptyJobForm);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await jobsApi.listAdmin();
      if (res && res.data) {
        setJobs(res.data);
      }
    } catch (err) {
      toast.error("Failed to load job postings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openCreateDialog = () => {
    setEditingJob(null);
    setFormData(emptyJobForm);
    setDialogOpen(true);
  };

  const openEditDialog = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || "",
      slug: job.slug || "",
      department: job.department || "Software Development",
      location: job.location || "",
      type: job.type || "Full-time",
      experience: job.experience || "",
      salary: job.salary || "",
      description: job.description || "",
      skills: Array.isArray(job.skills) ? job.skills.join(", ") : job.skills || "",
      requirements: Array.isArray(job.requirements)
        ? job.requirements.join("\n")
        : job.requirements || "",
      responsibilities: Array.isArray(job.responsibilities)
        ? job.responsibilities.join("\n")
        : job.responsibilities || "",
      is_active: job.is_active ? 1 : 0,
    });
    setDialogOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.department) {
      toast.error("Title and Department are required");
      return;
    }

    setSaving(true);
    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim() || undefined,
      department: formData.department.trim(),
      location: formData.location.trim(),
      type: formData.type,
      experience: formData.experience.trim(),
      salary: formData.salary.trim(),
      description: formData.description.trim(),
      skills: toList(formData.skills),
      requirements: toList(formData.requirements),
      responsibilities: toList(formData.responsibilities),
      is_active: Number(formData.is_active),
    };

    try {
      if (editingJob) {
        const res = await jobsApi.update(editingJob.id, payload);
        toast.success("Job posting updated successfully");
        setJobs((prev) =>
          prev.map((j) => (j.id === editingJob.id ? { ...j, ...payload } : j))
        );
      } else {
        const res = await jobsApi.create(payload);
        toast.success("Job posting created successfully");
        fetchJobs();
      }
      setDialogOpen(false);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to save job posting";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await jobsApi.remove(id);
      toast.success("Job posting deleted");
      setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      toast.error("Failed to delete job posting");
    }
  };

  const toggleStatus = async (job) => {
    const isCurrentlyActive = Boolean(job.is_active || job.status === "active");
    const nextActive = !isCurrentlyActive;
    const nextStatus = nextActive ? "active" : "draft";
    try {
      await jobsApi.update(job.id, {
        status: nextStatus,
        is_active: nextActive ? 1 : 0,
      });
      setJobs((prev) =>
        prev.map((j) =>
          j.id === job.id
            ? { ...j, status: nextStatus, is_active: nextActive ? 1 : 0 }
            : j
        )
      );
      toast.success(
        `Job is now ${
          nextActive ? "Live / Active (Visible on Career page)" : "Draft (Hidden from Career page)"
        }`
      );
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const filteredJobs = jobs.filter((j) => {
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      j.title?.toLowerCase().includes(q) ||
      j.department?.toLowerCase().includes(q) ||
      j.location?.toLowerCase().includes(q);
    const matchDept = filterDept === "all" || j.department === filterDept;
    const isActive = Boolean(j.is_active || j.status === "active");
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && isActive) ||
      (filterStatus === "inactive" && !isActive);
    return matchQuery && matchDept && matchStatus;
  });

  const departments = Array.from(
    new Set(jobs.map((j) => j.department).filter(Boolean))
  );

  return (
    <AdminLayout
      title="Job Postings Management"
      subtitle="Create, edit, and publish dynamic openings directly on the Career page"
      icon={Briefcase}
      actions={
        <Button
          onClick={openCreateDialog}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Post New Job
        </Button>
      }
    >
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Postings
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {jobs.length}
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Active & Live
              </p>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {jobs.filter((j) => j.is_active || j.status === "active").length}
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Inactive / Draft
              </p>
              <h3 className="text-2xl font-bold text-slate-500 mt-1">
                {jobs.filter((j) => !j.is_active && j.status !== "active").length}
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center">
              <XCircle className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card
          onClick={() => router.push("/admin/job-applications")}
          className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900 cursor-pointer hover:border-amber-400 transition-colors"
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Manage Applications
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-500 mt-1">
                View All <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter & Search Toolbar */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-3">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, department, or location..."
              className="pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Select value={filterDept} onValueChange={setFilterDept}>
              <SelectTrigger className="w-[180px] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={fetchJobs}
              className="shrink-0 border-slate-200 dark:border-slate-700"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List / Table */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900 overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-500 mb-2" />
              <p className="text-xs text-slate-500 font-semibold">
                Loading job postings...
              </p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="py-16 text-center">
              <Briefcase className="w-10 h-10 mx-auto text-slate-300 mb-3" />
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No Job Postings Found
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No jobs match the current criteria. Click "Post New Job" above to
                create a new career opportunity.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Position & Role</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Type & Exp</th>
                    <th className="py-3 px-4">Location & Salary</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {filteredJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-slate-50/75 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-amber-500 cursor-pointer">
                            {job.title}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            /{job.slug}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          {job.department}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" /> {job.type}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Exp: {job.experience || "Any"}
                          </p>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                        <div className="space-y-0.5">
                          <p className="flex items-center gap-1 text-[11px]">
                            <MapPin className="w-3 h-3 text-amber-500" />{" "}
                            {job.location}
                          </p>
                          <p className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                            <DollarSign className="w-3 h-3 text-emerald-500" />{" "}
                            {job.salary || "Competitive"}
                          </p>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleStatus(job)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-xs ${
                            job.is_active || job.status === "active"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/30"
                          }`}
                          title="Click to toggle Live (Visible on Career page) / Draft (Hidden)"
                        >
                          {job.is_active || job.status === "active" ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Live
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" /> Draft
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              router.push(
                                `/admin/job-applications?job_id=${job.id}`
                              )
                            }
                            className="h-8 text-[11px] font-bold text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                            title="View candidate applications for this job"
                          >
                            <Users className="w-3.5 h-3.5 mr-1" /> Candidates
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => openEditDialog(job)}
                            className="h-8 w-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                            title="Edit job posting"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(job.id, job.title)}
                            className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-slate-200 dark:border-slate-700"
                            title="Delete job posting"
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

      {/* Create / Edit Modal Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-500" />
              {editingJob ? "Edit Job Posting" : "Create New Job Posting"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs font-bold uppercase tracking-wider">
                  Job Title *
                </Label>
                <Input
                  required
                  placeholder="e.g. Senior Full Stack Engineer (React + Node.js)"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider">
                  Slug (Optional URL key)
                </Label>
                <Input
                  placeholder="e.g. full-stack-developer"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider">
                  Department *
                </Label>
                <Input
                  required
                  placeholder="e.g. Frontend Engineering, Backend, Mobile"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider">
                  Job Type
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(val) => setFormData({ ...formData, type: val })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider">
                  Experience Required
                </Label>
                <Input
                  placeholder="e.g. 3-5 Years"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider">
                  Location
                </Label>
                <Input
                  placeholder="e.g. Bhopal, India / Hybrid or Remote"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider">
                  Salary / Package
                </Label>
                <Input
                  placeholder="e.g. ₹6-12 LPA or Best in Industry"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-wider">
                Job Overview / Description
              </Label>
              <Textarea
                rows={3}
                placeholder="Describe the mission, objectives and what the engineer will build..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-wider">
                Skills / Tech Stack (Comma separated)
              </Label>
              <Input
                placeholder="React, Next.js, Node.js, TypeScript, PostgreSQL, Tailwind"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider">
                  Key Responsibilities (One per line)
                </Label>
                <Textarea
                  rows={4}
                  placeholder="Architect scalable frontends&#10;Collaborate with cross-functional teams&#10;Conduct code reviews"
                  value={formData.responsibilities}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      responsibilities: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider">
                  Requirements & Qualifications (One per line)
                </Label>
                <Textarea
                  rows={4}
                  placeholder="3+ years of production experience&#10;Proficiency in TypeScript & modern CSS&#10;Strong problem solving skills"
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="is_active_chk"
                checked={Boolean(formData.is_active)}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })
                }
                className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400"
              />
              <Label htmlFor="is_active_chk" className="text-xs font-semibold cursor-pointer">
                Publish immediately on Career page (Active)
              </Label>
            </div>

            <DialogFooter className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin mr-1.5" />}
                {editingJob ? "Save Changes" : "Create Posting"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
