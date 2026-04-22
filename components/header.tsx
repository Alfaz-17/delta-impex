"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ChevronDown, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);
  const [navData, setNavData] = useState<any[]>([]);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (!isHome) {
        setIsScrolled(true);
      } else {
        setIsScrolled(window.scrollY > 50);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const fetchNavData = async () => {
      try {
        const [divRes, catRes] = await Promise.all([
          fetch("/api/divisions"),
          fetch("/api/categories")
        ]);
        
        const divisions = await divRes.json();
        const categories = await catRes.json();

        const structuredData = divisions.map((div: any) => ({
          ...div,
          categories: categories.filter((cat: any) => {
            const divId = typeof cat.division === 'string' ? cat.division : cat.division?._id;
            return divId === div._id;
          })
        }));

        setNavData(structuredData);
      } catch (error) {
        console.error("Error fetching nav data:", error);
      }
    };

    fetchNavData();
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { 
      label: "Marine & Industrial", 
      dropdownId: "marine",
      slug: "marine-industrial",
      divisions: navData.filter(d => d.slug === "marine-industrial")
    },
    { 
      label: "RO Solutions", 
      dropdownId: "ro",
      slug: "ro-solutions",
      divisions: navData.filter(d => d.slug === "ro-solutions")
    },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <>
      <header 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] md:w-[95%] max-w-6xl transition-all duration-500 ${
          isScrolled 
            ? "bg-background/90 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-3" 
            : "bg-transparent py-4"
        }`}
      >
        {!isScrolled && (
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 to-transparent rounded-full blur-xl opacity-50" />
        )}
        
        <div className="flex items-center justify-between px-6 md:px-10">
          <Link 
            href="/" 
            className="relative h-10 w-48 md:w-56 transition-transform hover:scale-105 duration-300"
          >
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[320px] h-[120px] pointer-events-none">
              <Image
                src="/logo.png"
                alt="Delta Impex Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:gap-10 md:flex">
            {navLinks.map((link) => {
              if (link.dropdownId) {
                const isMarine = link.dropdownId === "marine";
                return (
                  <div 
                    key={link.dropdownId}
                    onMouseEnter={() => setActiveDropdown(link.dropdownId!)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="relative"
                  >
                    <Link
                      href={`/divisions/${link.slug}`}
                      className={`flex items-center gap-1.5 btn-text transition-all group whitespace-nowrap ${
                        isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-accent drop-shadow-sm"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.dropdownId ? "rotate-180" : ""}`} />
                    </Link>

                    <AnimatePresence>
                      {activeDropdown === link.dropdownId && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.95 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className={`absolute top-full left-1/2 -translate-x-1/2 pt-6 ${isMarine ? "w-[600px]" : "w-[300px]"}`}
                        >
                          <div className={`bg-background/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden ${isMarine ? "grid grid-cols-2 gap-x-8 gap-y-6" : "flex flex-col gap-6"}`}>
                            {link.divisions.map((div: any) => (
                              <div key={div._id} className="space-y-4">
                                <h3 className="label-tech text-accent !text-[11px] mb-2">{div.name}</h3>
                                <div className="flex flex-col gap-2">
                                  {div.categories.map((cat: any) => (
                                    <Link
                                      key={cat._id}
                                      href={`/products?categoryId=${cat._id}`}
                                      className="group/item flex items-center justify-between text-sm py-1 transition-all hover:text-primary text-muted-foreground hover:translate-x-1"
                                    >
                                      <span>{cat.name}</span>
                                      <ChevronRight size={12} className="opacity-0 group-hover/item:opacity-40 transition-opacity" />
                                    </Link>
                                  ))}
                                  {div.categories.length === 0 && (
                                    <p className="text-[10px] text-muted-foreground italic lowercase">Syncing inventory...</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={`relative btn-text whitespace-nowrap transition-all group ${
                    isActive 
                      ? (isScrolled ? "text-primary" : "text-white") 
                      : isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-accent drop-shadow-sm"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className={`hidden md:flex px-6 py-2.5 btn-text transition-all rounded-full ${
                isScrolled 
                  ? "bg-foreground text-background hover:bg-foreground/90" 
                  : "bg-white text-foreground hover:bg-white/90 shadow-xl"
              }`}
            >
              Get a Quote
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 transition-all md:hidden rounded-full z-[110] relative ${
                isMenuOpen 
                  ? "bg-primary text-white" 
                  : isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
              }`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Modern Sidebar Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm md:hidden"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed top-0 right-0 bottom-0 z-[90] w-[85%] max-w-sm bg-background border-l border-border shadow-2xl md:hidden overflow-y-auto flex flex-col"
            >
              <div className="p-8 pt-24 space-y-8 flex-1">
                {navLinks.map((link, i) => {
                  const isDropdown = !!link.dropdownId;
                  const isExpanded = expandedMobileId === link.label;

                  return (
                    <div key={link.label} className="space-y-4">
                      {isDropdown ? (
                        <div className="space-y-4">
                          <button
                            onClick={() => setExpandedMobileId(isExpanded ? null : link.label)}
                            className="w-full flex items-center justify-between group py-2"
                          >
                            <div className="space-y-1 text-left">
                              <p className="label-tech !mb-0 text-muted-foreground">0{i + 1}</p>
                              <h2 className="heading-section text-foreground group-hover:text-primary transition-colors">{link.label}</h2>
                            </div>
                            <ChevronDown size={20} className={`text-muted-foreground transition-transform duration-500 ${isExpanded ? "rotate-180 text-primary" : ""}`} />
                          </button>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 space-y-6 pt-2 pb-6 border-l border-primary/20 ml-1">
                                  {link.divisions.map((div: any) => (
                                    <div key={div._id} className="space-y-3">
                                      <Link 
                                        href={`/divisions/${div.slug}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="label-tech !text-[9px] text-accent hover:text-primary transition-colors tracking-[0.2em] block"
                                      >
                                        {div.name} →
                                      </Link>
                                      <div className="flex flex-col gap-4 pl-2">
                                        {div.categories.map((cat: any) => (
                                          <Link
                                            key={cat._id}
                                            href={`/products?categoryId=${cat._id}`}
                                            className="text-lg font-display text-muted-foreground hover:text-primary transition-colors flex items-center gap-3"
                                            onClick={() => setIsMenuOpen(false)}
                                          >
                                            <span className="w-1.5 h-1.5 bg-accent/30 rounded-full" />
                                            {cat.name}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={link.href!}
                          className="group flex items-center justify-between py-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="space-y-1">
                            <p className={`label-tech !mb-0 ${pathname === link.href ? "text-primary" : "text-muted-foreground"}`}>0{i + 1}</p>
                            <h2 className={`heading-section group-hover:translate-x-2 transition-transform duration-300 ${pathname === link.href ? "text-primary" : "text-foreground"}`}>
                              {link.label}
                            </h2>
                          </div>
                          <ChevronRight className={`transition-all ${pathname === link.href ? "text-primary translate-x-1" : "text-muted-foreground opacity-0 group-hover:opacity-100"}`} />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sidebar Footer */}
              <div className="p-8 border-t border-border bg-muted/20 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <Phone size={18} className="text-primary" />
                    <span className="text-sm font-medium">+971 [Number]</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <Mail size={18} className="text-primary" />
                    <span className="text-sm font-medium">sales@deltaimpex.co</span>
                  </div>
                </div>
                
                <Link
                  href="/contact"
                  className="w-full bg-primary py-5 text-center label-tech !text-white !mb-0 rounded-2xl block shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Request Technical Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
