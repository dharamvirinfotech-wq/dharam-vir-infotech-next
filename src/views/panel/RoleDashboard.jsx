import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/router-compat";
import PanelLayout from "@/components/panel/PanelLayout";
import { useAuth } from "@/context/AuthContext";
import { getPanelConfig } from "@/config/rolePanels";
import { Users, Briefcase, FolderKanban, ClipboardList, DollarSign, TrendingUp, CheckCircle2, Clock, Mail, Receipt, } from "lucide-react";
const statsByRole = {
    admin: [
        { label: "Total Users", value: "1,245", change: "+8.3%", icon: Users, color: "bg-blue-500/10 text-blue-600" },
        { label: "Inquiries", value: "342", change: "+12%", icon: Mail, color: "bg-amber-500/10 text-amber-600" },
        { label: "Revenue", value: "$48,290", change: "+15.2%", icon: DollarSign, color: "bg-green-500/10 text-green-600" },
        { label: "Active Projects", value: "38", change: "+3", icon: TrendingUp, color: "bg-purple-500/10 text-purple-600" },
    ],
    editor: [
        { label: "Pages", value: "84", icon: FolderKanban, color: "bg-blue-500/10 text-blue-600" },
        { label: "Drafts", value: "12", icon: ClipboardList, color: "bg-amber-500/10 text-amber-600" },
        { label: "Inquiries", value: "27", icon: Mail, color: "bg-purple-500/10 text-purple-600" },
        { label: "Published Today", value: "4", icon: CheckCircle2, color: "bg-green-500/10 text-green-600" },
    ],
    employee: [
        { label: "Open Tasks", value: "9", icon: ClipboardList, color: "bg-blue-500/10 text-blue-600" },
        { label: "Completed", value: "47", change: "this month", icon: CheckCircle2, color: "bg-green-500/10 text-green-600" },
        { label: "Hours Logged", value: "128", change: "this month", icon: Clock, color: "bg-amber-500/10 text-amber-600" },
        { label: "Projects", value: "5", icon: FolderKanban, color: "bg-purple-500/10 text-purple-600" },
    ],
    employer: [
        { label: "Active Jobs", value: "7", icon: Briefcase, color: "bg-blue-500/10 text-blue-600" },
        { label: "New Candidates", value: "32", change: "+5", icon: Users, color: "bg-amber-500/10 text-amber-600" },
        { label: "Hired Team", value: "12", icon: CheckCircle2, color: "bg-green-500/10 text-green-600" },
        { label: "Monthly Spend", value: "$8,450", icon: DollarSign, color: "bg-purple-500/10 text-purple-600" },
    ],
    client: [
        { label: "Active Projects", value: "3", icon: FolderKanban, color: "bg-blue-500/10 text-blue-600" },
        { label: "Pending Invoices", value: "2", icon: Receipt, color: "bg-amber-500/10 text-amber-600" },
        { label: "Open Tickets", value: "1", icon: Mail, color: "bg-purple-500/10 text-purple-600" },
        { label: "Total Paid", value: "$12,800", icon: DollarSign, color: "bg-green-500/10 text-green-600" },
    ],
    developer: [
        { label: "Assignments", value: "4", icon: ClipboardList, color: "bg-blue-500/10 text-blue-600" },
        { label: "Hours This Week", value: "32", icon: Clock, color: "bg-amber-500/10 text-amber-600" },
        { label: "Completed Tasks", value: "18", icon: CheckCircle2, color: "bg-green-500/10 text-green-600" },
        { label: "Projects", value: "3", icon: FolderKanban, color: "bg-purple-500/10 text-purple-600" },
    ],
    user: [
        { label: "Inquiries Sent", value: "2", icon: Mail, color: "bg-blue-500/10 text-blue-600" },
        { label: "Saved Items", value: "5", icon: CheckCircle2, color: "bg-amber-500/10 text-amber-600" },
    ],
};
const RoleDashboard = () => {
    const { user } = useAuth();
    const role = user?.role || "user";
    const config = getPanelConfig(role);
    const stats = statsByRole[role] ?? statsByRole.user;
    return (<PanelLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary">{config.title}</h2>
        <p className="text-sm text-muted-foreground">{config.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (<Card key={stat.label} className="border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
                  {stat.change && (<p className="text-xs text-green-600 font-medium mt-1">{stat.change}</p>)}
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={22}/>
                </div>
              </div>
            </CardContent>
          </Card>))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border-border">
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {config.links.slice(1, 5).map((l) => (<Button key={l.href} asChild variant="outline" className="w-full justify-start gap-2 text-sm">
                <Link to={l.href}>
                  <l.icon size={16}/> {l.label}
                </Link>
              </Button>))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-border">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border">
              {[
            { title: "Profile updated", time: "2 hours ago" },
            { title: "Logged in from new device", time: "Yesterday" },
            { title: "Welcome to your portal!", time: "Account created" },
        ].map((item, i) => (<li key={i} className="py-3 flex items-center justify-between text-sm">
                  <span className="text-foreground">{item.title}</span>
                  <span className="text-muted-foreground text-xs">{item.time}</span>
                </li>))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </PanelLayout>);
};
export default RoleDashboard;
