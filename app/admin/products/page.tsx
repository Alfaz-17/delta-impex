"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AdminSidebar from "@/components/admin/sidebar";
import { AdminMobileHeader } from "@/components/admin/mobile-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Plus, Trash2, Package, Upload, Loader2, Star, Edit, X, CheckSquare, ChevronRight } from "lucide-react";
import { DivisionSwitcher } from "@/components/admin/division-switcher";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const activeDivisionId = searchParams.get("divisionId");
  
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Selection and Edit State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const defaultValue = {
    name: "",
    division: "",
    category: "",
    description: "",
    price: "",
    condition: "",
    isFeatured: false,
    imageUrl: "",
  };

  const [formData, setFormData] = useState(defaultValue);

  useEffect(() => {
    fetchDivisions();
    fetchProducts();
  }, [activeDivisionId]);

  useEffect(() => {
    if (activeDivisionId) {
      setFormData(prev => ({ ...prev, division: activeDivisionId }));
      fetchCategories(activeDivisionId);
    }
  }, [activeDivisionId]);

  const fetchDivisions = async () => {
    const res = await fetch("/api/divisions");
    const data = await res.json();
    setDivisions(data);
  };

  const fetchCategories = async (divisionId?: string) => {
    const targetId = divisionId || activeDivisionId;
    if (!targetId) return;
    
    const url = `/api/categories?divisionId=${targetId}`;
    const res = await fetch(url);
    const data = await res.json();
    setCategories(data);
  };

  const fetchProducts = async () => {
    if (!activeDivisionId) return;
    const res = await fetch(`/api/products?divisionId=${activeDivisionId}`);
    const data = await res.json();
    setProducts(data);
  };

  const handleToggleFeatured = async (product: any) => {
    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !product.isFeatured }),
      });

      if (res.ok) {
        toast.success(`Product ${!product.isFeatured ? 'marked as featured' : 'removed from featured'}`);
        fetchProducts();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map(p => p._id));
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} items permanently?`)) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (res.ok) {
        toast.success("Products deleted successfully");
        setSelectedIds([]);
        fetchProducts();
      } else {
        toast.error("Failed to delete products");
      }
    } catch (error) {
      toast.error("Error deleting products");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 text-foreground font-sans">
      <AdminMobileHeader 
        isMenuOpen={isSidebarOpen} 
        onToggleMenu={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <AdminSidebar active="products" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border h-16 items-center justify-between px-8 hidden lg:flex">
          <div className="flex-1" />
          <a href="/" target="_blank" className="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors">
             View Public Site →
          </a>
        </header>

        <main className="flex-1 p-6 md:p-8 lg:p-12 pb-32">
            <DivisionSwitcher />
            
            <div className="flex items-center justify-between border-b border-border pb-8 mt-4 mb-8">
                <div>
                <h1 className="text-3xl font-bold text-primary uppercase tracking-tighter">Inventory</h1>
                <p className="text-xs font-bold text-accent uppercase tracking-[0.3em] mt-2">Manage Your Global Stock</p>
                </div>
                <div className="flex items-center flex-wrap gap-4">
                    {selectedIds.length > 0 && (
                        <div className="flex items-center gap-4 px-4 py-2 bg-red-50 text-red-600 border border-red-200 animate-in fade-in slide-in-from-top-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                            {selectedIds.length} selected
                        </span>
                        <button 
                            onClick={handleBulkDelete}
                            className="bg-transparent hover:bg-red-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors"
                        >
                            Delete Permanently
                        </button>
                        </div>
                    )}
                    <a 
                    href={`/admin/products/new${activeDivisionId ? "?divisionId=" + activeDivisionId : ""}`} 
                    className="px-8 py-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl flex items-center gap-3"
                    >
                    <Plus className="w-4 h-4" /> Add Record
                    </a>
                </div>
            </div>

            <div className="bg-white border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
                   <button 
                      onClick={toggleSelectAll}
                      className="px-4 py-2 border border-border text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-white transition-colors flex items-center focus:outline-none"
                    >
                      <CheckSquare className="w-4 h-4 mr-2" />
                      {selectedIds.length === products.length && products.length > 0 ? "Deselect All" : "Select All"}
                    </button>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-4">Total: {products.length} Units</span>
                </div>
                <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                    <tr className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest">
                        <th className="py-5 px-6 w-12 text-center">Sel</th>
                        <th className="py-5 px-6">Product Core</th>
                        <th className="py-5 px-6">Classification</th>
                        <th className="py-5 px-6 text-center">Featured</th>
                        <th className="py-5 px-6 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                    {products.map((product) => (
                        <tr key={product._id} className={`hover:bg-muted/30 transition-colors ${selectedIds.includes(product._id) ? "bg-accent/5" : ""}`}>
                        <td className="py-6 px-6 text-center">
                            <Checkbox 
                                checked={selectedIds.includes(product._id)} 
                                onCheckedChange={() => toggleSelect(product._id)}
                                className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                            />
                        </td>
                        <td className="py-6 px-6">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-muted relative border border-border shrink-0">
                                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="64px" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary tracking-tight text-sm mb-1">{product.name}</h4>
                                    <div className="flex gap-4">
                                        {product.price && <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{product.price}</p>}
                                        {product.condition && <p className="text-[10px] text-muted-foreground uppercase tracking-widest border-l pl-4 border-border">{product.condition}</p>}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="py-6 px-6">
                            <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[9px] font-extrabold uppercase tracking-widest">
                            {product.category?.name || "Uncategorized"}
                            </span>
                        </td>
                        <td className="py-6 px-6 text-center">
                            <button
                            onClick={() => handleToggleFeatured(product)}
                            className={`p-2 transition-all duration-300 ${product.isFeatured ? 'text-yellow-600 scale-125' : 'text-muted-foreground/30 hover:text-accent'}`}
                            title={product.isFeatured ? "Featured Product" : "Mark as Featured"}
                            >
                            <Star className={`w-5 h-5 ${product.isFeatured ? 'fill-yellow-500' : ''}`} />
                            </button>
                        </td>
                        <td className="py-6 px-6 text-right">
                            <div className="flex items-center justify-end gap-4">
                            <a href={`/admin/products/new?id=${product._id}&divisionId=${activeDivisionId || ""}`} className="p-2 text-primary hover:text-accent transition-colors">
                                <Edit className="w-4 h-4" />
                            </a>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div className="p-20 text-center border-t border-border bg-muted/10">
                    <Package className="w-12 h-12 mx-auto mb-6 text-muted-foreground/30" />
                    <p className="text-sm font-semibold text-foreground/60 uppercase tracking-widest">No Products in Inventory</p>
                    <p className="text-[10px] text-muted-foreground uppercase mt-2">Click "Add Record" to begin building your digital stock.</p>
                    </div>
                )}
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
