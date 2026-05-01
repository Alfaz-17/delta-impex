"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Edit, X, CheckSquare, Lock, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { DivisionSwitcher } from "@/components/admin/division-switcher";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { removeBackgroundClient } from "@/lib/background-removal-client";

export function CategoriesContent() {
  const searchParams = useSearchParams();
  const activeDivisionId = searchParams.get("divisionId");
  
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: "", division: "", imageUrl: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  useEffect(() => {
    fetchCategories();
  }, [activeDivisionId]);

  useEffect(() => {
    if (activeDivisionId) {
      setFormData(prev => ({ ...prev, division: activeDivisionId }));
    }
  }, [activeDivisionId]);

  const fetchCategories = async () => {
    if (!activeDivisionId) {
      setCategories([]);
      setSelectedIds([]);
      return;
    }

    try {
      const res = await fetch(`/api/categories?divisionId=${activeDivisionId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to load categories");
      }

      setCategories(Array.isArray(data) ? data : []);
      setSelectedIds([]);
    } catch (error: any) {
      setCategories([]);
      toast.error(error?.message || "Failed to load categories");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", division: activeDivisionId || "", imageUrl: "" });
    setImageFile(null);
    setImagePreviewUrl("");
    toast.info("Edit cancelled");
  };

  const handleEdit = (category: any) => {
    setEditingId(category._id);
    setFormData({
      name: category.name,
      division: category.division?._id || category.division,
      imageUrl: category.imageUrl || ""
    });
    setImageFile(null);
    setImagePreviewUrl(category.imageUrl || "");
    toast.info(`Editing category: ${category.name}`);
  };

  const toggleSelect = (category: any) => {
    if (!category.canDelete) {
      toast.error("This category has products assigned and cannot be deleted yet");
      return;
    }

    setSelectedIds(prev =>
      prev.includes(category._id) ? prev.filter(i => i !== category._id) : [...prev, category._id]
    );
  };

  const toggleSelectAll = () => {
    const deletableIds = categories.filter((category) => category.canDelete).map((category) => category._id);

    if (selectedIds.length === deletableIds.length && deletableIds.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(deletableIds);
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} category(ies)? This action cannot be undone.`)) return;

    setIsLoading(true);
    toast.loading("Deleting categories...", { id: "cat-delete" });
    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409 && Array.isArray(data?.blockedCategoryIds)) {
          setSelectedIds((prev) => prev.filter((id) => !data.blockedCategoryIds.includes(id)));
        }
        throw new Error(data?.error || "Failed to delete categories");
      }

      toast.success(`${selectedIds.length} category(ies) deleted successfully`);
      setSelectedIds([]);
      fetchCategories();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error deleting");
    } finally {
      toast.dismiss("cat-delete");
      setIsLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const uploadImage = async (file: File) => {
    const uploadData = new FormData();
    uploadData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: uploadData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error || "Image upload failed");
    }

    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.division) {
      toast.warning("Please fill in all required fields");
      return;
    }
    
    setIsLoading(true);
    setIsUploading(true);
    try {
      let finalImageUrl = formData.imageUrl;
      
      if (imageFile) {
        toast.loading("Uploading image...", { id: "cat-upload" });
        finalImageUrl = await uploadImage(imageFile);
        toast.dismiss("cat-upload");
      }

      const payload = {
        ...formData,
        imageUrl: finalImageUrl,
      };

      const url = editingId ? `/api/categories/${editingId}` : "/api/categories";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data?.error || "Failed to save category");
      }

      toast.success(editingId ? `Category "${formData.name}" updated successfully` : `Category "${formData.name}" added successfully`);
      if (!editingId) {
        setFormData({ name: "", division: activeDivisionId || "", imageUrl: "" });
        setImageFile(null);
        setImagePreviewUrl("");
      } else {
        cancelEdit();
      }
      fetchCategories();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save category");
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };


  return (
    <>
        <DivisionSwitcher />
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-border pb-8 mt-4 mb-8">
            <div>
            <h1 className="text-3xl font-bold text-primary uppercase tracking-tighter">Categories</h1>
            <p className="text-xs font-bold text-accent uppercase tracking-[0.3em] mt-2">Structure Your Catalog</p>
            </div>
            <div className="flex items-center gap-4 mt-6 md:mt-0">
                {selectedIds.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 px-4 py-2 bg-red-50 text-red-600 border border-red-200"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-wider">{selectedIds.length} selected</span>
                        <button onClick={handleBulkDelete} className="text-[10px] font-bold uppercase tracking-widest hover:underline">Delete</button>
                    </motion.div>
                )}
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4"
            >
                <div className="bg-white border border-border p-8 sticky top-24 shadow-sm">
                    <h2 className="text-lg font-bold text-primary uppercase tracking-tighter mb-8">
                    {editingId ? "Modify Classification" : "New Classification"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-primary block">Category Name</Label>
                            <Input 
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="rounded-none h-12 shadow-none focus-visible:ring-accent"
                                placeholder="e.g. Main Propulsion"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-primary block">Category Image (Optional)</Label>
                            <div className="relative w-32">
                              {imagePreviewUrl ? (
                                <div className="group relative aspect-square overflow-hidden border border-border bg-muted/20">
                                  <Image src={imagePreviewUrl} alt="Preview" fill className="object-cover" unoptimized />
                                  <div className="absolute right-1 top-1 flex gap-1">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setImageFile(null);
                                        setImagePreviewUrl("");
                                        setFormData((prev) => ({ ...prev, imageUrl: "" }));
                                      }}
                                      className="bg-red-600/90 p-1 text-white"
                                      title="Remove"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <label className="group flex aspect-square cursor-pointer flex-col items-center justify-center border-2 border-dashed border-border bg-muted/20 transition-colors hover:bg-muted/40">
                                  <Upload className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                                  <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-primary text-center">Upload</span>
                                  <input type="file" className="hidden" accept="image/*" onChange={handleImageSelect} />
                                </label>
                              )}
                            </div>
                        </div>

                        <div className="flex gap-4">
                          <Button type="submit" disabled={isLoading || isUploading} className="flex-1 rounded-none h-14 uppercase tracking-widest text-[10px] font-bold">
                              {isLoading || isUploading ? "Processing..." : editingId ? "Update" : "Register"}
                          </Button>

                          {editingId && (
                            <Button type="button" onClick={cancelEdit} variant="outline" className="rounded-none h-14 px-6">
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                    </form>
                </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-8"
            >
                <div className="bg-white border border-border flex flex-col shadow-xl overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
                        <button onClick={toggleSelectAll} className="px-4 py-2 border border-border text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
                            <CheckSquare className="w-4 h-4 mr-2 inline" /> {selectedIds.length === categories.filter((category) => category.canDelete).length && categories.some((category) => category.canDelete) ? "Deselect" : "Select All"}
                        </button>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest">
                                <th className="py-5 px-6 w-12 text-center">Sel</th>
                                <th className="py-5 px-6">Classification Core</th>
                                <th className="py-5 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {categories.map((category, i) => (
                              <motion.tr 
                                key={category._id} 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.03 }}
                                className={`hover:bg-accent/5 group transition-colors ${selectedIds.includes(category._id) ? "bg-accent/5" : (editingId === category._id ? "bg-accent/5 border-l-4 border-l-accent" : "")}`}
                              >
                                  <td className="py-6 px-6 text-center">
                                      <Checkbox
                                        checked={selectedIds.includes(category._id)}
                                        onCheckedChange={() => toggleSelect(category)}
                                        disabled={!category.canDelete}
                                      />
                                  </td>
                                  <td className="py-6 px-6">
                                      <div className="flex items-center gap-4">
                                        {category.imageUrl ? (
                                           <div className="relative w-12 h-12 rounded bg-muted/20 border border-border overflow-hidden flex-shrink-0">
                                              <Image src={category.imageUrl} alt={category.name} fill className="object-cover" />
                                           </div>
                                        ) : (
                                           <div className="w-12 h-12 rounded bg-muted/20 border border-border flex items-center justify-center flex-shrink-0 text-muted-foreground">
                                              <ImageIcon className="w-5 h-5 opacity-50" />
                                           </div>
                                        )}
                                        <div>
                                            <h3 className="font-bold text-primary tracking-tight text-sm mb-1 uppercase group-hover:text-accent transition-colors">{category.name}</h3>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{category.slug}</p>
                                            <div className="mt-2 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                                              <span>{category.productCount || 0} products</span>
                                              {!category.canDelete && (
                                                <span className="inline-flex items-center gap-1 text-amber-600">
                                                  <Lock className="w-3 h-3" />
                                                  Locked
                                                </span>
                                              )}
                                            </div>
                                        </div>
                                      </div>
                                  </td>
                                  <td className="py-6 px-6 text-right">
                                      <button onClick={() => handleEdit(category)} className="p-2 hover:text-accent transition-colors">
                                          <Edit className="w-4 h-4" />
                                      </button>
                                  </td>
                              </motion.tr>
                          ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    </>
  );
}
