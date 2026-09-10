import SoftwareProductTemplate from "@/components/SoftwareProductTemplate";
import { Inbox, Server, ShieldCheck, Calendar, Download, RefreshCw, FolderOpen, FileText, Users } from "lucide-react";
const data = {
    brand: "Dharam Vir Infotech",
    productName: "IMAP Backup Tool",
    tagline: "Backup Any IMAP Mailbox to PST, MBOX, EML or PDF",
    description: "Backup Gmail, Yahoo, Office 365, Zoho, cPanel and any IMAP mailbox to your local drive in PST, MBOX, EML, MSG or PDF format. Schedule incremental backups, preserve folder hierarchy, and run thousands of mailboxes from a single console with TLS-secured connections.",
    version: "v6.0.2",
    rating: 4.8,
    reviewCount: "3,100+",
    highlights: ["Universal IMAP Support", "5 Output Formats", "Scheduled & Incremental", "TLS / SSL Secure"],
    ProductIcon: Inbox,
    features: [
        { icon: Server, title: "Universal IMAP Support", desc: "Works with any IMAP server — Gmail, Yahoo, Office 365, Zoho, cPanel, Rackspace and more." },
        { icon: Download, title: "5 Output Formats", desc: "Export to PST, MBOX, EML, MSG or PDF — pick whichever your archive policy needs." },
        { icon: ShieldCheck, title: "Bank-Grade Security", desc: "TLS/SSL connections, OAuth where supported, and zero credential storage on disk." },
        { icon: Calendar, title: "Scheduled Backups", desc: "Run automatic daily, weekly or monthly jobs in the background." },
        { icon: RefreshCw, title: "Incremental Sync", desc: "Only new emails are downloaded after the first backup — fast and bandwidth-friendly." },
        { icon: Inbox, title: "Selective Folders", desc: "Pick exact folders, labels or date ranges to back up — skip Spam and Trash by default." },
        { icon: FolderOpen, title: "Folder Hierarchy Preserved", desc: "Maintains your original folder structure, labels, and read/unread state." },
        { icon: Users, title: "Bulk Mailbox Mode", desc: "Backup unlimited IMAP accounts from a single console — perfect for IT admins." },
        { icon: FileText, title: "Detailed Logs", desc: "Per-session log report with success/failure counts and detailed error messages." },
    ],
    steps: [
        { title: "Add IMAP Account", desc: "Enter IMAP credentials or sign in with OAuth for Gmail / Office 365." },
        { title: "Pick Folders & Format", desc: "Select folders, apply date filters, and choose PST, MBOX, EML, MSG or PDF output." },
        { title: "Backup or Schedule", desc: "Run the backup now or schedule recurring jobs to run automatically." },
    ],
    requirements: [
        "Windows 11, 10, 8.1, 8, 7 (32-bit & 64-bit)",
        "Windows Server 2012, 2016, 2019, 2022",
        "1 GHz processor or faster",
        "1 GB RAM (2 GB recommended)",
        "150 MB free disk space (plus space for backups)",
        "Stable internet connection",
    ],
    supportedFormats: ["PST", "MBOX", "EML", "MSG", "PDF"],
    faqs: [
        { q: "Which IMAP providers are supported?", a: "Any server that speaks IMAP — Gmail, Yahoo, Office 365, Zoho, iCloud, AOL, cPanel hosting, Rackspace and more." },
        { q: "Does it use OAuth for Gmail / Office 365?", a: "Yes. Modern OAuth authentication is supported alongside classic password login." },
        { q: "Are subsequent backups incremental?", a: "Yes — after the first full backup, only new emails are downloaded to save time and bandwidth." },
        { q: "Can I backup multiple accounts at once?", a: "Yes. Add as many accounts as you like — they back up sequentially or in parallel based on your settings." },
        { q: "What happens if the connection drops?", a: "The tool automatically resumes from the last successful email and logs any retries." },
    ],
    reviews: [
        { name: "Carlos Mendes", role: "MSP Owner", initials: "CM", date: "2024-07-10", title: "Rock solid for 300+ mailboxes nightly", rating: 5, quote: "I backup 300+ client mailboxes nightly. Rock solid for over a year now." },
        { name: "Aisha Khan", role: "IT Manager", initials: "AK", date: "2024-08-20", title: "OAuth setup took minutes", rating: 5, quote: "OAuth for Microsoft 365 is the killer feature. Setup took minutes." },
        { name: "Frank Walters", role: "Solo Sysadmin", initials: "FW", date: "2024-09-02", title: "Switched from cloud and never looked back", rating: 4, quote: "Switched from a cloud backup service and never looked back. One-time price wins." },
        { name: "Yuki Nakamura", role: "Compliance Lead", initials: "YN", date: "2024-06-28", title: "Audit logs and PST output are excellent", rating: 5, quote: "PST output drops straight into our retention system. Audit logs are excellent." },
    ],
    seoTitle: "IMAP Backup Tool — Backup Any IMAP Mailbox to PST, MBOX, EML | Dharam Vir Infotech",
    seoDescription: "Backup Gmail, Yahoo, Office 365, Zoho or cPanel IMAP mailboxes to PST, MBOX, EML, MSG or PDF. Scheduled, incremental and TLS-secured backups.",
    path: "/software/imap-backup-tool",
    ogImage: "/og/imap-backup.jpg",
};
const ImapBackup = () => <SoftwareProductTemplate data={data}/>;
export default ImapBackup;
