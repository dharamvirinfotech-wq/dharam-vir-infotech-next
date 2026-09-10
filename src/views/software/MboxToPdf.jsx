import SoftwareProductTemplate from "@/components/SoftwareProductTemplate";
import { Mail, FileText, Paperclip, Filter, Archive, Search, Tag, Calendar, FolderTree } from "lucide-react";
const data = {
    brand: "Dharam Vir Infotech",
    productName: "MBox to PDF Converter",
    tagline: "Convert MBOX Email Archives to Court-Ready PDFs",
    description: "Convert MBOX email archives from Thunderbird, Apple Mail, SeaMonkey, Eudora and Entourage into searchable PDF/A files with all attachments, headers and inline images preserved. Bulk-convert thousands of emails in one batch with date, sender and keyword filters.",
    version: "v5.1.0",
    rating: 4.7,
    reviewCount: "1,200+",
    highlights: ["All MBOX Clients", "PDF/A Output", "Attachments Preserved", "Bulk Conversion"],
    ProductIcon: Mail,
    features: [
        { icon: Mail, title: "All MBOX Clients", desc: "Supports Thunderbird, Apple Mail, Entourage, Eudora, SeaMonkey, Opera Mail & more." },
        { icon: FileText, title: "PDF/A Archival Output", desc: "Generate archival-grade PDF/A with full RFC-822 email headers preserved." },
        { icon: Paperclip, title: "Attachments Included", desc: "Embed attachments inside the PDF or export them to separate folders." },
        { icon: Filter, title: "Smart Filters", desc: "Convert only the emails you need using date, sender, subject and keyword filters." },
        { icon: Archive, title: "Bulk Conversion", desc: "Process multiple MBOX files in a single batch run with continuous progress reporting." },
        { icon: Search, title: "Searchable PDFs", desc: "Output PDFs are fully text-searchable and ready for legal indexing tools." },
        { icon: Tag, title: "Custom Naming", desc: "Name output files by subject, date, sender or any combination — fully customizable." },
        { icon: Calendar, title: "Maintains Dates", desc: "Original sent / received dates and timezone are preserved in the PDF." },
        { icon: FolderTree, title: "Folder Structure", desc: "Keeps the original mailbox folder hierarchy intact in the output directory." },
    ],
    steps: [
        { title: "Add MBOX Files", desc: "Browse or drag MBOX files and folders into the conversion queue." },
        { title: "Filter & Configure", desc: "Apply date/sender filters and choose naming pattern and attachment handling." },
        { title: "Convert to PDF", desc: "Click Start — structured PDFs are exported to your destination folder." },
    ],
    requirements: [
        "Windows 11, 10, 8.1, 8, 7 (32-bit & 64-bit)",
        "1 GHz processor or faster",
        "1 GB RAM (2 GB recommended)",
        "100 MB free disk space for installation",
        "Microsoft .NET Framework 4.5 or above",
    ],
    supportedFormats: ["MBOX", "EML", "PDF", "PDF/A"],
    faqs: [
        { q: "Which email clients are supported?", a: "Any client that exports MBOX — Thunderbird, Apple Mail, SeaMonkey, Eudora, Entourage, Opera Mail, PocoMail, Spicebird, Postbox and more." },
        { q: "Do I need the original mail client installed?", a: "No. The tool reads MBOX files directly — no mail client required." },
        { q: "Are attachments preserved?", a: "Yes. You can either embed attachments inside the PDF or export them to a separate folder." },
        { q: "Can I convert only a subset of emails?", a: "Yes — apply date range, sender, subject or keyword filters to convert only what you need." },
        { q: "Is there a file size limit?", a: "No. The tool auto-splits large MBOX files internally for fast, reliable processing." },
    ],
    reviews: [
        { name: "Linda Park", role: "Litigation Paralegal", initials: "LP", date: "2024-08-08", title: "40 GB converted to searchable PDFs", rating: 5, quote: "Converted 40 GB of Thunderbird archives into searchable PDFs for case prep. Saved us weeks." },
        { name: "Joseph Wright", role: "Compliance Officer", initials: "JW", date: "2024-07-15", title: "PDF/A meets our retention policy", rating: 4, quote: "PDF/A output is exactly what our retention policy requires. Filters are powerful." },
        { name: "Mei Tanaka", role: "Migration Consultant", initials: "MT", date: "2024-09-01", title: "Handles huge files without crashing", rating: 5, quote: "Handles huge MBOX files without crashing. The attachment options are a big plus." },
        { name: "Daniel Cooper", role: "Solo Attorney", initials: "DC", date: "2024-06-25", title: "Great chain-of-custody logging", rating: 5, quote: "Simple, fast, and the conversion log is great for documenting chain of custody." },
    ],
    seoTitle: "MBox to PDF Converter — Thunderbird, Apple Mail & More | Dharam Vir Infotech",
    seoDescription: "Convert MBOX email archives to court-ready PDF/A with attachments. Bulk convert Thunderbird, Apple Mail, SeaMonkey & Eudora mailboxes.",
    path: "/software/mbox-to-pdf",
    ogImage: "/og/mbox-to-pdf.jpg",
};
const MboxToPdf = () => <SoftwareProductTemplate data={data}/>;
export default MboxToPdf;
