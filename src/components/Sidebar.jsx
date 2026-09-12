import { Link, useLocation, useNavigate } from "@/lib/router-compat";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Mail,
  Briefcase,
  FileText,
  Globe,
  BookOpen,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
const sidebarLinks = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/panel/admin" },
  { label: "Job Postings", icon: Briefcase, href: "/admin/jobs" },
  { label: "Applications", icon: FileText, href: "/admin/job-applications" },
  { label: "Unique Visitors", icon: Globe, href: "/admin/visitors" },
  { label: "Inquiry / Leads / Clients", icon: Mail, href: "/admin/inquiries" },
  { label: "Case Studies & Portfolio", icon: BookOpen, href: "/admin/portfolio" },
  { label: "Company Developers", icon: Users, href: "/admin/developers" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Roles", icon: ShieldCheck, href: "/admin/roles" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];
const Sidebar = ({ open, onToggle }) => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };
    const isActive = (href) => {
        return location.pathname === href || location.pathname.startsWith(href + "/");
    };
    return (<>
      {/* Mobile Backdrop Overlay */}
      {open && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs transition-opacity duration-300"
        />
      )}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 h-screen bg-[#071a2f] text-white transition-all duration-300 ease-in-out flex flex-col border-r border-white/10 shadow-2xl ${
          open ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
        }`}
      >
        {/* Brand Header */}
        <div className="p-3.5 flex items-center justify-between border-b border-white/10 h-18 shrink-0 bg-[#051424]">
          <Link to="/panel/admin" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-105">
              <img src="/logo.png" alt="Dharam Vir Infotech" className="w-full h-full object-contain" />
            </div>
            {open && (
              <div className="flex flex-col min-w-0">
                <span className="tracking-tight font-extrabold text-sm text-white leading-tight truncate">
                  Dharam Vir <span className="text-amber-400 text-xs font-bold px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">ADMIN</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider truncate mt-0.5">
                  INFOTECH PVT. LTD.
                </span>
              </div>
            )}
          </Link>
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Toggle Sidebar"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Navigation Links (Scrolls independently if too many items) */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto custom-scrollbar">
          {sidebarLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                  active
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
                title={!open ? item.label : undefined}
              >
                <item.icon
                  size={18}
                  className={`shrink-0 transition-transform group-hover:scale-110 ${
                    active ? "text-slate-950" : "text-amber-400/90"
                  }`}
                />
                {open && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions pinned to bottom */}
        <div className="p-3 border-t border-white/10 space-y-1 bg-[#051322] shrink-0">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            title={!open ? "Visit Website" : undefined}
          >
            <LayoutDashboard size={17} className="shrink-0 text-slate-400" />
            {open && <span className="truncate">Visit Public Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 transition-colors"
            title={!open ? "Sign Out" : undefined}
          >
            <LogOut size={17} className="shrink-0" />
            {open && <span className="truncate">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>);
};
export default Sidebar;
