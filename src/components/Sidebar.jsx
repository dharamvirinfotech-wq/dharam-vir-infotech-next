import { Link, useLocation, useNavigate } from "@/lib/router-compat";
import { LayoutDashboard, Users, Settings, LogOut, Menu, X, ShieldCheck, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
const sidebarLinks = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/panel/admin" },
    { label: "Users", icon: Users, href: "/admin/users" },
    { label: "Roles", icon: ShieldCheck, href: "/admin/roles" },
    { label: "Developers", icon: Users, href: "/admin/developers" },
    { label: "Inquiries", icon: Mail, href: "/admin/inquiries" },
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
    return (<aside className={`${open ? "w-64" : "w-0 lg:w-20"} bg-primary text-primary-foreground transition-all duration-300 flex flex-col fixed lg:relative h-screen z-40 overflow-hidden`}>
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        {open && (<Link to="/" className="font-bold text-lg">
            DV <span className="text-accent">Admin</span>
          </Link>)}
        <button onClick={onToggle} className="text-primary-foreground/70 hover:text-primary-foreground">
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {sidebarLinks.map((item) => (<Link key={item.label} to={item.href} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(item.href)
                ? "bg-accent text-accent-foreground"
                : "text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground"}`}>
            <item.icon size={18}/>
            {open && <span>{item.label}</span>}
          </Link>))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground transition-colors">
          <LogOut size={18}/>
          {open && <span>Logout</span>}
        </button>
      </div>
    </aside>);
};
export default Sidebar;
