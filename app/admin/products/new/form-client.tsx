"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AdminSidebar from "@/components/admin/sidebar";
import { AdminMobileHeader } from "@/components/admin/mobile-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Upload, Loader2, X, ArrowLeft } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export function ProductFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeDivisionId = searchParams.get("divisionId");
  const editingId = searchParams.get("id");
  
  const [categories, setCategories] = useState<any[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const defaultValue = {
    name: "",
    division: activeDivisionId || "",
    category: "",
    description: "",
    price: "",
    condition: "",
    isFeatured: false,
    imageUrl: "",
    images: [] as string[],
  };

  const [formData, setFormData] = useState(defaultValue);

  useEffect(() => {
    fetchDivisions();
    if (editingId) fetchProduct(editingId);
  }, [activeDivisionId, editingId]);

  useEffect(() => {
    if (formData.division) {
      fetchCategories(formData.division);
    } else {
      setCategories([]);
    }
  }, [formData.division]);

  const fetchDivisions = async () => {
    try {
      const res = await fetch("/api/divisions");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load divisions");
      }
      setDivisions(data);
    } catch (error) {
      toast.error("Failed to load divisions");
    }
  };

  const fetchCategories = async (divId: string) => {
    try {
      const res = await fetch(`/api/categories?divisionId=${divId}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load categories");
      }
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  const fetchProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Error loading product");
      }

      setFormData({
        name: data.name || "",
        division: data.division?._id || data.division || "",
        category: data.category?._id || data.category || "",
        description: data.description || "",
        price: data.price || "",
        condition: data.condition || "",
        isFeatured: data.isFeatured || false,
        imageUrl: data.imageUrl || "",
        images: data.images || [],
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error loading product");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Image upload failed");
      }

      setFormData(prev => ({ ...prev, imageUrl: data.url }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Image upload failed");
    } finally {
      setUploading(false);
    }
  };
  
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const uploadData = new FormData();
        uploadData.append("file", files[i]);
        
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Gallery upload failed");
        }

        uploadedUrls.push(data.url);
      }

      setFormData(prev => ({ 
        ...prev, 
        images: [...(prev.images || []), ...uploadedUrls] 
      }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gallery upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.division || !formData.category || !formData.imageUrl) {
      toast.error("Required fields missing");
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

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to save product");
      }

      toast.success(editingId ? "Updated" : "Created");
      const nextDivisionId = formData.division || activeDivisionId;
      router.push(`/admin/products${nextDivisionId ? "?divisionId=" + nextDivisionId : ""}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save product");
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
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-8 hidden lg:flex">
          <div className="flex-1" />
          <a href="/" target="_blank" className="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors">
             View Public Site →
          </a>
        </header>

        <main className="flex-1 p-6 md:p-8 lg:p-12 max-w-4xl pb-32">
            <button 
                onClick={() => router.back()}
                className="flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Inventory List
            </button>
            <div className="flex items-center justify-between border-b border-border pb-8 mt-4 mb-8">
                <div>
                <h1 className="text-3xl font-bold text-primary uppercase tracking-tighter">{editingId ? "Modify Record" : "Add New Record"}</h1>
                <p className="text-xs font-bold text-accent uppercase tracking-[0.3em] mt-2">Technical Specification Entry</p>
                </div>
            </div>

            <div className="bg-white p-10 border border-border">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Division Sector *</Label>
                        <select 
                            value={formData.division} 
                            onChange={(e) => {
                                setFormData({ ...formData, division: e.target.value, category: "" });
                            }}
                            className="w-full px-4 py-3 bg-muted/20 border border-border focus:border-accent outline-none text-xs font-bold uppercase tracking-widest text-primary"
                        >
                            <option value="">Select Sector</option>
                            {divisions.map((div) => (
                                <option key={div._id} value={div._id}>{div.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Classification *</Label>
                        <select 
                            value={formData.category} 
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 bg-muted/20 border border-border focus:border-accent outline-none text-xs font-bold uppercase tracking-widest text-primary"
                            disabled={!formData.division}
                        >
                            <option value="">Select Classification</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Product Core Name *</Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-muted/20 border-border rounded-none h-12 shadow-none focus-visible:ring-accent focus-visible:border-accent"
                    placeholder="e.g. Caterpillar Marine Engine 3512B"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Technical Description</Label>
                  <Textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-muted/20 border-border rounded-none shadow-none focus-visible:ring-accent focus-visible:border-accent min-h-[160px]"
                    placeholder="Enter detailed technical specifications here..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Market Value</Label>
                    <Input 
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="bg-muted/20 border-border rounded-none h-12 shadow-none focus-visible:ring-accent focus-visible:border-accent"
                      placeholder="e.g. $ 45,000 / POR"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Hardware Condition</Label>
                    <Input 
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      className="bg-muted/20 border-border rounded-none h-12 shadow-none focus-visible:ring-accent focus-visible:border-accent"
                      placeholder="e.g. Reconditioned, New, Used"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Primary Visual Asset *</Label>
                  <div className="relative group">
                    {formData.imageUrl ? (
                      <div className="relative aspect-video max-w-sm rounded-none overflow-hidden border border-border">
                        <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                        <button 
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: "" })}
                          className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white border-b border-accent pb-1">Remove Asset</span>
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center aspect-video max-w-sm border-2 border-dashed border-border bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group">
                        {uploading ? <Loader2 className="animate-spin text-primary w-8 h-8" /> : <Upload className="text-primary w-8 h-8 group-hover:scale-110 transition-transform" />}
                        <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-primary">
                          {uploading ? "Syncing..." : "Upload Graphics"}
                        </span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                      </label>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Technical Gallery</Label>
                    <span className="text-[9px] text-muted-foreground uppercase">Optional supplementary specs</span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square border border-border group overflow-hidden">
                        <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                        <button 
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="text-white w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    
                    <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-border bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group">
                      {uploading ? <Loader2 className="animate-spin text-primary w-5 h-5" /> : <Upload className="text-primary w-5 h-5 group-hover:scale-110 transition-transform" />}
                      <span className="mt-2 text-[9px] font-bold uppercase tracking-widest text-primary">Add More</span>
                      <input type="file" className="hidden" accept="image/*" multiple onChange={handleGalleryUpload} />
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 border border-border bg-muted/20 mt-8">
                  <div>
                      <Label className="text-[10px] font-bold uppercase tracking-widest block text-primary">Primary Feature Status</Label>
                      <p className="text-[9px] text-muted-foreground uppercase mt-1">Display on main overview screens.</p>
                  </div>
                  <Switch 
                    checked={formData.isFeatured}
                    onCheckedChange={(val) => setFormData({ ...formData, isFeatured: val })}
                    className="data-[state=checked]:bg-accent"
                  />
                </div>

                <div className="pt-8 flex gap-4">
                    <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => router.back()}
                        className="flex-1 bg-white border-border text-primary font-bold h-14 rounded-none transition-all uppercase tracking-widest text-[10px] hover:bg-muted"
                        >
                        Abort Entry
                    </Button>
                    <Button 
                        type="submit" 
                        disabled={isLoading || uploading}
                        className="flex-[2] bg-primary text-white hover:bg-accent font-bold h-14 rounded-none shadow-xl transition-all uppercase tracking-widest text-[10px]"
                    >
                        {isLoading ? "Writing..." : editingId ? "Commit Updates" : "Finalize Registration"}
                    </Button>
                </div>
              </form>
            </div>
        </main>
      </div>
    </div>
  );
}
