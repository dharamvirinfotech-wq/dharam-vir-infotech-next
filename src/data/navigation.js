import { Globe, Smartphone, Brain, ShoppingCart, Code2, Users, Server, Database, Cloud, Blocks, Shield, FileText, Mail, HardDrive, Inbox, Info, BookOpen, Briefcase, HelpCircle, } from "lucide-react";
export const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services", hasMega: "services" },
    { label: "About", href: "/about" },
    { label: "Who We Are", href: "/about", hasMega: "explore" },
    { label: "Portfolio", href: "/portfolio" },
];
export const megaExplore = [
    { icon: Info, title: "About Us", desc: "Our company story, mission & vision", href: "/about" },
    { icon: Briefcase, title: "Career", desc: "Explore open roles & join our team", href: "/career" },
    { icon: BookOpen, title: "Case Studies", desc: "Client success stories & results", href: "/portfolio" },
    { icon: BookOpen, title: "Blogs", desc: "Tech insights, articles & news", href: "/blog" },
    { icon: HelpCircle, title: "FAQ", desc: "Frequently asked questions", href: "/faq" },
    { icon: FileText, title: "Mission & Vision", desc: "Our mission, vision & values", href: "/mission-vision" },
];
export const megaSoftware = [
    { icon: FileText, title: "PDF Tools", desc: "Unlock, merge & convert PDFs", href: "/software/pdf-tools" },
    { icon: Mail, title: "Email Migration", desc: "Convert MBOX emails to PDF", href: "/software/email-migration" },
    { icon: Inbox, title: "IMAP Backup", desc: "Backup your IMAP emails", href: "/software/imap-backup" },
    { icon: HardDrive, title: "Gmail Backup", desc: "Backup Gmail to PST, PDF, MBOX & more", href: "/software/gmail-backup" },
];
export const softwareCategories = [
    {
        label: "PDF Tools",
        technologies: [
            { name: "PDF Unlocker (Unlock, merge & convert PDFs)", href: "/software/pdf-unlocker" },
            { name: "PDF Bates Numbering (Add Bates stamps for legal & e-discovery)", href: "/software/pdf-bates-numbering" },
        ],
    },
    {
        label: "Email Migration",
        technologies: [
            { name: "MBox to PDF (Convert MBOX emails to PDF)", href: "/software/mbox-to-pdf" },
        ],
    },
    {
        label: "IMAP Backup",
        technologies: [
            { name: "IMAP Backup (Backup your IMAP emails)", href: "/software/imap-backup-tool" },
        ],
    },
    {
        label: "Gmail Backup",
        technologies: [
            { name: "Gmail Backup Tool (Backup Gmail to PST, PDF, MBOX & more)", href: "/software/gmail-backup-tool" },
        ],
    },
];
export const megaServices = [
    { icon: Globe, title: "Web & Software Development", desc: "Custom web apps built for performance & growth", href: "/services/web-development" },
    { icon: Smartphone, title: "Mobile App Development", desc: "Native & cross-platform mobile solutions", href: "/services/mobile-development" },
    { icon: Brain, title: "AI & ML Development", desc: "Intelligent automation & predictive analytics", href: "/services/ai-development" },
    { icon: ShoppingCart, title: "E-commerce Solutions", desc: "Scalable online stores & marketplaces", href: "/services/ecommerce" },
    { icon: Code2, title: "Software Product Engineering", desc: "End-to-end product development & launch", href: "/services/product-engineering" },
    { icon: Users, title: "Dedicated Teams", desc: "On-demand skilled developers & engineers", href: "/services/dedicated-teams" },
];
