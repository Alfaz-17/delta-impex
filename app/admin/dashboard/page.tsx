"use client";

import { Suspense, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminSidebar from "@/components/admin/sidebar";
import { AdminMobileHeader } from "@/components/admin/mobile-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Layers, Star, TrendingUp, Loader2, ArrowUpRight } from "lucide-react";
import { DivisionSwitcher } from "@/components/admin/division-switcher";
import { useEffect } from "react";

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const divisionId = searchParams.get("divisionId");
  
  const [stats, setStats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchStats() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/admin/stats${divisionId ? "?divisionId=" + divisionId : ""}`);
        const data = await res.json();
        
        setStats([
          { title: "Total Products", value: data.productCount, icon: Package, color: "text-blue-500" },
          { title: "Categories", value: data.categoryCount, icon: Layers, color: "text-purple-500" },
          { title: "Featured Items", value: data.featuredCount, icon: Star, color: "text-yellow-500" },
          { title: "Operational Status", value: "Active", icon: TrendingUp, color: "text-green-500" },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (status === "authenticated") {
      fetchStats();
    }
  }, [divisionId, status]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 text-foreground font-sans">
      <AdminMobileHeader 
        isMenuOpen={isSidebarOpen} 
        onToggleMenu={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <AdminSidebar active="dashboard" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-8 hidden lg:flex">
          <div className="flex-1" />
          <a href="/" target="_blank" className="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors">
             View Public Site →
          </a>
        </header>

        <main className="flex-1 p-6 md:p-8 lg:p-12">
            <Suspense fallback={<div className="h-12 animate-pulse bg-muted mb-8" />}>
            <DivisionSwitcher />
            </Suspense>
            
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-border pb-8 mt-4 lg:mt-8 mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-primary uppercase tracking-tighter">Dashboard</h1>
                    <p className="text-xs font-bold text-accent uppercase tracking-[0.3em] mt-2">Overview of Operations</p>
                </div>
                <div className="text-left md:text-right mt-4 md:mt-0">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Status</span>
                    <span className="text-xs font-bold text-green-600 flex items-center gap-2 md:justify-end">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        System Online
                    </span>
                </div>
            </header>

            {isLoading ? (
            <div className="text-xs font-bold uppercase tracking-widest animate-pulse p-4">Loading Management Data...</div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {stats.map((stat, i) => (
                <div key={i} className="bg-white p-8 border border-border group hover:border-accent transition-all relative overflow-hidden">
                    <stat.icon className={`w-8 h-8 mb-6 group-hover:scale-110 transition-transform ${stat.color}`} />
                    <dt className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.title}</dt>
                    <dd className="text-4xl font-extrabold text-primary tracking-tighter">{stat.value}</dd>
                </div>
                ))}
            </div>
            )}

            <div className="grid lg:grid-cols-2 gap-8 mt-12">
            <div className="bg-primary p-10 text-white relative h-64 flex flex-col justify-center">
                <h2 className="text-2xl font-bold uppercase tracking-tight mb-4">Manage Inventory</h2>
                <p className="text-white/60 text-sm italic mb-8">Maintain the high standard of Delta Impex by reviewing and updating your global stock.</p>
                <a href="/admin/products" className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-accent hover:gap-6 transition-all">
                Access Products <ArrowUpRight className="w-4 h-4" />
                </a>
            </div>
            
            <div className="bg-white p-10 border border-border h-64 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">Categories & Structure</h2>
                <p className="text-muted-foreground text-sm mb-8">Organize divisions and product structures to ensure smooth client browsing.</p>
                <div className="flex flex-wrap gap-6">
                    <a href="/admin/categories" className="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-primary">Update Categories</a>
                </div>
            </div>
            </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  );
}
