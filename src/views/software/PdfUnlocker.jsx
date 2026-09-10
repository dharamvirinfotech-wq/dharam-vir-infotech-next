import SoftwareProductTemplate from "@/components/SoftwareProductTemplate";
import { Unlock, FileText, Shuffle, Shield, Zap, Download, Lock, FileCheck, Layers } from "lucide-react";
const data = {
    brand: "Dharam Vir Infotech",
    productName: "PDF Unlocker Tool",
    tagline: "Unlock, Merge & Convert Password-Protected PDFs in Seconds",
    description: "Remove print, copy, edit and form-filling restrictions from secured PDF documents — even without the owner password. Batch-unlock, merge, split and convert files offline on Windows while preserving original formatting, fonts and hyperlinks.",
    version: "v3.6.0",
    rating: 4.9,
    reviewCount: "1,800+",
    highlights: ["Remove PDF Restrictions", "Batch Unlock Mode", "Merge & Split PDFs", "100% Offline"],
    ProductIcon: Unlock,
    features: [
        { icon: Unlock, title: "Remove Restrictions", desc: "Strip print, copy, edit and form-filling restrictions from secured PDFs instantly." },
        { icon: Lock, title: "Password-Protected PDFs", desc: "Supports 40-bit, 128-bit and 256-bit AES encrypted PDFs (with user password)." },
        { icon: Shuffle, title: "Merge & Split", desc: "Combine multiple PDFs or split large documents into separate files." },
        { icon: FileText, title: "Convert Formats", desc: "Export unlocked PDFs to Word, Excel, image and plain text formats." },
        { icon: Shield, title: "100% Offline Processing", desc: "All processing happens locally on your machine — your files never leave your computer." },
        { icon: Zap, title: "Batch Processing", desc: "Unlock hundreds of PDFs in a single run with bulk-mode support." },
        { icon: Download, title: "Preserve Original Quality", desc: "Output preserves the layout, fonts, images, bookmarks and hyperlinks exactly." },
        { icon: FileCheck, title: "Works With Any PDF", desc: "Compatible with PDFs created in Adobe Acrobat, Word, Chrome, Mac Preview and more." },
        { icon: Layers, title: "Folder & Drag-Drop", desc: "Drag a single file or an entire folder — the tool detects every PDF automatically." },
    ],
    steps: [
        { title: "Add PDF Files", desc: "Drag-drop single files or whole folders into the unlock queue." },
        { title: "Choose Action", desc: "Pick unlock, merge, split or convert and configure output settings." },
        { title: "Save Unrestricted PDFs", desc: "Click Start — your unlocked PDFs are saved to any folder you choose." },
    ],
    requirements: [
        "Windows 11, 10, 8.1, 8, 7 (32-bit & 64-bit)",
        "1 GHz processor or faster",
        "512 MB RAM (1 GB recommended)",
        "60 MB free disk space for installation",
        "Microsoft .NET Framework 4.5 or above",
    ],
    supportedFormats: ["PDF", "Word", "Excel", "JPG", "PNG", "TXT"],
    faqs: [
        { q: "Does it work without the PDF password?", a: "Owner-level restrictions (print, copy, edit) can be removed without a password. User-password (open) PDFs require the user password to unlock." },
        { q: "Is my data safe?", a: "Yes. All processing happens locally on your Windows machine — no uploads, no cloud, no telemetry." },
        { q: "What encryption levels are supported?", a: "40-bit RC4, 128-bit RC4 and 128/256-bit AES encryption." },
        { q: "Will the unlocked PDF lose quality?", a: "No. Layout, fonts, images, bookmarks and hyperlinks are preserved exactly." },
        { q: "Is there a free trial?", a: "Yes — the free demo unlocks the first 3 pages of every file so you can verify output quality before buying." },
    ],
    reviews: [
        { name: "Anita Verma", role: "Office Manager", initials: "AV", date: "2024-07-22", title: "Batch unlocked 600 PDFs flawlessly", rating: 5, quote: "Unlocked 600 client PDFs in a single batch. The output looks identical to the originals — life-saver." },
        { name: "Roberto Silva", role: "Architect", initials: "RS", date: "2024-08-03", title: "Worked on secured drawings first try", rating: 5, quote: "I needed to copy text from secured construction drawings. Worked on the first try." },
        { name: "Hannah Lee", role: "Researcher", initials: "HL", date: "2024-09-14", title: "Clean UI with no nagware", rating: 4, quote: "Best PDF unlocker I've tried. Clean UI and no nagware." },
        { name: "Tom Becker", role: "IT Support", initials: "TB", date: "2024-06-30", title: "Our standard office install", rating: 5, quote: "Standard install on all our office machines. Support team replies within hours." },
    ],
    seoTitle: "PDF Unlocker — Remove PDF Restrictions, Merge & Convert | Dharam Vir Infotech",
    seoDescription: "Unlock password-protected PDFs and remove print, copy and edit restrictions. Batch process, merge, split and convert PDFs offline on Windows.",
    path: "/software/pdf-unlocker",
    ogImage: "/og/pdf-unlocker.jpg",
};
const PdfUnlocker = () => <SoftwareProductTemplate data={data}/>;
export default PdfUnlocker;
