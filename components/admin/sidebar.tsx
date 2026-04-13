"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Layers, Settings, LogOut, Home, Star, X } from "lucide-react";
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
    { id: "categories", name: "Categories", icon: Layers, href: `/admin/categories${divisionId ? "?divisionId=" + divisionId : ""}` },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-8 border-b border-border flex justify-between items-center">
        <div>
          <Link href="/" className="font-display font-medium text-xl tracking-tighter uppercase whitespace-nowrap">
            Delta<span className="text-muted-foreground">Impex</span>
          </Link>
          <p className="text-xs text-muted-foreground mt-2 mb-0">Control Panel</p>
        </div>
        {onClose && (
            <button 
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
            >
                <X size={20} />
            </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              active === item.id
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 w-full transition-all duration-300"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-border h-full flex-col bg-muted/20">
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
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-background z-[80] shadow-2xl border-r border-border"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
