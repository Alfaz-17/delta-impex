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

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !currentStatus }),
      });

      if (res.ok) {
        toast.success("Updated featured status");
        fetchProducts();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(defaultValue);
  };

  const handleEdit = (product: any) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      division: product.division?._id || product.division,
      category: product.category?._id || product.category,
      description: product.description || "",
      price: product.price || "",
      condition: product.condition || "",
      isFeatured: product.isFeatured || false,
      imageUrl: product.imageUrl,
    });
    fetchCategories(product.division?._id || product.division);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.division || !formData.category || !formData.imageUrl) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const url = editingId ? `/api/products/${editingId}` : "/api/products";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingId ? "Product updated" : "Product added");
        if (!editingId) {
          setFormData(defaultValue);
        } else {
          cancelEdit();
        }
        fetchProducts();
      } else {
        toast.error("Operation failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground">
      <AdminMobileHeader 
        isMenuOpen={isSidebarOpen} 
        onToggleMenu={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <AdminSidebar active="products" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 bg-background pb-32">
        <DivisionSwitcher />
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
              {divisions.find(d => d._id === activeDivisionId)?.name || "Full Stock"}
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Inventory List
            </h1>
          </div>
          
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-4 p-3 rounded-xl bg-red-50 text-red-600 border border-red-200 shadow-sm animate-in fade-in slide-in-from-top-4">
              <span className="text-xs font-bold uppercase tracking-wider">
                {selectedIds.length} selected
              </span>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleBulkDelete}
                className="rounded-lg h-9 text-[10px] font-bold uppercase tracking-widest shadow-none"
              >
                Delete Selected
              </Button>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Add/Edit Product Panel */}
          <div className="xl:col-span-4">
            <div className={`p-8 rounded-3xl border transition-all duration-500 ${editingId ? "border-primary bg-primary/5 shadow-2xl shadow-primary/10" : "border-border bg-card shadow-sm"} lg:sticky lg:top-8`}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {editingId ? "Modify Record" : "New Entry"}
                </h2>
                {editingId && (
                  <button onClick={cancelEdit} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Product Name *</Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background border-border shadow-sm rounded-xl h-11"
                    placeholder="e.g. Caterpillar Marine Engine"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Category *</Label>
                  <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
                    <SelectTrigger className="bg-background border-border shadow-sm rounded-xl h-11">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id} className="rounded-lg">{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Description</Label>
                  <Textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-background border-border shadow-sm rounded-xl min-h-[120px]"
                    placeholder="Technical specifications and details..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Price</Label>
                    <Input 
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="bg-background border-border shadow-sm rounded-xl h-11"
                      placeholder="$ 0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Condition</Label>
                    <Input 
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      className="bg-background border-border shadow-sm rounded-xl h-11"
                      placeholder="New / Used"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
                  <div className="flex items-center gap-2">
                    <Star className={`w-4 h-4 ${formData.isFeatured ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
                    <Label className="text-xs font-semibold uppercase tracking-widest cursor-pointer">Featured Product</Label>
                  </div>
                  <Switch 
                    checked={formData.isFeatured}
                    onCheckedChange={(val) => setFormData({ ...formData, isFeatured: val })}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Technical Image *</Label>
                  <div className="relative group">
                    {formData.imageUrl ? (
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-sm">
                        <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                        <button 
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: "" })}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="text-white w-6 h-6 border-b border-transparent hover:border-white transition-all" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center aspect-video rounded-2xl border-2 border-dashed border-border bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group">
                        {uploading ? <Loader2 className="animate-spin text-muted-foreground w-6 h-6" /> : <Upload className="text-muted-foreground w-6 h-6 group-hover:scale-110 transition-transform" />}
                        <span className="mt-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          {uploading ? "Syncing..." : "Upload Graphics"}
                        </span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                      </label>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading || uploading}
                  className="w-full bg-foreground text-background font-bold h-12 rounded-xl shadow-lg hover:shadow-xl transition-all uppercase tracking-widest text-[10px]"
                >
                  {isLoading ? "Syncing Database..." : editingId ? "Update Inventory" : "Finalize Entry"}
                </Button>
              </form>
            </div>
          </div>

          {/* Editorial Products List */}
          <div className="xl:col-span-8">
            <div className="flex justify-between items-center mb-6 px-2">
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleSelectAll}
                  className="h-9 rounded-xl shadow-sm border-border font-tech text-[10px] uppercase tracking-widest"
                >
                  <CheckSquare className="w-4 h-4 mr-2" />
                  {selectedIds.length === products.length && products.length > 0 ? "Reset" : "Bulk Select"}
                </Button>
                <div className="h-4 w-[1px] bg-border mx-2" />
                <span className="text-xs font-tech font-bold uppercase tracking-widest text-foreground/40">{products.length} Units</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {products.map((product) => (
                <div 
                  key={product._id} 
                  className={`group relative p-3 pr-6 rounded-2xl border transition-all duration-300 flex items-center gap-6 ${
                    selectedIds.includes(product._id) 
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/5" 
                      : (editingId === product._id ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-foreground/20 hover:shadow-xl hover:shadow-black/5")
                  }`}
                >
                  {/* Bulk Select Checkbox */}
                  <div className="pl-2">
                    <Checkbox 
                      checked={selectedIds.includes(product._id)} 
                      onCheckedChange={() => toggleSelect(product._id)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                  </div>

                  {/* High-Contrast Thumbnail */}
                  <div className="relative h-16 w-20 flex-shrink-0 rounded-xl overflow-hidden bg-muted border border-border shadow-sm">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  
                  {/* Identification */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-primary/60 px-2 py-0.5 rounded-md bg-primary/5 border border-primary/10">
                            {product.category?.name || "Uncategorized"}
                        </span>
                        {product.condition && (
                            <span className="text-[9px] uppercase font-mono text-muted-foreground/60">
                                • {product.condition}
                            </span>
                        )}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground truncate">{product.name}</h3>
                  </div>

                  {/* Attributes (Desktop Only) */}
                  <div className="hidden md:flex items-center gap-10">
                    <div className="w-24 text-right">
                        <p className="text-xs font-tech font-bold text-foreground/80">{product.price || "TBD"}</p>
                        <p className="text-[9px] uppercase tracking-widest text-muted-foreground/40 mt-0.5">Price Point</p>
                    </div>

                    <div className="h-8 w-[1px] bg-border/50" />

                    {/* Quick Toggle Feature Switch */}
                    <div className="flex flex-col items-center gap-1.5 min-w-[60px]">
                        <Switch 
                            checked={product.isFeatured}
                            onCheckedChange={() => handleToggleFeatured(product._id, product.isFeatured)}
                        />
                        <span className={`text-[8px] uppercase tracking-widest font-bold ${product.isFeatured ? "text-yellow-600" : "text-muted-foreground/30"}`}>
                            {product.isFeatured ? "Featured" : "Standard"}
                        </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-auto">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="p-2.5 text-muted-foreground hover:bg-foreground hover:text-background rounded-xl transition-all border border-transparent hover:border-foreground shadow-none"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/20 lg:group-hover:translate-x-1 lg:group-hover:text-primary transition-all transition-duration-500" />
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="p-20 text-center border-2 border-dashed border-border rounded-3xl bg-muted/10">
                <Package className="w-12 h-12 mx-auto mb-6 text-muted-foreground/30" />
                <p className="text-sm font-semibold text-foreground/60 uppercase tracking-widest">No Products in Inventory</p>
                <p className="text-xs text-muted-foreground mt-2">Begin building your digital stock using the panel on the left.</p>
              </div>
            )}
          </div>
        </div>
      </main>
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
