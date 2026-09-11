import { useState, useEffect } from "react";
import {
  Globe,
  Search,
  Monitor,
  Smartphone,
  Tablet,
  MapPin,
  Clock,
  Activity,
  Trash2,
  RefreshCw,
  Loader2,
  ShieldCheck,
  TrendingUp,
  Compass,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { visitorsApi } from "@/lib/api";

export default function UniqueVisitors() {
  const [visitors, setVisitors] = useState([]);
  const [stats, setStats] = useState({
    total_unique: 0,
    total_visits: 0,
    desktop_count: 0,
    mobile_count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDevice, setFilterDevice] = useState("all");

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const res = await visitorsApi.list();
      if (res && res.data) {
        setVisitors(res.data);
        if (res.stats) {
          setStats(res.stats);
        } else {
          // Compute client-side fallback
          const totalVisits = res.data.reduce(
            (acc, curr) => acc + (Number(curr.visit_count) || 1),
            0
          );
          const desktop = res.data.filter(
            (v) => v.device_type === "Desktop"
          ).length;
          const mobile = res.data.filter(
            (v) => v.device_type === "Mobile"
          ).length;
          setStats({
            total_unique: res.data.length,
            total_visits: totalVisits,
            desktop_count: desktop,
            mobile_count: mobile,
          });
        }
      }
    } catch (err) {
      toast.error("Failed to load visitor logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleDelete = async (id, visitorId) => {
    if (!confirm(`Remove visitor log ${visitorId}?`)) return;
    try {
      await visitorsApi.remove(id);
      toast.success("Visitor record removed");
      setVisitors((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      toast.error("Failed to delete record");
    }
  };

  const filteredVisitors = visitors.filter((v) => {
    const q = searchQuery.toLowerCase().trim();
    const matchQ =
      !q ||
      v.visitor_id?.toLowerCase().includes(q) ||
      v.ip_address?.toLowerCase().includes(q) ||
      v.city?.toLowerCase().includes(q) ||
      v.country?.toLowerCase().includes(q) ||
      v.browser?.toLowerCase().includes(q) ||
      v.os?.toLowerCase().includes(q) ||
      v.last_page?.toLowerCase().includes(q);

    const matchDevice =
      filterDevice === "all" ||
      v.device_type?.toLowerCase() === filterDevice.toLowerCase();

    return matchQ && matchDevice;
  });

  const getDeviceIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "mobile":
        return <Smartphone className="w-4 h-4 text-emerald-500" />;
      case "tablet":
        return <Tablet className="w-4 h-4 text-purple-500" />;
      default:
        return <Monitor className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <AdminLayout
      title="Unique Website Visitors"
      subtitle="Real-time device & location visitor tracking with guaranteed zero-duplicate fingerprinting"
      icon={Globe}
      actions={
        <Button
          variant="outline"
          onClick={fetchVisitors}
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
                Unique Visitors
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {stats.total_unique || visitors.length}
              </h3>
              <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                Zero duplicates guaranteed
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Visits / Hits
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {stats.total_visits ||
                  visitors.reduce((a, c) => a + (Number(c.visit_count) || 1), 0)}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Cumulative page sessions
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Desktop Users
              </p>
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                {stats.desktop_count ||
                  visitors.filter((v) => v.device_type === "Desktop").length}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Workstations & Laptops
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Monitor className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Mobile & Tablet
              </p>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {stats.mobile_count ||
                  visitors.filter((v) => v.device_type !== "Desktop").length}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Smartphones & Handhelds
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter Bar */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-3">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Visitor ID, IP address, city, country, browser, or page..."
              className="pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Select value={filterDevice} onValueChange={setFilterDevice}>
              <SelectTrigger className="w-[160px] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs">
                <SelectValue placeholder="Device Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Devices</SelectItem>
                <SelectItem value="desktop">Desktop</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="tablet">Tablet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Visitors Table */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900 overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-500 mb-2" />
              <p className="text-xs text-slate-500 font-semibold">
                Loading visitor data...
              </p>
            </div>
          ) : filteredVisitors.length === 0 ? (
            <div className="py-16 text-center">
              <Globe className="w-10 h-10 mx-auto text-slate-300 mb-3" />
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No Visitors Recorded
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No unique visitor matches the current search filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Visitor Fingerprint</th>
                    <th className="py-3 px-4">IP Address</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Device & OS</th>
                    <th className="py-3 px-4">Visits</th>
                    <th className="py-3 px-4">Last Active Page</th>
                    <th className="py-3 px-4">Last Seen</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {filteredVisitors.map((v) => (
                    <tr
                      key={v.id}
                      className="hover:bg-slate-50/75 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span
                            className="max-w-[140px] truncate"
                            title={v.visitor_id}
                          >
                            {v.visitor_id}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                        {v.ip_address || "127.0.0.1"}
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                        <div className="flex items-center gap-1 text-[11px]">
                          <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                          <span>
                            {[v.city, v.country].filter(Boolean).join(", ") ||
                              "Local / Direct"}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(v.device_type)}
                          <div>
                            <p className="font-semibold text-[11px]">
                              {v.device_type || "Desktop"}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {[v.browser, v.os].filter(Boolean).join(" • ") ||
                                "Browser"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          {v.visit_count || 1} hits
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                          {v.last_page || "/"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[11px] text-slate-500">
                        {v.last_seen
                          ? new Date(v.last_seen).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(v.id, v.visitor_id)}
                          className="h-7 w-7 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          title="Delete visitor record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
