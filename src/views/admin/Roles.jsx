import { useMemo, useState } from "react";
import { Bell, Plus, Search, Edit, Trash2, ShieldCheck, MoreVertical, KeyRound, UserCog, Menu } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ALL_PERMISSIONS = [
  { key: "users.read", label: "View Users" },
  { key: "users.write", label: "Manage Users" },
  { key: "roles.manage", label: "Manage Roles" },
  { key: "pages.manage", label: "Manage Pages" },
  { key: "inquiries.read", label: "View Inquiries" },
  { key: "inquiries.reply", label: "Reply Inquiries" },
  { key: "projects.manage", label: "Manage Projects" },
  { key: "billing.manage", label: "Manage Billing" },
  { key: "analytics.view", label: "View Analytics" },
  { key: "settings.manage", label: "Manage Settings" },
];

const initialRoles = [
  { id: 1, key: "admin", name: "Admin", description: "Full platform control", permissions: ALL_PERMISSIONS.map((p) => p.key), system: true },
  { id: 2, key: "editor", name: "Editor", description: "Manage content & inquiries", permissions: ["pages.manage", "inquiries.read", "inquiries.reply", "analytics.view"] },
  { id: 3, key: "employee", name: "Employee", description: "Internal team member", permissions: ["projects.manage", "inquiries.read"] },
  { id: 4, key: "employer", name: "Employer", description: "Hires developers from platform", permissions: ["projects.manage", "billing.manage"] },
  { id: 5, key: "client", name: "Client", description: "External customer", permissions: ["projects.manage"] },
  { id: 6, key: "developer", name: "Developer", description: "Assigned to projects", permissions: ["projects.manage"] },
  { id: 7, key: "user", name: "User", description: "Default registered user", permissions: [], system: true },
];

const initialUsers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com", role: "admin", status: "Active" },
  { id: 2, name: "Priya Patel", email: "priya@example.com", role: "editor", status: "Active" },
  { id: 3, name: "Amit Kumar", email: "amit@example.com", role: "user", status: "Inactive" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "client", status: "Active" },
  { id: 5, name: "Vikram Singh", email: "vikram@example.com", role: "employee", status: "Active" },
  { id: 6, name: "Neha Gupta", email: "neha@example.com", role: "employer", status: "Active" },
  { id: 7, name: "Dev Joshi", email: "dev@example.com", role: "developer", status: "Active" },
];

const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
const emptyRoleForm = { name: "", key: "", description: "", permissions: [] };

