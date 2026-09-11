import { LayoutDashboard, Users, FileText, Settings, Mail, Briefcase, ClipboardList, Calendar, UserCircle, Building2, CreditCard, FolderKanban, GraduationCap, ShieldCheck, Receipt, Megaphone, } from "lucide-react";
export const rolePanels = {
    admin: {
        brand: "DV Admin",
        title: "Admin Dashboard",
        subtitle: "Full platform control",
        basePath: "/panel/admin",
        accentLabel: "Administrator",
        links: [
            { label: "Dashboard", icon: LayoutDashboard, href: "/panel/admin" },
            { label: "Users", icon: Users, href: "/admin/users" },
            { label: "Roles", icon: ShieldCheck, href: "/admin/roles" },
            { label: "Developers", icon: Briefcase, href: "/admin/developers" },
            { label: "Portfolio / Work", icon: FolderKanban, href: "/admin/portfolio" },
            { label: "Inquiries", icon: Mail, href: "/admin/inquiries" },
            { label: "Email Logs", icon: Mail, href: "/admin/email-logs" },
            { label: "Settings", icon: Settings, href: "/admin/settings" },
        ],
    },
    editor: {
        brand: "DV Editor",
        title: "Content Workspace",
        subtitle: "Manage site content & inquiries",
        basePath: "/panel/editor",
        accentLabel: "Editor",
        links: [
            { label: "Dashboard", icon: LayoutDashboard, href: "/panel/editor" },
            { label: "Pages", icon: FileText, href: "/panel/editor/pages" },
            { label: "Inquiries", icon: Mail, href: "/admin/inquiries" },
            { label: "Marketing", icon: Megaphone, href: "/panel/editor/marketing" },
            { label: "Profile", icon: UserCircle, href: "/panel/editor/profile" },
        ],
    },
    employee: {
        brand: "DV Workspace",
        title: "Employee Portal",
        subtitle: "Your tasks, projects & profile",
        basePath: "/panel/employee",
        accentLabel: "Employee",
        links: [
            { label: "Dashboard", icon: LayoutDashboard, href: "/panel/employee" },
            { label: "My Tasks", icon: ClipboardList, href: "/panel/employee/tasks" },
            { label: "Projects", icon: FolderKanban, href: "/panel/employee/projects" },
            { label: "Timesheet", icon: Calendar, href: "/panel/employee/timesheet" },
            { label: "Training", icon: GraduationCap, href: "/panel/employee/training" },
            { label: "Profile", icon: UserCircle, href: "/panel/employee/profile" },
        ],
    },
    employer: {
        brand: "DV Hire",
        title: "Employer Portal",
        subtitle: "Hire & manage your workforce",
        basePath: "/panel/employer",
        accentLabel: "Employer",
        links: [
            { label: "Dashboard", icon: LayoutDashboard, href: "/panel/employer" },
            { label: "Job Posts", icon: Briefcase, href: "/panel/employer/jobs" },
            { label: "Candidates", icon: Users, href: "/panel/employer/candidates" },
            { label: "Hired Team", icon: Building2, href: "/panel/employer/team" },
            { label: "Billing", icon: CreditCard, href: "/panel/employer/billing" },
            { label: "Profile", icon: UserCircle, href: "/panel/employer/profile" },
        ],
    },
    client: {
        brand: "DV Client",
        title: "Client Portal",
        subtitle: "Track your projects & invoices",
        basePath: "/panel/client",
        accentLabel: "Client",
        links: [
            { label: "Dashboard", icon: LayoutDashboard, href: "/panel/client" },
            { label: "Projects", icon: FolderKanban, href: "/panel/client/projects" },
            { label: "Invoices", icon: Receipt, href: "/panel/client/invoices" },
            { label: "Support", icon: Mail, href: "/panel/client/support" },
            { label: "Profile", icon: UserCircle, href: "/panel/client/profile" },
        ],
    },
    developer: {
        brand: "DV Dev",
        title: "Developer Portal",
        subtitle: "Your assignments & profile",
        basePath: "/panel/developer",
        accentLabel: "Developer",
        links: [
            { label: "Dashboard", icon: LayoutDashboard, href: "/panel/developer" },
            { label: "Assignments", icon: ClipboardList, href: "/panel/developer/assignments" },
            { label: "Projects", icon: FolderKanban, href: "/panel/developer/projects" },
            { label: "Timesheet", icon: Calendar, href: "/panel/developer/timesheet" },
            { label: "Profile", icon: UserCircle, href: "/panel/developer/profile" },
        ],
    },
    user: {
        brand: "DV Account",
        title: "My Account",
        subtitle: "Your profile and activity",
        basePath: "/panel/user",
        accentLabel: "Member",
        links: [
            { label: "Dashboard", icon: LayoutDashboard, href: "/panel/user" },
            { label: "Inquiries", icon: Mail, href: "/panel/user/inquiries" },
            { label: "Profile", icon: UserCircle, href: "/panel/user/profile" },
            { label: "Settings", icon: Settings, href: "/panel/user/settings" },
        ],
    },
};
export const getPanelConfig = (role) => {
    if (!role)
        return rolePanels.user;
    return rolePanels[role] ?? rolePanels.user;
};
