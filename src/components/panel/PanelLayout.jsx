import { useState } from "react";
import { Link, useLocation, useNavigate } from "@/lib/router-compat";
import { LogOut, Menu, X, Bell, Home } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getPanelConfig } from "@/config/rolePanels";
const PanelLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const config = getPanelConfig(user?.role);
    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };
    const initials = (user?.full_name || "U")
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    return (<div className="min-h-screen bg-muted/30 flex">
      <aside className={`${sidebarOpen ? "w-64" : "w-0 lg:w-20"} bg-primary text-primary-foreground transition-all duration-300 flex flex-col fixed lg:relative h-screen z-40 overflow-hidden`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          {sidebarOpen && (<Link to="/" className="font-bold text-lg whitespace-nowrap">
              {config.brand.split(" ")[0]}{" "}
              <span className="text-accent">{config.brand.split(" ").slice(1).join(" ")}</span>
            </Link>)}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-primary-foreground/70 hover:text-primary-foreground">
            {sidebarOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {config.links.map((item) => {
            const active = location.pathname === item.href;
            return (<Link key={item.label} to={item.href} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                    ? "bg-accent text-accent-foreground"
                    : "text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground"}`}>
                <item.icon size={18}/>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>);
        })}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground transition-colors">
            <Home size={18}/>
            {sidebarOpen && <span>Visit Site</span>}
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground transition-colors">
            <LogOut size={18}/>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 min-h-screen">
        <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-primary">{config.title}</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {user?.full_name || "Guest"}
              <span className="ml-2 text-[10px] uppercase tracking-wider bg-accent/10 text-accent px-1.5 py-0.5 rounded">
                {config.accentLabel}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground">
              <Bell size={20}/>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
              {initials}
            </div>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>);
};
export default PanelLayout;
