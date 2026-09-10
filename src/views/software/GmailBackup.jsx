import SoftwareProductTemplate from "@/components/SoftwareProductTemplate";
import { HardDrive, Mail, Lock, FileArchive, Filter, Cloud, Tag, Pause, FileText } from "lucide-react";
const data = {
    brand: "Dharam Vir Infotech",
    productName: "Gmail Backup Tool",
    tagline: "Backup Gmail to PST, PDF, MBOX, EML & MSG",
    description: "Backup Gmail and Google Workspace mailboxes to PST, PDF, MBOX, EML or MSG with labels, attachments and folder hierarchy preserved. OAuth secured, incremental, and built for IT admins offboarding multiple Workspace users from a single console.",
    version: "v4.5.0",
    rating: 4.9,
    reviewCount: "2,700+",
    highlights: ["5 Output Formats", "Labels Preserved", "OAuth Secured", "Workspace Ready"],
    ProductIcon: HardDrive,
    features: [
        { icon: HardDrive, title: "5 Output Formats", desc: "Save Gmail emails as PST, PDF, MBOX, EML or MSG — your archive, your choice." },
        { icon: Tag, title: "Labels Preserved", desc: "Maintains Gmail labels as folder structures in the backup output." },
        { icon: Lock, title: "OAuth Secured", desc: "Sign in with Google — your password never touches the app." },
        { icon: FileArchive, title: "Backup Attachments", desc: "Includes all inline images and email attachments with original filenames." },
        { icon: Filter, title: "Smart Filters", desc: "Filter by label, sender, subject, has-attachment or date range." },
        { icon: Cloud, title: "Workspace Ready", desc: "Backup multiple Google Workspace users from one admin console." },
        { icon: Mail, title: "Read/Unread State", desc: "Preserves read/unread, starred and important markers in the backup." },
        { icon: Pause, title: "Smart Rate Limiting", desc: "Auto-pause on Google quota limits with intelligent retry and resume." },
        { icon: FileText, title: "Backup Reports", desc: "Generates per-account summary reports with email counts and timing." },
    ],
    steps: [
        { title: "Sign In With Google", desc: "Authorize Gmail access via secure Google OAuth — no password required." },
        { title: "Select Labels & Format", desc: "Pick the labels, apply date filters, and choose PST, PDF, MBOX, EML or MSG output." },
        { title: "Run Backup", desc: "Click Start — backups are saved to any local or network drive you specify." },
    ],
    requirements: [
        "Windows 11, 10, 8.1, 8, 7 (32-bit & 64-bit)",
        "Windows Server 2012, 2016, 2019, 2022",
        "1 GHz processor or faster",
        "1 GB RAM (2 GB recommended)",
        "120 MB free disk space (plus space for backups)",
        "Stable internet connection",
    ],
    supportedFormats: ["PST", "PDF", "MBOX", "EML", "MSG"],
    faqs: [
        { q: "Does it support Google Workspace?", a: "Yes. Both consumer Gmail and Google Workspace (formerly G Suite) accounts are fully supported." },
        { q: "Is OAuth required?", a: "OAuth is the default and recommended method. App passwords are also supported for legacy setups." },
        { q: "Can I open PST files in Outlook?", a: "Yes. The exported PST works with Outlook 2010, 2013, 2016, 2019, 2021 and Microsoft 365." },
        { q: "Does it handle large mailboxes?", a: "Yes — tested with 200+ GB mailboxes. The tool auto-splits PST files to stay under Outlook's limits." },
        { q: "Are Google's rate limits handled?", a: "Yes. The tool automatically pauses and resumes when Google enforces throttling." },
    ],
    reviews: [
        { name: "Olivia Martinez", role: "Workspace Admin", initials: "OM", date: "2024-08-05", title: "Flawless offboarding for 80 employees", rating: 5, quote: "Used for offboarding 80 employees last quarter. Flawless every time." },
        { name: "Rahul Kapoor", role: "Founder", initials: "RK", date: "2024-07-18", title: "Decade-old Gmail migrated overnight", rating: 5, quote: "Migrated my decade-old Gmail to PST in a single overnight run. Labels, attachments — everything intact." },
        { name: "Stephanie Wood", role: "Records Manager", initials: "SW", date: "2024-09-10", title: "PDF output meets regulator requirements", rating: 4, quote: "PDF output meets our regulator's format requirements perfectly." },
        { name: "Kevin O'Brien", role: "IT Director", initials: "KO", date: "2024-06-15", title: "Straightforward setup and fair license", rating: 5, quote: "Setup is straightforward, support is responsive, license is fair. Easy recommendation." },
    ],
    seoTitle: "Gmail Backup Tool — Backup Gmail to PST, PDF, MBOX & EML | Dharam Vir Infotech",
    seoDescription: "Backup Gmail and Google Workspace mailboxes to PST, PDF, MBOX, EML or MSG. OAuth secured, preserves labels & attachments. Free trial included.",
    path: "/software/gmail-backup-tool",
    ogImage: "/og/gmail-backup.jpg",
};
const GmailBackup = () => <SoftwareProductTemplate data={data}/>;
export default GmailBackup;
