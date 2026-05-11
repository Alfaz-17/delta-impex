"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Layers, Settings, LogOut, Home, Star, X, Mail } from "lucide-react";
import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  active: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ active, isOpen = false, onClose }: SidebarProps) {
  const searchParams = useSearchParams();
  const divisionId = searchParams.get("divisionId");
  
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: Home, href: `/admin/dashboard${divisionId ? "?divisionId=" + divisionId : ""}` },
    { id: "products", name: "Products", icon: Package, href: `/admin/products${divisionId ? "?divisionId=" + divisionId : ""}` },
    { id: "inquiries", name: "Inquiries", icon: Mail, href: "/admin/inquiries" },
    { id: "settings", name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-primary text-white font-sans">
      <div className="flex items-center justify-between h-24 px-6 border-b border-white/10">
        <div>
          <Link href="/" className="font-display font-medium text-xl tracking-tighter uppercase whitespace-nowrap text-white">
            Delta<span className="text-accent">Impex</span>
          </Link>
          <p className="text-[10px] text-accent font-bold uppercase tracking-[0.3em] mt-1 mb-0">Control Panel</p>
        </div>
        {onClose && (
            <button 
                onClick={onClose}
                className="lg:hidden p-2 rounded-md hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-transparent shadow-none"
            >
                <X size={20} />
            </button>
        )}
      </div>

      <nav className="mt-8 px-4 space-y-2 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={onClose}
            className={`flex items-center px-4 py-4 text-xs font-bold uppercase tracking-widest transition-all border-l-4 ${
              active === item.id
                ? "bg-white/10 text-accent border-accent shadow-lg"
                : "text-white/60 border-transparent hover:bg-white/5 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5 mr-4" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-black/20">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center justify-center w-full px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-white bg-red-600/60 hover:bg-red-600 transition-all shadow-xl"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout Securely
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 h-screen fixed left-0 top-0 bottom-0 flex-col shadow-2xl z-40 bg-primary">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-primary z-[80] shadow-2xl border-r border-border"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
