"use client";

import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminMobileHeaderProps {
  onToggleMenu: () => void;
  isMenuOpen: boolean;
}

export function AdminMobileHeader({ onToggleMenu, isMenuOpen }: AdminMobileHeaderProps) {
  return (
    <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-background border-b border-border sticky top-0 z-[60]">
      <Link href="/admin/dashboard" className="font-display font-medium text-lg tracking-tighter uppercase whitespace-nowrap">
        Delta<span className="text-muted-foreground">Impex</span>
      </Link>
      
      <button
        onClick={onToggleMenu}
        className="p-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
  );
}
