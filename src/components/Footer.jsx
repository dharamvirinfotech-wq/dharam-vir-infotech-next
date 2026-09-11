import Image from "next/image";
import { Link } from "@/lib/router-compat";
import { Phone, Mail, MapPin, ShieldCheck, Award, ArrowUpRight, ArrowRight, Linkedin, Twitter, Facebook, Instagram, Youtube, Github } from "lucide-react";
import { motion } from "framer-motion";

const footerServices = [
  { label: "Custom Software Development", href: "/services" },
  { label: "Web App Development", href: "/services" },
  { label: "Mobile App Development", href: "/services" },
  { label: "AI & Machine Learning", href: "/services" },
  { label: "Cloud & DevOps", href: "/services" },
  { label: "UI/UX Design", href: "/services" },
];

const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/portfolio" },
  { label: "Career Openings", href: "/career" },
  { label: "Blog & Insights", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const socials = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:bg-blue-600" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "hover:bg-blue-500" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-pink-600" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter / X", color: "hover:bg-slate-600" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube", color: "hover:bg-red-600" },
];

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden border-t border-slate-800/60 select-none">

      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[250px] bg-blue-600/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Newsletter Strip */}
      <div className="border-b border-slate-800/70 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-white">
                Ready to Build Something Great?
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                Let's discuss your project and deliver a world-class solution.
              </p>
            </div>
            <Link to="/contact"
              className="inline-flex items-center gap-2 whitespace-nowrap bg-accent text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-orange-500 transition-all duration-300 shadow-lg shadow-accent/20 flex-shrink-0 group">
              Start a Project
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Brand Column — takes 4 of 12 */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center px-4 py-2.5 rounded-2xl bg-white shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300 group">
              <Image src="/logo.png" alt="Dharam Vir Infotech" width={200} height={42} className="h-10 sm:h-11 max-w-[200px] w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xs">
              Empowering global startups & enterprises with innovative IT solutions — custom software, AI integrations, cloud architecture, and top-tier tech talent.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full">
                <ShieldCheck size={12} /> NDA Protected
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full">
                <Award size={12} /> 50+ Projects Delivered
              </span>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-3">Follow Us</p>
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className={`w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-transparent transition-all duration-300 ${s.color}`}>
                    <s.icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Services Column — takes 3 of 12 */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-extrabold text-[11px] uppercase tracking-widest text-accent">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {footerServices.map((item) => (
                <li key={item.label}>
                  <Link to={item.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-white hover:pl-1.5 transition-all duration-200 flex items-center gap-1.5 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column — takes 2 of 12 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-extrabold text-[11px] uppercase tracking-widest text-accent">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-white hover:pl-1.5 transition-all duration-200 flex items-center gap-1.5 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column — takes 3 of 12 */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-extrabold text-[11px] uppercase tracking-widest text-accent">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+918750299299"
                  className="flex items-start gap-3 group">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <Phone size={14} className="text-accent group-hover:text-white transition-colors" />
                  </span>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Call Us</p>
                    <p className="text-xs sm:text-sm text-slate-300 group-hover:text-white transition-colors font-mono">+91 8750 299 299</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@dharamvirinfotech.com"
                  className="flex items-start gap-3 group">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <Mail size={14} className="text-accent group-hover:text-white transition-colors" />
                  </span>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Email Us</p>
                    <p className="text-xs text-slate-300 group-hover:text-white transition-colors break-all font-mono">info@dharamvirinfotech.com</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-accent" />
                  </span>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Office</p>
                    <p className="text-xs text-slate-400 leading-relaxed">Rani Laxmibai Nagar,<br />Greater Noida, UP 201009</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/70 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} <span className="text-slate-400 font-semibold">Dharam Vir Infotech Pvt. Ltd.</span> All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-5 text-xs text-slate-500">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-slate-700">|</span>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="text-slate-700">|</span>
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
