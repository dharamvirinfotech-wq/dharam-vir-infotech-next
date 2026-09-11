import { useEffect, useState } from "react";
import { 
  TrendingUp, Eye, UserPlus, DollarSign, BarChart3, Globe, Bell, 
  FileText, Users, Settings, Mail, ArrowUpRight, CheckCircle2, 
  Clock, ShieldCheck, Send 
} from "lucide-react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { contactApi, emailApi } from "@/lib/api";

const Dashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [inquiryCounts, setInquiryCounts] = useState({ total: 0, new_count: 0, replied_count: 0 });
  const [emailCounts, setEmailCounts] = useState({ total: 0, sent: 0, failed: 0, welcome: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverview = async () => {
      setLoading(true);
      try {
        const [inqRes, emailRes] = await Promise.allSettled([
          contactApi.list({ limit: 5 }),
          emailApi.getLogs({ limit: 1 }),
        ]);

        if (inqRes.status === "fulfilled" && inqRes.value) {
          setInquiries(inqRes.value.inquiries?.slice(0, 5) || []);
          setInquiryCounts({
            total: Number(inqRes.value.counts?.total) || 0,
            new_count: Number(inqRes.value.counts?.new_count) || 0,
            replied_count: Number(inqRes.value.counts?.replied_count) || 0,
          });
        }

        if (emailRes.status === "fulfilled" && emailRes.value?.counts) {
          setEmailCounts(emailRes.value.counts);
        }
      } catch (err) {
        console.error("Dashboard overview fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, []);

  const stats = [
    {
      label: "Total Leads Received",
      value: inquiryCounts.total.toString(),
      change: "+18.2%",
      icon: Users,
      color: "bg-blue-500/10 text-blue-600",
      link: "/admin/inquiries",
    },
    {
      label: "New Leads (Action Needed)",
      value: inquiryCounts.new_count.toString(),
      change: inquiryCounts.new_count > 0 ? "Requires Review" : "All Caught Up",
      icon: Mail,
      color: "bg-amber-500/10 text-amber-600",
      link: "/admin/inquiries",
    },
    {
      label: "Emails Dispatched",
      value: emailCounts.total.toString(),
      change: `${emailCounts.sent} Delivered`,
      icon: Send,
      color: "bg-emerald-500/10 text-emerald-600",
      link: "/admin/email-logs",
    },
    {
      label: "Auto-Welcome Mails",
      value: emailCounts.welcome.toString(),
      change: "100% automated",
      icon: ShieldCheck,
      color: "bg-purple-500/10 text-purple-600",
      link: "/admin/email-logs",
    },
  ];

  return (
    <AdminLayout
      title="Admin Command Center"
      subtitle="Welcome back, Super Administrator"
      actions={
        <Link href="/admin/email-logs">
          <Button variant="outline" size="sm" className="hidden sm:flex text-xs font-semibold gap-1.5 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10">
            <Mail size={14} />
            <span>Live Email Logs</span>
          </Button>
        </Link>
      }
    >
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Link key={stat.label} href={stat.link}>
                <Card className="border-border bg-white dark:bg-slate-900 shadow-xs hover:shadow-md hover:border-amber-500/40 transition-all cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white mt-1.5">{stat.value}</p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
                          <ArrowUpRight size={13} /> {stat.change}
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                        <stat.icon size={22} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Quick Links + Email System Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 border-border bg-white dark:bg-slate-900 shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Quick Actions</CardTitle>
                <CardDescription className="text-xs">Direct navigation to administrative tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/admin/inquiries" className="block">
                  <Button variant="outline" className="w-full justify-between text-xs font-semibold h-10 hover:bg-amber-500/10 hover:text-amber-600 hover:border-amber-500/30">
                    <span className="flex items-center gap-2"><Mail size={15} /> Manage Client Inquiries</span>
                    <ArrowUpRight size={14} className="text-muted-foreground" />
                  </Button>
                </Link>
                <Link href="/admin/email-logs" className="block">
                  <Button variant="outline" className="w-full justify-between text-xs font-semibold h-10 hover:bg-amber-500/10 hover:text-amber-600 hover:border-amber-500/30">
                    <span className="flex items-center gap-2"><Send size={15} /> Review Email Logs</span>
                    <ArrowUpRight size={14} className="text-muted-foreground" />
                  </Button>
                </Link>
                <Link href="/admin/settings" className="block">
                  <Button variant="outline" className="w-full justify-between text-xs font-semibold h-10 hover:bg-amber-500/10 hover:text-amber-600 hover:border-amber-500/30">
                    <span className="flex items-center gap-2"><Settings size={15} /> SMTP Email Settings</span>
                    <ArrowUpRight size={14} className="text-muted-foreground" />
                  </Button>
                </Link>
                <Link href="/admin/developers" className="block">
                  <Button variant="outline" className="w-full justify-between text-xs font-semibold h-10 hover:bg-amber-500/10 hover:text-amber-600 hover:border-amber-500/30">
                    <span className="flex items-center gap-2"><Users size={15} /> Developers Directory</span>
                    <ArrowUpRight size={14} className="text-muted-foreground" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 border-border bg-white dark:bg-slate-900 shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Automated Client Communication Engine</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                    <CheckCircle2 size={12} /> Active
                  </span>
                </CardTitle>
                <CardDescription className="text-xs">
                  Whenever a visitor reaches out through the contact form:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                      <Mail size={16} /> 1. Client Welcome Email
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Sent automatically to the client's inbox confirming receipt, presenting Dharam Vir Infotech's credentials, and outlining next steps.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-2">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                      <Bell size={16} /> 2. Admin Alert Dispatch
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Immediately alerts the Admin with full lead details (name, email, phone, message) so no client inquiry is missed.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span>Current Sender: <strong className="text-slate-800 dark:text-slate-200">mukesh.vin99@gmail.com</strong></span>
                  <Link href="/admin/settings" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
                    Manage Sender Credentials →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Inquiries Table */}
          <Card className="border-border bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Recent Client Inquiries</CardTitle>
                <CardDescription className="text-xs">Latest messages submitted across web forms</CardDescription>
              </div>
              <Link href="/admin/inquiries">
                <Button variant="ghost" size="sm" className="text-amber-600 dark:text-amber-400 text-xs font-semibold gap-1">
                  View All ({inquiryCounts.total}) <ArrowUpRight size={13} />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-slate-50/60 dark:bg-slate-800/40 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      <th className="py-3 px-4">Client Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Welcome Mail</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-xs text-muted-foreground">Loading recent inquiries...</td>
                      </tr>
                    ) : inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-xs text-muted-foreground">No recent inquiries found</td>
                      </tr>
                    ) : (
                      inquiries.map((inquiry) => (
                        <tr key={inquiry.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">{inquiry.name}</td>
                          <td className="py-3.5 px-4 text-xs text-muted-foreground font-mono">{inquiry.email}</td>
                          <td className="py-3.5 px-4 text-xs text-slate-700 dark:text-slate-300">{inquiry.service || inquiry.subject || "General Inquiry"}</td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100/70 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                              <CheckCircle2 size={12} /> Auto-Sent
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              inquiry.status === "new"
                                ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                                : inquiry.status === "replied"
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                                : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                            }`}>
                              {inquiry.status === "new" ? "New Lead" : inquiry.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
    </AdminLayout>
  );
};

export default Dashboard;
