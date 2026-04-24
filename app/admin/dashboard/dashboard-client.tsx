"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Package, Layers, Star, TrendingUp, ArrowUpRight } from "lucide-react";
import { DivisionSwitcher } from "@/components/admin/division-switcher";
import { motion } from "framer-motion";

export function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const divisionId = searchParams.get("divisionId");
  
  const [stats, setStats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
          { title: "Total Products", value: data.productCount, icon: Package, color: "text-[#1E5FA6]" },
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

  return (
    <>
      <DivisionSwitcher />
      
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
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-8 border border-border group hover:border-accent transition-all relative overflow-hidden shadow-sm hover:shadow-xl"
          >
              <stat.icon className={`w-8 h-8 mb-6 group-hover:scale-110 transition-transform ${stat.color}`} />
              <dt className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.title}</dt>
              <dd className="text-4xl font-extrabold text-primary tracking-tighter">{stat.value}</dd>
          </motion.div>
          ))}
      </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 mt-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-primary p-10 text-white relative h-64 flex flex-col justify-center overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors" />
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-4">Manage Inventory</h2>
            <p className="text-white/60 text-sm italic mb-8">Maintain the high standard of Delta Impex by reviewing and updating your global stock.</p>
            <a href="/admin/products" className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-accent hover:gap-6 transition-all">
            Access Products <ArrowUpRight className="w-4 h-4" />
            </a>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white p-10 border border-border h-64 flex flex-col justify-center group hover:border-accent transition-colors"
        >
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">Categories & Structure</h2>
            <p className="text-muted-foreground text-sm mb-8">Organize divisions and product structures to ensure smooth client browsing.</p>
            <div className="flex flex-wrap gap-6">
                <a href="/admin/categories" className="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors">Update Categories</a>
            </div>
        </motion.div>
      </div>
    </>
  );
}
