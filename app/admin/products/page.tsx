"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AdminSidebar from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Plus, Trash2, Package, Upload, Loader2, Star, Edit, X, CheckSquare } from "lucide-react";
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

  const handleDivisionChange = (val: string) => {
    setFormData({ ...formData, division: val, category: "" });
    fetchCategories(val);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (data.url) {
        setFormData({ ...formData, imageUrl: data.url });
        toast.success("Image uploaded");
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      toast.error("Error uploading image");
    } finally {
      setUploading(false);
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
    <div className="flex h-screen bg-background text-foreground">
      <AdminSidebar active="products" />
      
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-background pb-32">
        <DivisionSwitcher />
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              {divisions.find(d => d._id === activeDivisionId)?.name || "Inventory"}
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Products
            </h1>
          </div>
          
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-4 p-3 rounded-lg bg-red-50 text-red-600 border border-red-200 animate-in fade-in slide-in-from-top-4">
              <span className="text-sm font-semibold">
                {selectedIds.length} selected
              </span>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleBulkDelete}
                className="rounded-md h-8 text-xs font-semibold shadow-none"
              >
                Delete Permanently
              </Button>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Add/Edit Product Form */}
          <div className="xl:col-span-4 border-border border-r pr-8">
            <div className={`p-6 rounded-2xl border transition-all duration-300 ${editingId ? "border-primary bg-primary/5" : "border-border bg-card shadow-sm"} sticky top-8`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {editingId ? "Edit Product" : "New Product"}
                </h2>
                {editingId && (
                  <button onClick={cancelEdit} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground">Product Name *</Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background border-border shadow-sm rounded-lg"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground">Category *</Label>
                  <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
                    <SelectTrigger className="bg-background border-border shadow-sm rounded-lg">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground">Description</Label>
                  <Textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-background border-border shadow-sm rounded-lg min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-foreground">Price (Optional)</Label>
                    <Input 
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="bg-background border-border shadow-sm rounded-lg"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-foreground">Condition</Label>
                    <Input 
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      placeholder="New / Used"
                      className="bg-background border-border shadow-sm rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
                  <div className="flex items-center gap-2">
                    <Star className={`w-4 h-4 ${formData.isFeatured ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
                    <Label className="text-sm font-medium cursor-pointer">Featured Product</Label>
                  </div>
                  <Switch 
                    checked={formData.isFeatured}
                    onCheckedChange={(val) => setFormData({ ...formData, isFeatured: val })}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground">Product Image *</Label>
                  <div className="relative group">
                    {formData.imageUrl ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-border shadow-sm">
                        <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                        <button 
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: "" })}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="text-white w-6 h-6" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed border-border bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer">
                        {uploading ? <Loader2 className="animate-spin text-muted-foreground w-6 h-6" /> : <Upload className="text-muted-foreground w-6 h-6" />}
                        <span className="mt-2 text-sm font-medium text-muted-foreground">
                          {uploading ? "Uploading..." : "Upload Image"}
                        </span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                      </label>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading || uploading}
                  className="w-full bg-foreground text-background font-semibold h-10 rounded-lg shadow-sm"
                >
                  {isLoading ? "Processing..." : editingId ? "Save Changes" : "Add Product"}
                </Button>
              </form>
            </div>
          </div>

          {/* Products List */}
          <div className="xl:col-span-8 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleSelectAll}
                  className="h-8 rounded-md shadow-sm border-border"
                >
                  <CheckSquare className="w-4 h-4 mr-2" />
                  {selectedIds.length === products.length && products.length > 0 ? "Deselect All" : "Select All"}
                </Button>
                <span className="font-medium text-foreground">{products.length}</span> products total
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <div 
                  key={product._id} 
                  className={`group relative p-4 rounded-xl border transition-all duration-300 flex flex-col ${
                    selectedIds.includes(product._id) 
                      ? "border-primary bg-primary/5 shadow-md" 
                      : (editingId === product._id ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-foreground/20 hover:shadow-sm")
                  }`}
                >
                  {/* Selection Overlay */}
                  <div className="absolute top-4 left-4 z-10 bg-background/50 backdrop-blur-sm rounded-md p-1 border border-border">
                    <Checkbox 
                      checked={selectedIds.includes(product._id)} 
                      onCheckedChange={() => toggleSelect(product._id)}
                      className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                  </div>

                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-muted border border-border">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                       {product.isFeatured && (
                        <div className="bg-yellow-500 text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide flex items-center justify-center shadow-sm">
                          <Star className="w-3 h-3 fill-black mr-1" />
                          Featured
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="mb-2 flex-1">
                      <span className="text-[10px] uppercase font-semibold text-primary/80 mb-1 block">
                        {product.category?.name || "Uncategorized"}
                      </span>
                      <h3 className="text-base font-semibold leading-tight">{product.name}</h3>
                      {product.condition && (
                        <span className="inline-block px-2 py-0.5 mt-2 bg-muted text-[10px] text-muted-foreground uppercase rounded-md font-mono">
                          {product.condition}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <p className="text-sm font-medium">{product.price || "Contact for Price"}</p>
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors border border-transparent hover:border-border"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {products.length === 0 && (
              <div className="p-16 text-center border-2 border-dashed border-border rounded-2xl bg-muted/20">
                <Package className="w-10 h-10 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-sm font-medium text-muted-foreground">No Products Found</p>
                <p className="text-xs text-muted-foreground mt-1">Add items to inventory to see them here.</p>
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
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
