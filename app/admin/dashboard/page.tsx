import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Layers, Star, TrendingUp } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";

import { DivisionSwitcher } from "@/components/admin/division-switcher";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: { divisionId?: string };
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin/login");
  }

  const divisionId = searchParams.divisionId;
  await connectToDatabase();
  
  const query = divisionId ? { division: divisionId } : {};
  
  const productCount = await Product.countDocuments(query);
  const categoryCount = await Category.countDocuments(query);
  const featuredCount = await Product.countDocuments({ ...query, isFeatured: true });

  const stats = [
    { title: "Total Products", value: productCount, icon: Package, color: "text-blue-500" },
    { title: "Categories", value: categoryCount, icon: Layers, color: "text-purple-500" },
    { title: "Featured Items", value: featuredCount, icon: Star, color: "text-yellow-500" },
    { title: "Operational Status", value: "Active", icon: TrendingUp, color: "text-green-500" },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      <AdminSidebar active="dashboard" />
      
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-background">
        <Suspense fallback={<div className="h-20 animate-pulse bg-muted rounded-xl mb-8" />}>
          <DivisionSwitcher />
        </Suspense>
        <header className="mb-8">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Overview</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Dashboard
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="bg-card shadow-sm border-border rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl border border-border bg-card shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight text-foreground mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <a href="/admin/products" className="p-4 rounded-xl bg-foreground text-background text-center font-bold text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform">
                New Product
              </a>
              <a href="/admin/categories" className="p-4 rounded-xl border border-border text-center font-bold text-xs uppercase tracking-widest hover:bg-muted transition-colors">
                Categories
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
