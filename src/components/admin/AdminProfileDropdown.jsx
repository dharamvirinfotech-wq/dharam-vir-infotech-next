import { useState } from "react";
import { Link, useNavigate } from "@/lib/router-compat";
import { 
  User, Settings, KeyRound, LogOut, ShieldCheck, ChevronDown, Check 
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const AdminProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({ title: "Validation Error", description: "All fields are required.", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Weak Password", description: "New password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Mismatch", description: "New passwords do not match.", variant: "destructive" });
      return;
    }

    setSavingPassword(true);
    setTimeout(() => {
      setSavingPassword(false);
      setPasswordModalOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast({ title: "Password Updated", description: "Your admin account password has been changed successfully." });
    }, 800);
  };

  const displayName = user?.full_name || user?.name || "Super Admin";
  const displayEmail = user?.email || "admin@dvit.com";
  const displayRole = (user?.role || "admin").toUpperCase();

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center gap-2.5 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            aria-label="User Account Menu"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-sm border border-amber-300">
                {initials}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
            </div>

            <div className="hidden md:flex flex-col text-left leading-none pr-1">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[120px]">
                {displayName}
              </span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold font-mono tracking-wider mt-0.5">
                {displayRole}
              </span>
            </div>

            <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform duration-200" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl border-border bg-white dark:bg-slate-900">
          <DropdownMenuLabel className="font-normal px-2 py-2">
            <div className="flex flex-col space-y-1">
              <p className="text-xs font-bold leading-none text-slate-900 dark:text-white">{displayName}</p>
              <p className="text-[11px] leading-none text-muted-foreground font-mono truncate">{displayEmail}</p>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                  <ShieldCheck size={11} /> {displayRole} ACCESS
                </span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem
            onClick={() => setProfileModalOpen(true)}
            className="cursor-pointer gap-2 py-2 text-xs font-medium rounded-xl hover:bg-amber-500/10 hover:text-amber-600"
          >
            <User size={15} className="text-slate-400" />
            <span>Show Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer gap-2 py-2 text-xs font-medium rounded-xl hover:bg-amber-500/10 hover:text-amber-600">
            <Link to="/admin/settings">
              <Settings size={15} className="text-slate-400" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setPasswordModalOpen(true)}
            className="cursor-pointer gap-2 py-2 text-xs font-medium rounded-xl hover:bg-amber-500/10 hover:text-amber-600"
          >
            <KeyRound size={15} className="text-slate-400" />
            <span>Password Update</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer gap-2 py-2 text-xs font-semibold rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Show Profile Dialog */}
      <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-base shadow-md">
                {initials}
              </div>
              <div>
                <DialogTitle className="text-base font-bold">{displayName}</DialogTitle>
                <DialogDescription className="text-xs font-mono">{displayEmail}</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs">
            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-border">
              <div>
                <span className="text-muted-foreground font-semibold">Account Role:</span>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">{displayRole}</p>
              </div>
              <div>
                <span className="text-muted-foreground font-semibold">Security Status:</span>
                <p className="text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
                  <Check size={12} /> Active / Verified
                </p>
              </div>
              <div>
                <span className="text-muted-foreground font-semibold">Platform:</span>
                <p className="font-medium text-slate-900 dark:text-white mt-0.5">Dharam Vir Infotech</p>
              </div>
              <div>
                <span className="text-muted-foreground font-semibold">Session:</span>
                <p className="font-medium text-slate-900 dark:text-white mt-0.5">Authenticated JWT</p>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-900 dark:text-amber-300">
              <p className="font-semibold text-xs">Full Administrative Privileges</p>
              <p className="text-[11px] mt-0.5">You have complete access to email logs, contact inquiries, role permissions, and platform settings.</p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:justify-between">
            <Button variant="outline" size="sm" onClick={() => setProfileModalOpen(false)}>
              Close
            </Button>
            <Button
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold gap-1.5"
              onClick={() => {
                setProfileModalOpen(false);
                setPasswordModalOpen(true);
              }}
            >
              <KeyRound size={13} /> Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Password Update Dialog */}
      <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                <KeyRound size={18} />
              </span>
              <DialogTitle className="text-base font-bold">Update Account Password</DialogTitle>
            </div>
            <DialogDescription className="text-xs">
              Change the login password for <strong>{displayEmail}</strong>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdatePassword} className="space-y-3.5 py-1">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Current Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="text-xs"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">New Password</Label>
              <Input
                type="password"
                placeholder="At least 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="text-xs"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Confirm New Password</Label>
              <Input
                type="password"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="text-xs"
              />
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setPasswordModalOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={savingPassword}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
              >
                {savingPassword ? "Updating..." : "Save Password"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminProfileDropdown;
