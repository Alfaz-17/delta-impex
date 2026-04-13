"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] md:w-[95%] max-w-6xl transition-all duration-500 ${
          isScrolled 
            ? "bg-background/90 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-3" 
            : "bg-transparent py-4"
        }`}
      >
        {/* Subtle background glow for transparent state contrast */}
        {!isScrolled && (
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 to-transparent rounded-full blur-xl opacity-50" />
        )}
        
        <div className="flex items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Link 
            href="/" 
            className={`text-xl font-display font-bold tracking-tighter transition-colors duration-300 shrink-0 ${isScrolled ? "text-foreground" : "text-white drop-shadow-md"}`}
          >
            Delta Impex.
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:gap-10 md:flex">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Spare Parts", href: "/divisions/marine-parts" },
              { label: "Water Treatment", href: "/divisions/ro-systems" },
              { label: "Contact", href: "/contact" }
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative btn-text whitespace-nowrap transition-all group ${
                    isActive 
                      ? "text-primary" 
                      : isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white drop-shadow-sm"
                  }`}
                >
                  {link.label}
                  {/* Premium Active Indicator */}
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

          {/* Action Area */}
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

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 transition-all md:hidden rounded-full ${
                isMenuOpen 
                  ? "bg-primary text-white" 
                  : isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-2xl md:hidden overflow-hidden flex flex-col"
          >
            {/* Added pt-24 to push links below the floating fixed header */}
            <div className="flex-1 flex flex-col justify-center px-8 space-y-8 pt-24">
              {[
                { label: "Home", href: "/" },
                { label: "About Delta Impex", href: "/about" },
                { label: "Marine Spare Parts", href: "/divisions/marine-parts" },
                { label: "RO Water Treatment", href: "/divisions/ro-systems" },
                { label: "Contact Us", href: "/contact" }
              ].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="space-y-1">
                      <p className={`font-tech text-[10px] uppercase tracking-widest font-bold ${pathname === link.href ? "text-primary" : "text-muted-foreground"}`}>
                        0{i + 1}
                      </p>
                      <h2 className={`heading-section !italic-0 group-hover:translate-x-2 transition-transform duration-300 ${
                        pathname === link.href ? "text-primary" : "text-foreground"
                      }`}>
                        {link.label}
                      </h2>
                    </div>
                    <ChevronRight className={`transition-all ${pathname === link.href ? "text-primary translate-x-1" : "text-muted-foreground opacity-0 group-hover:opacity-100"}`} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Menu Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-8 border-t border-border flex flex-col gap-6"
            >
              <Link
                href="/contact"
                className="w-full bg-primary py-5 text-center text-xs font-tech font-bold uppercase tracking-[0.3em] text-white rounded-2xl shadow-xl shadow-primary/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Start Inquiry
              </Link>
              <div className="flex justify-between items-center text-[10px] font-tech uppercase tracking-widest text-muted-foreground">
                <p>© 2026 Delta Impex</p>
                <div className="flex gap-4">
                  <span>India</span>
                  <span>UAE</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
