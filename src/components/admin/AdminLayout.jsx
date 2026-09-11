import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import AdminProfileDropdown from "@/components/admin/AdminProfileDropdown";
import AdminHeaderBrand from "@/components/admin/AdminHeaderBrand";
import AdminNotificationBell from "@/components/admin/AdminNotificationBell";

/**
 * Global AdminLayout for all Admin Panel pages.
 * Handles:
 * 1. Fixed Sidebar with company logo and responsive drawer
 * 2. Unified Header:
 *    - Mobile: Dharamvir Info Tech Logo (/logo.png) & compact branding
 *    - Desktop: Page Title, Subtitle, and Icon
 *    - Right: Notification Bell + Custom Page Actions + Global Profile Dropdown
 * 3. Responsive desktop padding offset (lg:pl-64 / lg:pl-20)
 */
const AdminLayout = ({
  title = "Admin Command Center",
  subtitle = "Welcome back, Super Administrator",
  icon: Icon,
  actions = null,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-foreground transition-all duration-300">
      {/* Global Fixed Sidebar */}
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((s) => !s)} />

      {/* Main Content Area with responsive desktop sidebar offset */}
      <div className={`transition-all duration-300 flex flex-col min-h-screen ${sidebarOpen ? "lg:pl-64" : "lg:pl-20"}`}>
        {/* Global Admin Header */}
        <header className="sticky top-0 z-30 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 shadow-xs">
          {/* Left: Mobile Drawer Trigger + Brand / Page Title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen((s) => !s)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none lg:hidden shrink-0"
              aria-label="Toggle Navigation Drawer"
            >
              <Menu className="h-5 w-5" />
            </button>

            <AdminHeaderBrand
              title={title}
              subtitle={subtitle}
              icon={Icon}
            />
          </div>

          {/* Right: Notification Bell + Page Actions + Admin Profile Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {actions && <div className="flex items-center gap-2">{actions}</div>}
            <AdminNotificationBell />
            <AdminProfileDropdown />
          </div>
        </header>

        {/* Page Inner Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
