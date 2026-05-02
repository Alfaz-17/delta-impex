"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/sidebar";
import { AdminMobileHeader } from "@/components/admin/mobile-header";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();
  
  // Do not show sidebar/header on login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [isLoginPage, router, status]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
      </div>
    );
  }

  if (status !== "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30 text-foreground font-sans">
      <AdminMobileHeader 
        isMenuOpen={isSidebarOpen} 
        onToggleMenu={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      {/* Extract active state from pathname */}
      <AdminSidebar 
        active={pathname.includes("dashboard") ? "dashboard" : pathname.includes("products") ? "products" : pathname.includes("settings") ? "settings" : "categories"} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-8 hidden lg:flex">
          <div className="flex-1" />
          <a href="/" target="_blank" className="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors">
             View Public Site →
          </a>
        </header>

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 md:p-8 lg:p-12"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
