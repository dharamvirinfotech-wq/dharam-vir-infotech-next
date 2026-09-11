import { useState } from "react";
import { Bell, Plus, Search, Edit, Trash2, MoreVertical, Shield, Menu } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
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
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, name: formData.name, email: formData.email, phone: formData.phone, role: formData.role, company: formData.company, status: formData.status, twoFA: formData.twoFA } : u)));
      toast({ title: "User updated", description: `${formData.name} has been updated.` });
    } else {
      const newUser = { id: Date.now(), name: formData.name, email: formData.email, phone: formData.phone, role: formData.role, company: formData.company, status: formData.status, twoFA: formData.twoFA, joinedDate: new Date().toISOString().split("T")[0] };
      setUsers([newUser, ...users]);
      toast({ title: "User created", description: `${formData.name} has been added.` });
    }
    setDialogOpen(false);
  };

  const statusColor = (status) => {
    if (status === "Active") return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
    if (status === "Inactive") return "bg-muted text-muted-foreground";
    return "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300";
  };

  return (
    <AdminLayout
      title="User Management"
      subtitle="Manage all registered accounts, roles and security statuses"
    >
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Users</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{users.length}</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Users</p>
                <p className="text-2xl font-black text-emerald-600 mt-1">{users.filter((u) => u.status === "Active").length}</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admins</p>
                <p className="text-2xl font-black text-amber-500 mt-1">{users.filter((u) => u.role === "Admin").length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Toolbar */}
          <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
            <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="flex gap-3 flex-1 w-full sm:w-auto">
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input placeholder="Search users..." className="pl-9 text-xs" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-32 text-xs"><SelectValue placeholder="Role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreate} className="gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"><Plus size={16} /> Create User</Button>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="border-border bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-border bg-slate-50/60 dark:bg-slate-800/40 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Company</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">2FA</th>
                      <th className="py-3 px-4">Joined</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                          <div>{user.name}</div>
                          <div className="text-xs text-muted-foreground font-mono font-normal">{user.email}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-muted-foreground">{user.company || "—"}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-mono">{user.twoFA ? "Enabled" : "Disabled"}</td>
                        <td className="py-3.5 px-4 text-xs text-muted-foreground">{user.joinedDate}</td>
                        <td className="py-3.5 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical size={16} /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(user)} className="gap-2"><Edit size={14} /> Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(user.id)} className="gap-2 text-destructive"><Trash2 size={14} /> Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

      {/* User Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingUser ? `Edit User: ${editingUser.name}` : "Create New User"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2 text-xs">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Full Name *</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Rahul Sharma" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Email Address *</Label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="e.g. rahul@example.com" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Phone</Label>
              <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 9876543210" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Role</Label>
                <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                  <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {!editingUser && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Password *</Label>
                  <Input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="••••••••" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Confirm Password *</Label>
                  <Input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="••••••••" />
                </div>
              </div>
            )}
            <div className="flex items-center justify-between border border-border rounded-xl p-3 bg-slate-50 dark:bg-slate-900">
              <div>
                <Label className="text-xs font-semibold">Two-Factor Authentication</Label>
                <p className="text-[11px] text-muted-foreground">Require 2FA for this account</p>
              </div>
              <Switch checked={formData.twoFA} onCheckedChange={(v) => setFormData({ ...formData, twoFA: v })} />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <DialogClose asChild><Button variant="outline" size="sm">Cancel</Button></DialogClose>
            <Button size="sm" onClick={handleSubmit} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">{editingUser ? "Update User" : "Create User"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminUsers;
