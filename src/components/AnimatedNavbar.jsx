import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Link, useNavigate, useLocation } from "@/lib/router-compat";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Send,
  UserCircle,
  LayoutDashboard,
  LogOut,
  Globe,
  Briefcase,
  Info,
  FolderOpen,
  Code2,
  Users,
  MessageCircle,
  BookOpen,
} from "lucide-react";
import {
  navLinks,
  megaServices,
  megaExplore,
  softwareCategories,
} from "@/data/navigation";
import { useAuth } from "@/context/AuthContext";

const NAV_ICONS = {
  "/": HomeIcon,
  "/services": Briefcase,
  "/about": Info,
  "/portfolio": FolderOpen,
  "/career": Users,
  "/contact": MessageCircle,
  "/blog": BookOpen,
};

function HomeIcon(props) {
  return (
    <svg {...props} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

const AnimatedNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile drawer
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(false); // Desktop quick-info drawer
  const [activeMega, setActiveMega] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const megaTimeout = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMenuOpen(false);
    setDesktopSidebarOpen(false);
    navigate("/", { replace: true });
  };

  // Track scroll position for sticky header background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setDesktopSidebarOpen(false);
  }, [location.pathname]);

  // Lock scroll when either drawer is open
  useEffect(() => {
    if (menuOpen || desktopSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, desktopSidebarOpen]);

  const handleMegaEnter = (key) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setActiveMega(key);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 200);
  };

  const getMegaItems = (key) =>
    key === "services" ? megaServices : megaExplore;

  const isActiveLink = (href, hasMega) => {
    if (hasMega === "explore") {
      return ["/career", "/blog", "/faq", "/mission-vision", "/privacy-policy", "/terms-conditions"].some(
        (path) => location.pathname === path || location.pathname.startsWith(path + "/")
      );
    }
    if (hasMega === "services") {
      return location.pathname === "/services" || location.pathname.startsWith("/services/");
    }
    if (href === "/") return location.pathname === "/";
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subscriberEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setSubscriberEmail("");
    }, 4000);
  };

  const isHomePage = location.pathname === "/";
  const showSolidNavbar = scrolled || !isHomePage;

  return (
    <>
      {/* 
        Sticky Animated Header:
        - Home page top: Transparent
        - Home page scrolled: Solid white with shadow
        - Other pages: Always solid white with shadow and clean border
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${showSolidNavbar
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5"
            : "bg-transparent border-b border-transparent py-3 sm:py-4.5"
          }`}
      >
        <div className="container mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.png"
              alt="Dharam Vir Infotech"
              width={160}
              height={44}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) =>
              link.hasMega ? (
                <div
                  key={link.label}
                  className="py-1"
                  onMouseEnter={() => handleMegaEnter(link.hasMega)}
                  onMouseLeave={handleMegaLeave}
                >
                  <Link
                    to={link.href}
                    className={`text-[15px] font-semibold transition-colors inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full ${isActiveLink(link.href, link.hasMega)
                      ? "text-accent font-bold"
                      : activeMega === link.hasMega
                        ? "text-accent font-bold"
                        : "text-slate-800 hover:text-accent hover:bg-slate-50/80"
                      }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${activeMega === link.hasMega ? "rotate-180 text-accent" : "text-slate-400"
                        }`}
                    />
                  </Link>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-[15px] font-semibold transition-colors px-3.5 py-2 rounded-full ${isActiveLink(link.href)
                    ? "text-accent font-bold"
                    : "text-slate-800 hover:text-accent hover:bg-slate-50/80"
                    }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Desktop Contact Us Button (Hidden on Mobile) */}
            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-primary text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-300 shadow-md shadow-accent/25 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <span>CONTACT TODAY</span>
              </Link>
            </div>

            {/* 
              Desktop Sidebar Hamburger Toggle (3-line Icon):
              Opens Desktop Information Drawer (Hidden on Mobile)
            */}
            <button
              onClick={() => setDesktopSidebarOpen(true)}
              className="hidden lg:flex w-10 h-10 rounded-xl bg-slate-100/90 hover:bg-emerald-50 text-slate-800 hover:text-emerald-600 border border-slate-200/70 items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
              aria-label="Open Company Info Sidebar"
              title="Quick Info & Contact"
            >
              <Menu size={22} className="stroke-[2.2]" />
            </button>

            {/* Mobile Hamburger (Only visible on small screens) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 flex items-center justify-center transition-colors"
              aria-label="Toggle Mobile Navigation"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Desktop Mega Dropdown */}
          <div
            className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 transition-all duration-200 ${activeMega
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2 pointer-events-none"
              }`}
            onMouseEnter={() => activeMega && handleMegaEnter(activeMega)}
            onMouseLeave={handleMegaLeave}
          >
            {activeMega && (
              <div className="w-[90vw] sm:w-[580px] md:w-[680px] max-w-[calc(100vw-2rem)] max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 sm:p-6 custom-scrollbar">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <h3 className="font-display font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider">
                    {activeMega === "services" ? "Our Services" : "Explore More"}
                  </h3>
                  <Link
                    to={navLinks.find((l) => l.hasMega === activeMega)?.href || "/"}
                    onClick={() => setActiveMega(null)}
                    className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
                  >
                    View All <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {getMegaItems(activeMega).map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      onClick={() => setActiveMega(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-white text-accent transition-colors">
                        <item.icon size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-accent transition-colors truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 1. DESKTOP INFORMATION SIDEBAR DRAWER (Only on Desktop)   */}
      {/* ========================================================= */}
      <div
        className={`fixed inset-0 z-[10000] bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 hidden lg:block ${desktopSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        onClick={() => setDesktopSidebarOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-[380px] xl:w-[400px] z-[10001] bg-white shadow-2xl hidden lg:flex flex-col transition-transform duration-300 ease-in-out border-l border-slate-100 ${desktopSidebarOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-slate-100">
          <Link to="/" onClick={() => setDesktopSidebarOpen(false)}>
            <Image
              src="/logo.png"
              alt="Dharam Vir Infotech"
              width={160}
              height={50}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setDesktopSidebarOpen(false)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Desktop Sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6 custom-scrollbar text-slate-700">
          {/* Mission Description */}
          <p className="text-slate-600 text-sm leading-relaxed">
            By entrusting your digital projects to us, you gain the freedom to concentrate on what
            truly matters: your business growth. Let's collaborate to bring your vision to life.
          </p>

          {/* Contact Details Block */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-bold text-primary font-display">Contacts</h3>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <Phone size={18} />
              </div>
              <a
                href="tel:+918750299299"
                className="text-sm font-semibold text-slate-800 hover:text-accent transition-colors"
              >
                +91 8750 299 299
              </a>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <Mail size={18} />
              </div>
              <a
                href="mailto:contact@dharamvirinfotech.com"
                className="text-sm font-semibold text-slate-800 hover:text-accent transition-colors truncate"
              >
                contact@dharamvirinfotech.com
              </a>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={18} />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-snug">
                Sector 63, Noida, Uttar Pradesh, India - 201301
              </p>
            </div>
          </div>

          {/* Newsletter / Sign Up Strip - Brand Theme */}
          <div className="pt-4">
            <form onSubmit={handleSubscribe} className="flex items-center rounded-xl border border-primary/20 overflow-hidden focus-within:ring-2 focus-within:ring-accent">
              <input
                type="email"
                placeholder="Email Address"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                required
                className="w-full px-3.5 py-3 text-xs sm:text-sm outline-hidden text-slate-800 bg-white"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-accent text-white font-bold text-xs uppercase tracking-wider px-5 py-3 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                {subscribed ? "SENT!" : "SIGN UP"}
              </button>
            </form>
            {subscribed && (
              <p className="text-accent text-xs font-semibold mt-2">
                Thank you for subscribing! We'll stay in touch.
              </p>
            )}
          </div>
        </div>

        {/* Drawer Bottom Action */}
        <div className="p-7 border-t border-slate-100">
          <Link
            to="/contact"
            onClick={() => setDesktopSidebarOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-primary text-white font-bold py-3.5 rounded-full text-sm transition-all duration-300 shadow-lg shadow-accent/20"
          >
            <span>Request a Free Quote</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. MOBILE NAVIGATION DRAWER (Only on Mobile screens)      */}
      {/* ========================================================= */}
      <div
        className={`fixed inset-0 z-[10000] bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-[340px] z-[10001] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
          }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <Image
              src="/logo.png"
              alt="Dharam Vir Infotech"
              width={180}
              height={80}
              className="h-20 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
            aria-label="Close Menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Nav List with Clickable Accordion Submenus */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-3">
          {navLinks.map((link) => {
            const Icon = NAV_ICONS[link.href] || Globe;
            const hasSubmenu = Boolean(link.hasMega);
            const isExpanded = mobileExpanded === link.hasMega;

            if (hasSubmenu) {
              return (
                <div key={link.label} className="border-b border-slate-100 last:border-0">
                  {/* Clickable Parent Menu Item */}
                  <button
                    type="button"
                    onClick={() => setMobileExpanded(isExpanded ? null : link.hasMega)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-[15px] font-semibold transition-colors group ${isActiveLink(link.href, link.hasMega) || isExpanded
                      ? "text-accent font-bold"
                      : "text-slate-800 hover:text-accent"
                      }`}
                  >
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isActiveLink(link.href, link.hasMega) || isExpanded
                        ? "bg-accent text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-accent/10 group-hover:text-accent"
                        }`}
                    >
                      <Icon size={17} />
                    </span>
                    <span className="flex-1 text-left">{link.label}</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${isExpanded ? "rotate-180 text-accent" : "text-slate-400"
                        }`}
                    />
                  </button>

                  {/* Submenu Accordion Drawer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="px-3 pb-3 pt-1 space-y-1 bg-slate-50/80 rounded-b-xl mx-2 border border-slate-100/80">
                      {getMegaItems(link.hasMega).map((item) => {
                        const SubIcon = item.icon || ArrowRight;
                        return (
                          <Link
                            key={item.title}
                            to={item.href}
                            onClick={() => {
                              setMenuOpen(false);
                              setMobileExpanded(null);
                            }}
                            className="flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-accent hover:bg-white transition-all duration-200 group/sub"
                          >
                            <div className="w-7 h-7 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover/sub:bg-accent group-hover/sub:text-white transition-colors">
                              <SubIcon size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-primary group-hover/sub:text-accent transition-colors truncate">
                                {item.title}
                              </p>
                              {item.desc && (
                                <p className="text-[11px] text-slate-400 font-normal truncate">
                                  {item.desc}
                                </p>
                              )}
                            </div>
                            <ArrowRight size={12} className="text-slate-300 group-hover/sub:text-accent group-hover/sub:translate-x-0.5 transition-all shrink-0" />
                          </Link>
                        );
                      })}

                      {/* View All CTA Link */}
                      <Link
                        to={link.href}
                        onClick={() => {
                          setMenuOpen(false);
                          setMobileExpanded(null);
                        }}
                        className="flex items-center justify-between p-2.5 text-xs font-bold bg-accent text-white rounded-xl hover:bg-primary transition-colors mt-2"
                      >
                        <span>View All {link.label}</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 text-[15px] font-semibold border-b border-slate-100 last:border-0 transition-colors group ${isActiveLink(link.href) ? "text-accent font-bold" : "text-slate-800 hover:text-accent"
                  }`}
              >
                <span
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isActiveLink(link.href)
                    ? "bg-accent text-white"
                    : "bg-slate-100 text-slate-500 group-hover:bg-accent/10 group-hover:text-accent"
                    }`}
                >
                  <Icon size={17} />
                </span>
                <span>{link.label}</span>
                {isActiveLink(link.href) && (
                  <span className="ml-auto w-1.5 h-6 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Footer */}
        <div className="px-5 py-5 border-t border-slate-100 space-y-3 bg-white">
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-primary text-white font-bold py-3 rounded-full text-sm transition-all duration-300 shadow-md shadow-accent/20"
          >
            <span>CONTACT TODAY</span>
            <ArrowRight size={15} />
          </Link>
          <a
            href="tel:+918750299299"
            className="flex items-center justify-center gap-2 w-full border border-slate-200 text-slate-700 font-semibold py-2.5 rounded-full text-sm hover:bg-slate-50 transition-colors"
          >
            <Phone size={14} className="text-accent" />
            +91 8750 299 299
          </a>
        </div>
      </aside>
    </>
  );
};

export default AnimatedNavbar;
