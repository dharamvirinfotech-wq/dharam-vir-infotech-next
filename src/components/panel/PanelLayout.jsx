import { useState } from "react";
import { Link, useLocation, useNavigate } from "@/lib/router-compat";
import { LogOut, Menu, X, Bell, Home } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getPanelConfig } from "@/config/rolePanels";
import AdminHeaderBrand from "@/components/admin/AdminHeaderBrand";

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-foreground">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      {/* Fixed Sticky Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 h-screen bg-[#071a2f] text-white transition-all duration-300 ease-in-out flex flex-col border-r border-white/10 shadow-2xl ${
          sidebarOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
        }`}
      >
        <div className="p-3.5 flex items-center justify-between border-b border-white/10 h-18 shrink-0 bg-[#051424]">
          <Link to="/" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-105">
              <img src="/logo.png" alt="Dharam Vir Infotech" className="w-full h-full object-contain" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col min-w-0">
                <span className="tracking-tight font-extrabold text-sm text-white leading-tight truncate">
                  {config.brand}
                </span>
                <span className="text-[10px] text-amber-400 font-mono tracking-wider truncate mt-0.5">
                  {config.accentLabel} Portal
                </span>
              </div>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {config.links.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                  active
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <item.icon
                  size={18}
                  className={`shrink-0 transition-transform group-hover:scale-110 ${
                    active ? "text-slate-950" : "text-amber-400/90"
                  }`}
                />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-1 bg-[#051322] shrink-0">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            title={!sidebarOpen ? "Visit Site" : undefined}
          >
            <Home size={17} className="shrink-0 text-slate-400" />
            {sidebarOpen && <span className="truncate">Visit Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 transition-colors"
            title={!sidebarOpen ? "Logout" : undefined}
          >
            <LogOut size={17} className="shrink-0" />
            {sidebarOpen && <span className="truncate">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Pane with dynamic left padding on desktop */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:pl-64" : "lg:pl-20"} flex flex-col min-h-screen`}>
        <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              aria-label="Toggle menu"
            >
              <Menu size={18} />
            </button>
            <AdminHeaderBrand
              title={config.title}
              subtitle={`Welcome back, ${user?.full_name || "Admin"} • ${config.accentLabel}`}
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-sm shadow-xs">
              {initials}
            </div>
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8 flex-1">{children}</div>
      </div>
    </div>
  );
};

export default PanelLayout;
