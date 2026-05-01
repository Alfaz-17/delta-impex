"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Plus, Package, Star, Edit, CheckSquare } from "lucide-react";
import { DivisionSwitcher } from "@/components/admin/division-switcher";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { removeBackgroundClient } from "@/lib/background-removal-client";

export function ProductsContent() {
  const searchParams = useSearchParams();
  const activeDivisionId = searchParams.get("divisionId");
  
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  useEffect(() => {
    fetchProducts();
  }, [activeDivisionId]);

  const fetchProducts = async () => {
    if (!activeDivisionId) {
      setProducts([]);
      setSelectedIds([]);
      return;
    }

    try {
      const res = await fetch(`/api/products?divisionId=${activeDivisionId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to load products");
      }

      setProducts(Array.isArray(data) ? data : []);
      setSelectedIds([]);
    } catch (error: any) {
      setProducts([]);
      toast.error(error?.message || "Failed to load products");
    }
  };

  const handleToggleFeatured = async (product: any) => {
    // Optimistic Update
    const previousProducts = [...products];
    const updatedProducts = products.map(p => 
      p._id === product._id ? { ...p, isFeatured: !product.isFeatured } : p
    );
    setProducts(updatedProducts);

    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !product.isFeatured }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to update product");
      }

      toast.success(
        `Product ${!product.isFeatured ? 'marked as featured' : 'removed from featured'}`,
        { duration: 2000 }
      );
    } catch (error) {
      // Rollback on error
      setProducts(previousProducts);
      toast.error(error instanceof Error ? error.message : "Error updating status");
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length && products.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map(p => p._id));
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} item(s)? This action cannot be undone.`)) return;

    setIsLoading(true);
    toast.loading("Deleting products...", { id: "bulk-delete" });
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to delete products");
      }

      toast.success(`${selectedIds.length} product(s) deleted successfully`);
      setSelectedIds([]);
      fetchProducts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error deleting products");
    } finally {
      toast.dismiss("bulk-delete");
      setIsLoading(false);
    }
  };

  return (
    <>
        <DivisionSwitcher />
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-border pb-8 mt-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary uppercase tracking-tighter">Inventory</h1>
              <p className="text-xs font-bold text-accent uppercase tracking-[0.3em] mt-2">Manage Your Global Stock</p>
            </div>
            <div className="flex items-center flex-wrap gap-4 mt-6 md:mt-0">
                {selectedIds.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-4 px-4 py-2 bg-red-50 text-red-600 border border-red-200"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                          {selectedIds.length} selected
                      </span>
                      <button 
                          onClick={handleBulkDelete}
                          className="bg-transparent hover:bg-red-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors"
                      >
                          Delete Permanently
                      </button>
                    </motion.div>
                )}
                <a 
                href={`/admin/products/new${activeDivisionId ? "?divisionId=" + activeDivisionId : ""}`} 
                className="px-8 py-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl flex items-center gap-3"
                >
                <Plus className="w-4 h-4" /> Add Record
                </a>
            </div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
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
                <AnimatePresence>
                  {products.map((product, i) => (
                      <motion.tr 
                        key={product._id} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className={`hover:bg-accent/5 transition-colors group ${selectedIds.includes(product._id) ? "bg-accent/5" : ""}`}
                      >
                      <td className="py-6 px-6 text-center">
                          <Checkbox 
                              checked={selectedIds.includes(product._id)} 
                              onCheckedChange={() => toggleSelect(product._id)}
                              className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                          />
                      </td>
                      <td className="py-6 px-6">
                          <div className="flex items-center gap-6">
                              <div className="w-16 h-16 bg-muted relative border border-border shrink-0 grayscale group-hover:grayscale-0 transition-all">
                                  <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="64px" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-primary tracking-tight text-sm mb-1 group-hover:text-accent transition-colors">{product.name}</h4>
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
                          className={`p-3 rounded-full transition-all duration-500 hover:bg-yellow-50 active:scale-95 ${
                            product.isFeatured 
                              ? 'text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.3)] scale-110' 
                              : 'text-muted-foreground/20 hover:text-yellow-400'
                          }`}
                          title={product.isFeatured ? "Featured Product" : "Mark as Featured"}
                          >
                          <Star className={`w-5 h-5 transition-all ${product.isFeatured ? 'fill-yellow-500 stroke-yellow-600' : 'stroke-[1.5px]'}`} />
                          </button>
                      </td>
                      <td className="py-6 px-6 text-right">
                          <div className="flex items-center justify-end gap-4">
                          <a href={`/admin/products/new?id=${product._id}&divisionId=${activeDivisionId || ""}`} className="p-2 text-primary hover:text-accent transition-colors">
                              <Edit className="w-4 h-4" />
                          </a>
                          </div>
                      </td>
                      </motion.tr>
                  ))}
                </AnimatePresence>
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
        </motion.div>
    </>
  );
}
