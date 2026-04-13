"use client";

import { Suspense, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminSidebar from "@/components/admin/sidebar";
import { AdminMobileHeader } from "@/components/admin/mobile-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Layers, Star, TrendingUp, Loader2 } from "lucide-react";
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground overflow-hidden">
      <AdminMobileHeader 
        isMenuOpen={isSidebarOpen} 
        onToggleMenu={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <AdminSidebar active="dashboard" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 bg-background">
        <Suspense fallback={<div className="h-20 animate-pulse bg-muted rounded-xl mb-8" />}>
          <DivisionSwitcher />
        </Suspense>
        
        <header className="mb-8 mt-4 lg:mt-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Management Center</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Dashboard
          </h1>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 animate-pulse bg-muted rounded-2xl border border-border" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <Card key={i} className="bg-card shadow-sm border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold tracking-tight text-foreground">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl border border-border bg-card shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-foreground mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="/admin/products" className="p-4 rounded-xl bg-foreground text-background text-center font-bold text-xs uppercase tracking-widest hover:bg-foreground/90 transition-all">
                New Product
              </a>
              <a href="/admin/categories" className="p-4 rounded-xl border border-border text-center font-bold text-xs uppercase tracking-widest hover:bg-muted transition-all">
                Categories
              </a>
            </div>
          </div>
        </div>
      </main>
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
