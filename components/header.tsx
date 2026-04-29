"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ChevronDown, Phone, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);
  const [navData, setNavData] = useState<any[]>([]);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
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
      label: "Products",
      dropdownId: "products",
      divisions: navData
    },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <nav className="max-w-full mx-auto px-6 lg:px-12 transition-all duration-500 border-b relative overflow-visible  bg-dark-base/95 backdrop-blur-xl py-6 shadow-md border-white/10">
        {/* Glow line */}
        <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent transition-all duration-500 ${isScrolled ? "opacity-100" : "opacity-60"}`} />
        <div className={`absolute inset-0 bg-gradient-to-b from-accent-blue/8 to-transparent pointer-events-none transition-all duration-500 ${isScrolled ? "opacity-100" : "opacity-40"}`} />

        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[4px] origin-left z-[60] bg-white"
          style={{ scaleX: scrollProgress }}
        />

        <div className="flex items-center justify-between h-[60px] relative z-10">

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="relative h-10 w-32 md:w-48 lg:w-56 transition-transform hover:scale-105 duration-300">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[300px] h-[150px] md:w-[450px] md:h-[200px] mt-2 pointer-events-none">
                <Image
                  src="/logo.png"
                  alt="Delta Impex Logo"
                  fill
                  className="object-contain object-left transition-all duration-500 brightness-0 invert"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              const linkClasses = `text-[10px] font-black uppercase tracking-[0.3em] transition-all group relative ${
                isActive ? "text-white" : "text-white/70 hover:text-white"
              }`;

              if (link.dropdownId) {
                const isProducts = link.dropdownId === "products";
                return (
                  <div
                    key={link.dropdownId}
                    onMouseEnter={() => setActiveDropdown(link.dropdownId!)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="relative group"
                  >
                    <Link href="/products" className={linkClasses}>
                      <span className="flex items-center gap-2">
                        {link.label}
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-300 ${activeDropdown === link.dropdownId ? "rotate-180" : ""}`}
                        />
                      </span>
                      <span className="absolute -bottom-2 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full bg-white" />
                    </Link>

                    <AnimatePresence>
                      {activeDropdown === link.dropdownId && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className={`absolute top-full left-1/2 -translate-x-1/2 z-50 ${isProducts ? "w-[700px]" : "w-[300px]"}`}
                        >
                          {/* Invisible bridge to prevent mouseLeave gap */}
                          <div className="h-6 w-full" />

                          <div className="max-h-[70vh] overflow-y-auto custom-scrollbar pr-4 overscroll-contain"
                            data-lenis-prevent
                            onWheel={(e) => e.stopPropagation()}
                          >
                            <div className={`bg-dark-base relative overflow-hidden border border-white/10 rounded-2xl p-8 shadow-2xl ${isProducts ? "grid grid-cols-2 gap-x-12 gap-y-10" : "flex flex-col gap-8"}`}>
                              {/* Dot Pattern */}
                              <div
                                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                                style={{
                                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(91,155,213,0.4) 1px, transparent 0)',
                                  backgroundSize: '1.5rem 1.5rem'
                                }}
                              />

                              {/* ✅ Divisions mapped directly as grid children */}
                              {link.divisions && link.divisions.length > 0 ? (
                                link.divisions.map((div: any) => (
                                  <div key={div._id} className="space-y-6 relative z-10">
                                    <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                                      <div className="w-2 h-2 bg-accent-blue rounded-full" />
                                      <h3 className="label-tech text-white !text-[12px]">{div.name}</h3>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                      {div.categories && div.categories.length > 0 ? (
                                        div.categories.map((cat: any) => (
                                          <Link
                                            key={cat._id}
                                            href={`/products?categoryId=${cat._id}`}
                                            className="group/item flex items-center justify-between text-sm py-2 px-3 rounded-lg transition-all hover:bg-white/5 hover:text-white text-white/70 hover:translate-x-1"
                                            onClick={() => setActiveDropdown(null)}
                                          >
                                            <span className="font-medium">{cat.name}</span>
                                            <ChevronRight size={12} className="opacity-0 group-hover/item:opacity-60 transition-opacity text-accent-blue" />
                                          </Link>
                                        ))
                                      ) : (
                                        <p className="text-white/50 text-sm">No categories available</p>
                                      )}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="col-span-2 text-center py-8">
                                  <p className="text-white/50 text-sm">Loading categories...</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link key={link.label} href={link.href!} className={linkClasses}>
                  {link.label}
                  <span className={`absolute -bottom-2 left-0 h-[2px] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"} bg-white`} />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:flex px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-full shadow-xl bg-white text-[#1B3A5C] hover:bg-white/90"
            >
              Quote
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 transition-all rounded-full z-[110] relative ${
                isMenuOpen ? "bg-[#1B3A5C] text-white" : "text-white hover:bg-white/10"
              }`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-md lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[90] w-[85%] max-w-sm bg-background border-l border-primary/20 shadow-2xl lg:hidden flex flex-col h-[100dvh] overflow-hidden"
              data-lenis-prevent
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(30,95,166,0.08)_1px,transparent_0)] bg-[size:30px_30px] opacity-40 pointer-events-none" />

              <div className="shrink-0 p-8 pt-12 border-b border-primary/10 flex items-center justify-between bg-background/80 backdrop-blur-md relative">
                <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-primary/40" />
                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-primary/40" />
                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-primary/40" />
                <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-primary/40" />
                <h2 className="font-sans text-xl font-black tracking-tight uppercase text-foreground relative z-10">
                  DELTA <span className="text-primary italic">Impex</span>
                </h2>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-primary/10 rounded-full transition-colors relative z-10">
                  <X size={20} />
                </button>
              </div>

              <div className="px-8 py-2 border-b border-primary/5 bg-primary/5 flex justify-between items-center font-mono">
                <span className="text-[7px] text-primary/60 tracking-[0.2em] uppercase">Status: Operating</span>
                <span className="text-[7px] text-primary/60 tracking-[0.2em] uppercase">Log: AX-774</span>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12 custom-scrollbar relative z-10 overscroll-contain" data-lenis-prevent>
                <div className="space-y-6">
                  {navLinks.map((link, i) => {
                    const isDropdown = !!link.dropdownId;
                    const isExpanded = expandedMobileId === link.label;

                    return (
                      <div key={link.label} className="space-y-4">
                        <div className="relative">
                          <button
                            onClick={() => isDropdown ? setExpandedMobileId(isExpanded ? null : link.label) : setIsMenuOpen(false)}
                            className="w-full flex items-center justify-between group py-2"
                          >
                            <div className="space-y-1 text-left">
                              <p className="font-mono text-[8px] text-primary/60 tracking-widest">0{i + 1}</p>
                              {isDropdown ? (
                                <h2 className="text-xl font-black uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">{link.label}</h2>
                              ) : (
                                <Link href={link.href!} onClick={() => setIsMenuOpen(false)}>
                                  <h2 className="text-xl font-black uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">{link.label}</h2>
                                </Link>
                              )}
                            </div>
                            {isDropdown && (
                              <ChevronDown
                                size={20}
                                className={`text-muted-foreground transition-transform duration-500 ${isExpanded ? "rotate-180 text-primary" : ""}`}
                              />
                            )}
                          </button>
                        </div>

                        <AnimatePresence>
                          {isExpanded && link.divisions && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="max-h-[350px] overflow-y-auto custom-scrollbar pr-2 mb-4 overscroll-contain" data-lenis-prevent>
                                <div className="pl-4 space-y-8 pt-4 pb-4 border-l border-primary/20 ml-1">
                                  {link.divisions.map((div: any) => (
                                    <div key={div._id} className="space-y-4">
                                      <h3 className="font-mono text-[9px] font-bold text-accent tracking-[0.2em] uppercase">{div.name}</h3>
                                      <div className="flex flex-col gap-4 pl-2">
                                        {div.categories.map((cat: any) => (
                                          <Link
                                            key={cat._id}
                                            href={`/products?categoryId=${cat._id}`}
                                            className="text-base font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-3"
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
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-10 border-t border-primary/10 mt-auto relative">
                  <h3 className="font-mono text-[8px] font-black uppercase tracking-[0.3em] text-primary/60 mb-8">Technical Ops</h3>
                  <div className="space-y-4">
                    <a href="tel:+919925999945" className="flex items-center gap-4 group bg-primary/5 p-4 border border-primary/10 hover:border-primary/40 transition-all relative">
                      <div className="absolute top-0 right-0 w-1 h-1 bg-primary/40" />
                      <div className="w-10 h-10 bg-background border border-primary/20 flex items-center justify-center rounded-sm">
                        <Phone size={16} className="text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[7px] font-mono text-primary/60 uppercase">Primary Comms</span>
                        <span className="text-[11px] font-mono font-black text-foreground group-hover:text-primary transition-colors">+91 99259 99945</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="shrink-0 p-8 border-t border-primary/10 bg-background/80 backdrop-blur-md">
                <div className="flex items-center gap-6 justify-center">
                  <Link href="/contact" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                    <Mail size={20} />
                  </Link>
                  <Link href="/about" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}