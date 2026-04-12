"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Layers, Settings, LogOut, Home, Star } from "lucide-react";
import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface SidebarProps {
  active: string;
}

export default function AdminSidebar({ active }: SidebarProps) {
  const searchParams = useSearchParams();
  const divisionId = searchParams.get("divisionId");
  
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: Home, href: `/admin/dashboard${divisionId ? "?divisionId=" + divisionId : ""}` },
    { id: "products", name: "Products", icon: Package, href: `/admin/products${divisionId ? "?divisionId=" + divisionId : ""}` },
    { id: "categories", name: "Categories", icon: Layers, href: `/admin/categories${divisionId ? "?divisionId=" + divisionId : ""}` },
  ];

  return (
    <aside className="w-64 border-r border-border h-full flex flex-col bg-muted/20">
      <div className="p-8 border-b border-border">
        <Link href="/" className="font-display font-medium text-xl tracking-tighter uppercase whitespace-nowrap">
          Delta<span className="text-muted-foreground">Impex</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-2 mb-0">Control Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
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
    </aside>
  );
}
