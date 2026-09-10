import { useState } from "react";
import { Bell, Plus, Search, Edit, Trash2, MoreVertical, Shield } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
const initialUsers = [
    { id: 1, name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 9876543210", role: "Admin", company: "DV Infotech", status: "Active", twoFA: true, joinedDate: "2024-01-15" },
    { id: 2, name: "Priya Patel", email: "priya@example.com", phone: "+91 9876543211", role: "Editor", company: "Tech Solutions", status: "Active", twoFA: false, joinedDate: "2024-02-20" },
    { id: 3, name: "Amit Kumar", email: "amit@example.com", phone: "+91 9876543212", role: "User", company: "Web Corp", status: "Inactive", twoFA: false, joinedDate: "2024-03-10" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", phone: "+1 5551234567", role: "User", company: "Digital Agency", status: "Active", twoFA: true, joinedDate: "2024-04-05" },
    { id: 5, name: "Vikram Singh", email: "vikram@example.com", phone: "+91 9876543213", role: "Editor", company: "InfoSys", status: "Active", twoFA: false, joinedDate: "2024-05-12" },
    { id: 6, name: "Neha Gupta", email: "neha@example.com", phone: "+91 9876543214", role: "User", company: "StartUp Inc", status: "Suspended", twoFA: false, joinedDate: "2024-06-01" },
];
const emptyForm = { name: "", email: "", phone: "", role: "User", company: "", status: "Active", twoFA: false, password: "", confirmPassword: "" };
const AdminUsers = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [users, setUsers] = useState(initialUsers);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterRole, setFilterRole] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [formData, setFormData] = useState(emptyForm);
    const [editingUser, setEditingUser] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { toast } = useToast();
    const filteredUsers = users.filter((user) => {
        const matchSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchRole = filterRole === "all" || user.role === filterRole;
        const matchStatus = filterStatus === "all" || user.status === filterStatus;
        return matchSearch && matchRole && matchStatus;
    });
    const handleCreate = () => {
        setEditingUser(null);
        setFormData(emptyForm);
        setDialogOpen(true);
    };
    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email, phone: user.phone, role: user.role, company: user.company, status: user.status, twoFA: user.twoFA, password: "", confirmPassword: "" });
        setDialogOpen(true);
    };
    const handleDelete = (id) => {
        setUsers(users.filter((u) => u.id !== id));
        toast({ title: "User deleted", description: "User has been removed successfully." });
    };
    const handleSubmit = () => {
        if (!formData.name || !formData.email) {
            toast({ title: "Error", description: "Name and email are required.", variant: "destructive" });
            return;
        }
        if (!editingUser && (!formData.password || formData.password !== formData.confirmPassword)) {
            toast({ title: "Error", description: "Passwords must match.", variant: "destructive" });
            return;
        }
        if (editingUser) {
            setUsers(users.map((u) => u.id === editingUser.id ? { ...u, name: formData.name, email: formData.email, phone: formData.phone, role: formData.role, company: formData.company, status: formData.status, twoFA: formData.twoFA } : u));
            toast({ title: "User updated", description: `${formData.name} has been updated.` });
        }
        else {
            const newUser = { id: Date.now(), name: formData.name, email: formData.email, phone: formData.phone, role: formData.role, company: formData.company, status: formData.status, twoFA: formData.twoFA, joinedDate: new Date().toISOString().split("T")[0] };
            setUsers([newUser, ...users]);
            toast({ title: "User created", description: `${formData.name} has been added.` });
        }
        setDialogOpen(false);
    };
    const statusColor = (status) => {
        if (status === "Active")
            return "bg-green-500/10 text-green-600";
        if (status === "Inactive")
            return "bg-muted text-muted-foreground";
        return "bg-red-500/10 text-red-600";
    };
    return (<div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}/>

      {/* Main */}
      <main className="flex-1 min-h-screen">
        <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-primary">User Management</h1>
            <p className="text-sm text-muted-foreground">Manage all registered users</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground"><Bell size={20}/><span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">3</span></button>
            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">A</div>
          </div>
        </header>

        <div className="p-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
            <Card className="border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Total Users</p><p className="text-2xl font-bold text-primary mt-1">{users.length}</p></CardContent></Card>
            <Card className="border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Active Users</p><p className="text-2xl font-bold text-green-600 mt-1">{users.filter(u => u.status === "Active").length}</p></CardContent></Card>
            <Card className="border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Admins</p><p className="text-2xl font-bold text-accent mt-1">{users.filter(u => u.role === "Admin").length}</p></CardContent></Card>
          </div>

          {/* Toolbar */}
          <Card className="border-border mb-6">
            <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="flex gap-3 flex-1 w-full sm:w-auto">
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16}/>
                  <Input placeholder="Search users..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                </div>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-32"><SelectValue placeholder="Role"/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32"><SelectValue placeholder="Status"/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreate} className="gap-2"><Plus size={16}/> Create User</Button>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Phone</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Role</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Company</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">2FA</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Joined</th>
                      <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (<tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="py-3 px-4 font-medium text-foreground">{user.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                        <td className="py-3 px-4 text-muted-foreground">{user.phone}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-xs font-medium">
                            {user.role === "Admin" && <Shield size={12} className="text-accent"/>}
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{user.company}</td>
                        <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(user.status)}`}>{user.status}</span></td>
                        <td className="py-3 px-4"><span className={`text-xs font-medium ${user.twoFA ? "text-green-600" : "text-muted-foreground"}`}>{user.twoFA ? "Enabled" : "Disabled"}</span></td>
                        <td className="py-3 px-4 text-muted-foreground">{user.joinedDate}</td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical size={16}/></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(user)} className="gap-2"><Edit size={14}/> Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(user.id)} className="gap-2 text-destructive"><Trash2 size={14}/> Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>))}
                    {filteredUsers.length === 0 && (<tr><td colSpan={9} className="py-12 text-center text-muted-foreground">No users found.</td></tr>)}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Create/Edit User Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit User" : "Create New User"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe"/>
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com"/>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 9876543210"/>
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Company Name"/>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {!editingUser && (<div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Password *</Label>
                  <Input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="••••••••"/>
                </div>
                <div className="space-y-2">
                  <Label>Confirm Password *</Label>
                  <Input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="••••••••"/>
                </div>
              </div>)}
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-xs text-muted-foreground">Enable 2FA for extra security</p>
              </div>
              <Switch checked={formData.twoFA} onCheckedChange={(v) => setFormData({ ...formData, twoFA: v })}/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleSubmit}>{editingUser ? "Update User" : "Create User"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);
};
export default AdminUsers;
