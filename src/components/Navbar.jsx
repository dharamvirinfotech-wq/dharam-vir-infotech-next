import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Link, useNavigate, useLocation } from "@/lib/router-compat";
import { Phone, Mail, Menu, X, ChevronDown, ArrowRight, LogIn, LogOut, LayoutDashboard, UserCircle, Home, Briefcase, Globe, Users, BookOpen, MessageCircle, Code2, FolderOpen, Info } from "lucide-react";
import { navLinks, megaServices, megaTechnologies, megaExplore, promotionCategories, softwareCategories, } from "@/data/navigation";
import { useAuth } from "@/context/AuthContext";

// Icon map for mobile drawer nav links
const NAV_ICONS = {
  "/":        Home,
  "/services": Briefcase,
  "/about":    Info,
  "/portfolio": FolderOpen,
  "/technologies": Code2,
  "/career":   Users,
  "/contact":  MessageCircle,
  "/blog":     BookOpen,
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState(null);
  const [activePromoCategory, setActivePromoCategory] = useState(0);
  const [activeSoftwareCategory, setActiveSoftwareCategory] = useState(0);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const megaTimeout = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMenuOpen(false);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when sidebar open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleMegaEnter = (key) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setActiveMega(key);
  };
  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 200);
  };
  const getMegaItems = (key) => key === "services" ? megaServices : key === "explore" ? megaExplore : megaTechnologies;
  const getMegaTitle = (key) => key === "services" ? "Our Services" : key === "explore" ? "Who We Are & Quick Links" : "Our Technologies";

  const isActiveLink = (href, hasMega) => {
    if (hasMega === "explore" && ["/about", "/technologies", "/blog", "/faq", "/privacy-policy", "/terms-conditions"].includes(location.pathname)) return true;
    if (href === "/") return location.pathname === "/";
    return location.pathname === href || location.pathname.startsWith(href);
  };

  const renderGridMega = (megaKey) => (
    <div className="w-[90vw] sm:w-[580px] md:w-[680px] max-w-[calc(100vw-2rem)] max-h-[80vh] overflow-y-auto bg-background rounded-xl shadow-2xl border border-border p-4 sm:p-6 custom-scrollbar">
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <h3 className="font-display font-bold text-primary text-xs sm:text-sm uppercase tracking-wider">{getMegaTitle(megaKey)}</h3>
        <Link to={navLinks.find((l) => l.hasMega === megaKey)?.href || "/"} onClick={() => setActiveMega(null)} className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1">
          View All <ArrowRight size={12} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {getMegaItems(megaKey).map((item) => (
          <Link key={item.title} to={item.href} onClick={() => setActiveMega(null)} className="group flex items-start gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-muted transition-colors">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <item.icon className="text-accent" size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-primary group-hover:text-accent transition-colors truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-border flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Need a custom solution?</p>
        <Link to="/contact" onClick={() => setActiveMega(null)} className="text-xs font-semibold bg-accent text-accent-foreground px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-accent/90 transition-colors">
          Talk To Experts
        </Link>
      </div>
    </div>
  );

  const renderCategoryMega = (categories, activeCat, setActiveCat, viewAllHref, viewAllLabel) => (
    <div className="w-[92vw] sm:w-[680px] md:w-[780px] max-w-[calc(100vw-2rem)] max-h-[82vh] overflow-y-auto bg-background rounded-xl shadow-2xl border border-border overflow-hidden custom-scrollbar">
      <div className="flex flex-col sm:flex-row min-h-[340px]">
        <div className="w-full sm:w-[210px] md:w-[240px] bg-muted/50 border-b sm:border-b-0 sm:border-r border-border p-3 sm:p-4 flex-shrink-0">
          <h3 className="font-display font-bold text-primary text-xs uppercase tracking-wider mb-3">Browse Categories</h3>
          <div className="flex sm:flex-col gap-1 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 custom-scrollbar">
            {categories.map((cat, idx) => (
              <button key={cat.label} onMouseEnter={() => setActiveCat(idx)} onClick={() => setActiveCat(idx)}
                className={`text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap sm:whitespace-normal flex-shrink-0 sm:flex-shrink ${activeCat === idx ? "bg-accent text-accent-foreground shadow-sm" : "text-foreground hover:bg-muted"}`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/50">
              <h4 className="font-display font-bold text-primary text-sm truncate">{categories[activeCat]?.label}</h4>
              <Link to={viewAllHref} onClick={() => setActiveMega(null)} className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1 flex-shrink-0 ml-2">
                View All <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 max-h-[260px] sm:max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
              {categories[activeCat]?.technologies.map((tech) => (
                <Link key={tech.name} to={tech.href} onClick={() => setActiveMega(null)} className="group flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-muted transition-colors">
                  <ArrowRight size={14} className="text-accent opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-foreground group-hover:text-accent transition-colors line-clamp-1">{tech.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Can't find what you need?</p>
            <Link to="/contact" onClick={() => setActiveMega(null)} className="text-xs font-semibold bg-accent text-accent-foreground px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-accent/90 transition-colors flex-shrink-0 ml-2">
              Talk To Experts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Main nav */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border py-1.5" : "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60 py-2"}`}>
        <div className="container mx-auto max-w-7xl flex items-center justify-between py-1 px-4 relative">
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <Image src="/logo.png" alt="Dharam Vir Infotech" width={220} height={80} className="h-14 md:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105" priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3">
            {navLinks.map((link) => link.hasMega ? (
              <div key={link.href} className="py-1" onMouseEnter={() => handleMegaEnter(link.hasMega)} onMouseLeave={handleMegaLeave}>
                <Link to={link.href} className={`text-[15px] font-semibold transition-colors inline-flex items-center gap-1 px-3 py-2 ${isActiveLink(link.href, link.hasMega) ? "text-accent font-bold" : activeMega === link.hasMega ? "text-accent font-bold" : "text-slate-800 hover:text-accent"}`}>
                  {link.label}
                  <ChevronDown size={15} className={`transition-transform duration-200 ${activeMega === link.hasMega ? "rotate-180 text-accent" : ""}`} />
                </Link>
              </div>
            ) : (
              <Link key={link.href} to={link.href} className={`text-[15px] font-semibold transition-colors px-3 py-2 ${isActiveLink(link.href) ? "text-accent font-bold" : "text-slate-800 hover:text-accent"}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Mega Dropdown */}
          <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 transition-all duration-200 ${activeMega ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"}`}
            onMouseEnter={() => activeMega && handleMegaEnter(activeMega)} onMouseLeave={handleMegaLeave}>
            {activeMega === "promotion"
              ? renderCategoryMega(promotionCategories, activePromoCategory, setActivePromoCategory, "/promotion", "Promotion Services")
              : activeMega === "software"
                ? renderCategoryMega(softwareCategories, activeSoftwareCategory, setActiveSoftwareCategory, "/software", "Software Products")
                : activeMega
                  ? renderGridMega(activeMega)
                  : null}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {user ? (
              <div className="relative" onMouseEnter={() => setUserMenuOpen(true)} onMouseLeave={() => setUserMenuOpen(false)}>
                <button className="inline-flex items-center gap-2 border border-border bg-muted/60 px-3.5 py-2 rounded-full text-sm font-semibold text-slate-800 hover:bg-slate-200 transition-colors backdrop-blur-md">
                  <UserCircle size={18} className="text-accent" />
                  <span className="max-w-[140px] truncate">{user.full_name}</span>
                  <span className="text-[10px] uppercase tracking-wider bg-accent/10 text-accent px-1.5 py-0.5 rounded">{user.role}</span>
                  <ChevronDown size={14} />
                </button>
                <div className={`absolute right-0 top-full pt-3 transition-all duration-200 z-50 ${userMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"}`}>
                  <div className="w-56 bg-background rounded-xl shadow-2xl border border-border p-2">
                    <div className="px-3 py-2 border-b border-border mb-1">
                      <p className="text-xs text-muted-foreground">Signed in as</p>
                      <p className="text-sm font-semibold text-primary truncate">{user.email}</p>
                    </div>
                    <Link to="/panel" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted">
                      <LayoutDashboard size={16} className="text-accent" /> My Panel
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10">
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/contact" className="inline-flex items-center gap-2.5 bg-accent text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 group">
                <span>Contact Us</span>
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button className="lg:hidden text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Navigation Menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ========== MOBILE RIGHT SIDEBAR DRAWER ========== */}

      {/* Backdrop overlay — above WhatsApp z-9999 */}
      <div
        className={`fixed inset-0 z-[10000] bg-slate-950/60 backdrop-blur-sm transition-all duration-300 lg:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Right Sidebar Drawer — highest layer */}
      <aside className={`fixed top-0 right-0 h-full w-[85vw] max-w-[340px] z-[10001] bg-white shadow-2xl flex flex-col transition-all duration-300 ease-in-out lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white flex-shrink-0">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <Image src="/logo.png" alt="Dharam Vir Infotech" width={140} height={36} className="h-9 w-auto object-contain" />
          </Link>
          <button onClick={() => setMenuOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors" aria-label="Close Menu">
            <X size={20} />
          </button>
        </div>

        {/* Nav Links — Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-3">
          {navLinks.map((link, idx) => link.hasMega ? (
            <div key={link.href} className="border-b border-slate-100 last:border-0">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === link.hasMega ? null : link.hasMega)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-[15px] font-semibold transition-colors group ${isActiveLink(link.href, link.hasMega) ? "text-accent" : "text-slate-800 hover:text-accent"}`}>
                {(() => { const Icon = NAV_ICONS[link.href] || Globe; return (
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${ isActiveLink(link.href, link.hasMega) ? "bg-accent text-white" : "bg-slate-100 text-slate-500 group-hover:bg-accent/10 group-hover:text-accent"}`}>
                    <Icon size={17} />
                  </span>
                ); })()}
                <span className="flex-1 text-left">{link.label}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${mobileExpanded === link.hasMega ? "rotate-180 text-accent" : "text-slate-400"}`} />
              </button>

              {/* Expanded Sub-Links */}
              <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === link.hasMega ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-3 pb-3 space-y-1 bg-slate-50/70">
                  {(link.hasMega === "promotion" || link.hasMega === "software") ? (
                    (link.hasMega === "promotion" ? promotionCategories : softwareCategories).map((cat) => (
                      <div key={cat.label} className="border border-border/60 rounded-lg overflow-hidden bg-white">
                        <button onClick={() => setMobileSubExpanded(mobileSubExpanded === cat.label ? null : cat.label)}
                          className="w-full flex items-center justify-between p-2.5 text-xs font-bold text-primary hover:text-accent bg-muted/40">
                          <span>{cat.label}</span>
                          <ChevronDown size={13} className={`transition-transform duration-200 ${mobileSubExpanded === cat.label ? "rotate-180 text-accent" : ""}`} />
                        </button>
                        {mobileSubExpanded === cat.label && (
                          <div className="p-2 space-y-1 bg-background border-t border-border/40">
                            {cat.technologies.map((tech) => (
                              <Link key={tech.name} to={tech.href} onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-2 py-1.5 px-2 text-xs text-foreground/80 hover:text-accent rounded hover:bg-muted">
                                <ArrowRight size={12} className="text-accent flex-shrink-0" />
                                <span>{tech.name}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="grid grid-cols-1 gap-1 pt-1">
                      {getMegaItems(link.hasMega).map((item) => (
                        <Link key={item.title} to={item.href} onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 p-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-accent hover:bg-white transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <item.icon size={15} className="text-accent" />
                          </div>
                          <div>
                            <p className="font-semibold text-primary text-xs">{item.title}</p>
                            <p className="text-[10px] text-muted-foreground line-clamp-1">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  <Link to={link.href} onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 text-xs font-semibold bg-accent text-white rounded-xl hover:bg-primary transition-colors mt-2">
                    <span>View All {link.label}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3.5 text-[15px] font-semibold border-b border-slate-100 last:border-0 transition-colors group ${isActiveLink(link.href) ? "text-accent" : "text-slate-800 hover:text-accent"}`}>
              {(() => { const Icon = NAV_ICONS[link.href] || Globe; return (
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${ isActiveLink(link.href) ? "bg-accent text-white" : "bg-slate-100 text-slate-500 group-hover:bg-accent/10 group-hover:text-accent"}`}>
                  <Icon size={17} />
                </span>
              ); })()}
              {link.label}
              {isActiveLink(link.href) && <span className="ml-auto w-1.5 h-6 rounded-full bg-accent" />}
            </Link>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="flex-shrink-0 px-5 py-5 border-t border-slate-100 space-y-3 bg-white">
          {user ? (
            <>
              <div className="px-3.5 py-3 rounded-xl bg-accent/5 border border-accent/15">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Signed in as</p>
                <p className="text-sm font-bold text-primary truncate mt-0.5">{user.full_name}</p>
                <p className="text-xs text-accent font-semibold uppercase tracking-wider">{user.role}</p>
              </div>
              <Link to="/panel" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 w-full border border-accent text-accent py-2.5 rounded-xl text-sm font-bold hover:bg-accent hover:text-white transition-all duration-300">
                <LayoutDashboard size={16} /> My Panel
              </Link>
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full border border-red-300 text-red-500 py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 transition-all duration-300">
                <LogOut size={16} /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/contact" onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-accent text-white font-bold py-3 rounded-xl text-sm hover:bg-primary transition-all duration-300 shadow-lg shadow-accent/20 group">
                <MessageCircle size={16} />
                Contact Us
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a href="tel:+918750299299"
                className="flex items-center justify-center gap-2 w-full border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">
                <Phone size={14} className="text-accent" />
                +91 8750 299 299
              </a>
            </>
          )}
        </div>
      </aside>
    </>
  );
};
export default Navbar;
