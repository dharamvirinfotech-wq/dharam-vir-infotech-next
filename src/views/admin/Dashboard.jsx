import { useState } from "react";
import { TrendingUp, Eye, UserPlus, DollarSign, BarChart3, Globe, Bell, FileText, Users, Settings } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const stats = [
    { label: "Total Visitors", value: "24,589", change: "+12.5%", icon: Eye, color: "bg-blue-500/10 text-blue-600" },
    { label: "New Users", value: "1,245", change: "+8.3%", icon: UserPlus, color: "bg-green-500/10 text-green-600" },
    { label: "Revenue", value: "$48,290", change: "+15.2%", icon: DollarSign, color: "bg-amber-500/10 text-amber-600" },
    { label: "Active Projects", value: "38", change: "+3", icon: TrendingUp, color: "bg-purple-500/10 text-purple-600" },
];
const recentInquiries = [
    { name: "Rahul Sharma", email: "rahul@example.com", subject: "Web Development", date: "2 hours ago", status: "New" },
    { name: "Priya Patel", email: "priya@example.com", subject: "Mobile App", date: "5 hours ago", status: "Replied" },
    { name: "Amit Kumar", email: "amit@example.com", subject: "SEO Services", date: "1 day ago", status: "New" },
    { name: "Sarah Wilson", email: "sarah@example.com", subject: "AI Development", date: "2 days ago", status: "Closed" },
];
const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (<div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}/>

      {/* Main content */}
      <main className="flex-1 min-h-screen">
        {/* Top bar */}
        <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground">
              <Bell size={20}/>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">A</div>
          </div>
        </header>

        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {stats.map((stat) => (<Card key={stat.label} className="border-border">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
                      <p className="text-xs text-green-600 font-medium mt-1">{stat.change}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <stat.icon size={22}/>
                    </div>
                  </div>
                </CardContent>
              </Card>))}
          </div>

          {/* Quick Actions + Traffic */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-1 border-border">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2 text-sm"><FileText size={16}/> Manage Pages</Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-sm"><Users size={16}/> View Users</Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-sm"><Globe size={16}/> View Website</Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-sm"><Settings size={16}/> Site Settings</Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 border-border">
              <CardHeader>
                <CardTitle className="text-base">Website Traffic Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="mx-auto text-muted-foreground mb-2" size={40}/>
                    <p className="text-sm text-muted-foreground">Traffic chart will be available with analytics integration</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Inquiries */}
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Recent Inquiries</CardTitle>
              <Button variant="ghost" size="sm" className="text-accent text-xs">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Name</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Email</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Subject</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInquiries.map((inquiry, idx) => (<tr key={idx} className="border-b border-border last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-2 font-medium text-foreground">{inquiry.name}</td>
                        <td className="py-3 px-2 text-muted-foreground">{inquiry.email}</td>
                        <td className="py-3 px-2 text-foreground">{inquiry.subject}</td>
                        <td className="py-3 px-2 text-muted-foreground">{inquiry.date}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${inquiry.status === "New" ? "bg-accent/10 text-accent" :
                inquiry.status === "Replied" ? "bg-blue-500/10 text-blue-600" :
                    "bg-muted text-muted-foreground"}`}>
                            {inquiry.status}
                          </span>
                        </td>
                      </tr>))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>);
};
export default Dashboard;
