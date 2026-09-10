import SoftwareProductTemplate from "@/components/SoftwareProductTemplate";
import { Hash, Scale, Layers, Settings, FileSignature, FolderOpen, Calendar, ShieldCheck, FileText, Stamp } from "lucide-react";
const data = {
    brand: "Dharam Vir Infotech",
    productName: "PDF Bates Numbering Tool",
    tagline: "Add Bates Stamps to PDF Pages for Legal & E-Discovery Workflows",
    description: "Add sequential Bates numbers, prefixes, suffixes, and date stamps to PDF pages — the industry standard for indexing legal documents, e-discovery, and case management. Process thousands of PDFs in a single batch with customizable fonts, colors, positioning, and page-range control.",
    version: "v4.2.1",
    rating: 4.8,
    reviewCount: "2,400+",
    highlights: ["Custom Prefix & Suffix", "Configurable Number Length", "Batch PDF Processing", "Flexible Positioning"],
    ProductIcon: Stamp,
    features: [
        { icon: Hash, title: "Custom Prefix & Suffix", desc: "Add case numbers, party names, or any custom text before and after the Bates number." },
        { icon: Layers, title: "Configurable Number Length", desc: "Pad numbers with leading zeros (e.g. ABC000001) and set start/end values per batch." },
        { icon: FolderOpen, title: "Batch PDF Processing", desc: "Stamp hundreds or thousands of PDFs in one go while keeping numbering continuous across files." },
        { icon: Settings, title: "Flexible Positioning", desc: "Place stamps in any of 9 positions — header, footer, corners, or center — with custom margins." },
        { icon: FileSignature, title: "Font, Size & Color Control", desc: "Pick font family, size, color, and opacity to match firm or court formatting requirements." },
        { icon: FileText, title: "Page Range Selection", desc: "Apply Bates numbering to all pages, specific ranges, odd/even, or skip cover pages." },
        { icon: Calendar, title: "Date & Time Stamps", desc: "Optionally include the production date alongside the Bates number for compliance." },
        { icon: ShieldCheck, title: "Encrypted & Signed PDF Support", desc: "Works with password-protected PDFs and preserves digital signatures where possible." },
        { icon: Scale, title: "Bates Log Report", desc: "Generates a CSV log mapping each file and page to its Bates range for production indexes." },
    ],
    steps: [
        { title: "Add PDF Files", desc: "Drag and drop PDFs or import an entire folder — keep the order or sort by name/date." },
        { title: "Configure Bates Format", desc: "Set the prefix, starting number, padding, position, font, and page range for the stamp." },
        { title: "Stamp & Export", desc: "Click Start — Bates-numbered PDFs are written to your output folder along with a production log." },
    ],
    requirements: [
        "Windows 11, 10, 8.1, 8, 7 (32-bit & 64-bit)",
        "1 GHz processor or faster",
        "512 MB RAM (1 GB recommended)",
        "80 MB free disk space for installation",
        "Microsoft .NET Framework 4.5 or above",
    ],
    supportedFormats: ["PDF", "PDF/A"],
    faqs: [
        { q: "What is Bates numbering used for?", a: "Bates numbering uniquely identifies and labels every page in a set of documents — the standard practice for legal discovery, litigation production, and case management." },
        { q: "Can numbering continue across multiple PDFs?", a: "Yes. Add all PDFs to a single batch and the tool maintains continuous numbering across files." },
        { q: "Can I remove or re-stamp Bates numbers later?", a: "Original files stay untouched. You can re-run the tool with a different prefix or range at any time." },
        { q: "Does it support encrypted PDFs?", a: "Yes, with the correct password. Digital signatures are preserved where possible." },
        { q: "Is the output court-admissible?", a: "Output meets standard e-discovery and FRCP production formats used by courts and law firms." },
    ],
    reviews: [
        { name: "Sarah Mitchell", role: "IT Administrator", initials: "SM", date: "2024-08-12", title: "Batch mode saved us countless hours", rating: 5, quote: "Saved us countless hours on a major migration project. The batch mode just works — exactly what we needed." },
        { name: "David Chen", role: "Legal Consultant", initials: "DC", date: "2024-07-30", title: "Reliable and fast for daily firm workflow", rating: 5, quote: "Reliable, fast, and the support team responds quickly. Worth every dollar for our firm's daily workflow." },
        { name: "Priya Sharma", role: "Paralegal", initials: "PS", date: "2024-09-05", title: "Intuitive setup and fast results", rating: 4, quote: "Easy to install and very intuitive. I had everything stamped in under an hour with zero issues." },
        { name: "Marcus Johnson", role: "E-Discovery Lead", initials: "MJ", date: "2024-06-18", title: "Clean interface with no upsells", rating: 5, quote: "Best tool I've used in this category. The interface is clean and there are no annoying upsells." },
    ],
    seoTitle: "PDF Bates Numbering Software — Legal & E-Discovery Stamps | Dharam Vir Infotech",
    seoDescription: "Add Bates stamps to PDFs for legal, litigation and e-discovery workflows. Custom prefix, batch numbering, watermarks and audit-ready file index.",
    path: "/software/pdf-bates-numbering",
    ogImage: "/og/pdf-bates.jpg",
};
const PdfBatesNumbering = () => <SoftwareProductTemplate data={data}/>;
export default PdfBatesNumbering;