const AdminRoles = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [form, setForm] = useState(emptyRoleForm);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignUser, setAssignUser] = useState(null);
  const [assignRole, setAssignRole] = useState("");
  const { toast } = useToast();

  const filteredRoles = useMemo(
    () =>
      roles.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.key.toLowerCase().includes(search.toLowerCase())
      ),
    [roles, search]
  );

  const filteredUsers = useMemo(
    () =>
      users.filter((u) => {
        const q = userSearch.toLowerCase();
        const matchQ = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
        const matchR = filterRole === "all" || u.role === filterRole;
        return matchQ && matchR;
      }),
    [users, userSearch, filterRole]
  );

  const userCountByRole = (roleKey) => users.filter((u) => u.role === roleKey).length;

  const openCreate = () => {
    setEditingRole(null);
    setForm(emptyRoleForm);
    setRoleDialogOpen(true);
  };

  const openEdit = (role) => {
    setEditingRole(role);
    setForm({ name: role.name, key: role.key, description: role.description, permissions: [...role.permissions] });
    setRoleDialogOpen(true);
  };

  const togglePerm = (key) => {
    setForm((f) => ({
      ...f,
      permissions: f.permissions.includes(key)
        ? f.permissions.filter((p) => p !== key)
        : [...f.permissions, key],
    }));
  };

  const handleSaveRole = () => {
    const name = form.name.trim();
    if (!name) {
      toast({ title: "Validation error", description: "Role name is required.", variant: "destructive" });
      return;
    }
    const key = form.key.trim() || slugify(name);
    if (!editingRole && roles.some((r) => r.key === key)) {
      toast({ title: "Duplicate role", description: `A role with key "${key}" already exists.`, variant: "destructive" });
      return;
    }
    if (editingRole) {
      setRoles((rs) =>
        rs.map((r) =>
          r.id === editingRole.id
            ? { ...r, name, key: r.system ? r.key : key, description: form.description, permissions: form.permissions }
            : r
        )
      );
      toast({ title: "Role updated", description: `${name} has been updated.` });
    } else {
      const newRole = {
        id: Date.now(),
        name,
        key,
        description: form.description,
        permissions: form.permissions,
      };
      setRoles((rs) => [...rs, newRole]);
      toast({ title: "Role created", description: `${name} has been added.` });
    }
    setRoleDialogOpen(false);
  };

  const handleDeleteRole = (role) => {
    if (role.system) {
      toast({ title: "Cannot delete", description: "System roles cannot be removed.", variant: "destructive" });
      return;
    }
    if (userCountByRole(role.key) > 0) {
      toast({
        title: "Role in use",
        description: `Reassign the ${userCountByRole(role.key)} user(s) before deleting.`,
        variant: "destructive",
      });
      return;
    }
    setRoles((rs) => rs.filter((r) => r.id !== role.id));
    toast({ title: "Role deleted", description: `${role.name} has been removed.` });
  };

  const openAssign = (user) => {
    setAssignUser(user);
    setAssignRole(user.role);
    setAssignOpen(true);
  };

  const handleAssign = () => {
    if (!assignUser) return;
    setUsers((us) => (us.map((u) => (u.id === assignUser.id ? { ...u, role: assignRole } : u))));
    toast({
      title: "Role assigned",
      description: `${assignUser.name} is now ${roles.find((r) => r.key === assignRole)?.name ?? assignRole}.`,
    });
    setAssignOpen(false);
  };

  return (
    <AdminLayout
      title="Roles & Permissions"
      subtitle="Manage platform user roles and assign access rights"
      icon={ShieldCheck}
    >
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Roles</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{roles.length}</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Custom Roles</p>
                <p className="text-2xl font-black text-amber-500 mt-1">{roles.filter((r) => !r.system).length}</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Assigned Users</p>
                <p className="text-2xl font-black text-emerald-600 mt-1">{users.length}</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="roles" className="space-y-6">
            <TabsList className="p-1 bg-slate-100 dark:bg-slate-900 border border-border rounded-xl">
              <TabsTrigger value="roles" className="gap-2 text-xs font-semibold"><ShieldCheck size={14} /> Roles</TabsTrigger>
              <TabsTrigger value="assignments" className="gap-2 text-xs font-semibold"><UserCog size={14} /> User Assignments</TabsTrigger>
            </TabsList>

            {/* Roles Tab */}
            <TabsContent value="roles" className="space-y-4">
              <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="relative flex-1 sm:max-w-xs w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input placeholder="Search roles..." className="pl-9 text-xs" value={search} onChange={(e) => setSearch(e.target.value)} />
                  </div>
                  <Button onClick={openCreate} className="gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"><Plus size={16} /> Create Role</Button>
                </CardContent>
              </Card>

              <Card className="border-border bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="border-b border-border bg-slate-50/60 dark:bg-slate-800/40 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                          <th className="py-3 px-4">Role</th>
                          <th className="py-3 px-4">Key</th>
                          <th className="py-3 px-4">Description</th>
                          <th className="py-3 px-4">Permissions</th>
                          <th className="py-3 px-4">Users</th>
                          <th className="text-right py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredRoles.map((role) => (
                          <tr key={role.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                              <div className="flex items-center gap-2">
                                <ShieldCheck size={14} className="text-amber-500" />
                                {role.name}
                                {role.system && <Badge variant="secondary" className="text-[10px]">system</Badge>}
                              </div>
                            </td>
                            <td className="py-3.5 px-4"><code className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{role.key}</code></td>
                            <td className="py-3.5 px-4 text-xs text-muted-foreground">{role.description || "—"}</td>
                            <td className="py-3.5 px-4">
                              {role.permissions.length === 0 ? (
                                <span className="text-xs text-muted-foreground">No permissions</span>
                              ) : (
                                <div className="flex flex-wrap gap-1 max-w-md">
                                  {role.permissions.slice(0, 3).map((p) => (
                                    <Badge key={p} variant="outline" className="text-[10px]">{p}</Badge>
                                  ))}
                                  {role.permissions.length > 3 && (
                                    <Badge variant="outline" className="text-[10px]">+{role.permissions.length - 3}</Badge>
                                  )}
                                </div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-xs text-muted-foreground">{userCountByRole(role.key)}</td>
                            <td className="py-3.5 px-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical size={16} /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => openEdit(role)} className="gap-2"><Edit size={14} /> Edit</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteRole(role)} className="gap-2 text-destructive" disabled={role.system}>
                                    <Trash2 size={14} /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                        {filteredRoles.length === 0 && (
                          <tr><td colSpan={6} className="py-12 text-center text-muted-foreground">No roles found.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Assignments Tab */}
            <TabsContent value="assignments" className="space-y-4">
              <Card className="border-border bg-white dark:bg-slate-900 shadow-xs">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="flex gap-3 flex-1 w-full sm:w-auto">
                    <div className="relative flex-1 sm:max-w-xs">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input placeholder="Search users..." className="pl-9 text-xs" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} />
                    </div>
                    <Select value={filterRole} onValueChange={setFilterRole}>
                      <SelectTrigger className="w-40 text-xs"><SelectValue placeholder="Role" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        {roles.map((r) => <SelectItem key={r.key} value={r.key}>{r.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="border-b border-border bg-slate-50/60 dark:bg-slate-800/40 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                          <th className="py-3 px-4">User</th>
                          <th className="py-3 px-4">Email</th>
                          <th className="py-3 px-4">Current Role</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="text-right py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredUsers.map((u) => {
                          const roleObj = roles.find((r) => r.key === u.role);
                          return (
                            <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                              <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">{u.name}</td>
                              <td className="py-3.5 px-4 text-xs text-muted-foreground font-mono">{u.email}</td>
                              <td className="py-3.5 px-4">
                                <Badge variant="outline" className="gap-1 text-xs">
                                  <ShieldCheck size={11} className="text-amber-500" /> {roleObj?.name ?? u.role}
                                </Badge>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                  u.status === "Active" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-slate-100 text-slate-700"
                                }`}>
                                  {u.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <Button variant="outline" size="sm" onClick={() => openAssign(u)} className="gap-1.5 text-xs">
                                  <UserCog size={13} /> Assign Role
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                        {filteredUsers.length === 0 && (
                          <tr><td colSpan={5} className="py-12 text-center text-muted-foreground">No users found.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

      {/* Role Create/Edit Dialog */}
      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRole ? `Edit Role: ${editingRole.name}` : "Create New Role"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, key: editingRole ? form.key : slugify(e.target.value) })} placeholder="e.g. Project Manager" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Key</Label>
                <Input value={form.key} onChange={(e) => setForm({ ...form, key: slugify(e.target.value) })} placeholder="auto-generated" disabled={editingRole?.system} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What can this role do?" rows={2} />
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-2 text-xs font-semibold"><KeyRound size={14} /> Permissions</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-border rounded-xl p-3 bg-slate-50 dark:bg-slate-900">
                {ALL_PERMISSIONS.map((p) => (
                  <label key={p.key} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg px-2 py-1.5 transition-colors">
                    <Checkbox checked={form.permissions.includes(p.key)} onCheckedChange={() => togglePerm(p.key)} />
                    <span className="flex-1 font-medium">{p.label}</span>
                    <code className="text-[10px] text-muted-foreground font-mono">{p.key}</code>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <DialogClose asChild><Button variant="outline" size="sm">Cancel</Button></DialogClose>
            <Button size="sm" onClick={handleSaveRole} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">{editingRole ? "Update Role" : "Create Role"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Role Dialog */}
      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign User Role</DialogTitle>
          </DialogHeader>
          {assignUser && (
            <div className="grid gap-4 py-2 text-xs">
              <div className="rounded-xl border border-border p-3 bg-slate-50 dark:bg-slate-800/50">
                <p className="font-semibold text-sm">{assignUser.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{assignUser.email}</p>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Select Assigned Role</Label>
                <Select value={assignRole} onValueChange={setAssignRole}>
                  <SelectTrigger className="text-xs"><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.key} value={r.key}>
                        {r.name} <span className="text-muted-foreground text-xs ml-1 font-mono">({r.key})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {roles.find((r) => r.key === assignRole)?.description}
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <DialogClose asChild><Button variant="outline" size="sm">Cancel</Button></DialogClose>
            <Button size="sm" onClick={handleAssign} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">Save Assignment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminRoles;
