"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/sidebar";
import { AdminMobileHeader } from "@/components/admin/mobile-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Plus, Trash2, Layers, Edit, X, CheckSquare, Loader2 } from "lucide-react";

import { DivisionSwitcher } from "@/components/admin/division-switcher";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CategoriesContent() {
  const searchParams = useSearchParams();
  const activeDivisionId = searchParams.get("divisionId");
  
  const [categories, setCategories] = useState<any[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: "", division: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Selection and Edit State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchDivisions();
    fetchCategories();
  }, [activeDivisionId]);

  useEffect(() => {
    if (activeDivisionId) {
      setFormData(prev => ({ ...prev, division: activeDivisionId }));
    }
  }, [activeDivisionId]);

  const fetchDivisions = async () => {
    const res = await fetch("/api/divisions");
    const data = await res.json();
    setDivisions(data);
  };

  const fetchCategories = async () => {
    if (!activeDivisionId) return;
    const res = await fetch(`/api/categories?divisionId=${activeDivisionId}`);
    const data = await res.json();
    setCategories(data);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", division: "" });
  };

  const handleEdit = (category: any) => {
    setEditingId(category._id);
    setFormData({
      name: category.name,
      division: category.division?._id || category.division,
    });
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === categories.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(categories.map(c => c._id));
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} categories permanently? This will affect products in these categories.`)) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (res.ok) {
        toast.success("Categories deleted successfully");
        setSelectedIds([]);
        fetchCategories();
      } else {
        toast.error("Failed to delete categories");
      }
    } catch (error) {
      toast.error("Error deleting categories");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.division) return;
    
    setIsLoading(true);
    try {
      const url = editingId ? `/api/categories/${editingId}` : "/api/categories";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        toast.success(editingId ? "Category updated" : "Category added");
        if (!editingId) {
          setFormData({ name: "", division: "" });
        } else {
          cancelEdit();
        }
        fetchCategories();
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
    <div className="min-h-screen bg-muted/30 text-foreground font-sans">
      <AdminMobileHeader 
        isMenuOpen={isSidebarOpen} 
        onToggleMenu={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <AdminSidebar active="categories" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-8 hidden lg:flex">
          <div className="flex-1" />
          <a href="/" target="_blank" className="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors">
             View Public Site →
          </a>
        </header>

        <main className="flex-1 p-6 md:p-8 lg:p-12 pb-32">
            <DivisionSwitcher />
            
            <div className="flex items-center justify-between border-b border-border pb-8 mt-4 mb-8">
                <div>
                <h1 className="text-3xl font-bold text-primary uppercase tracking-tighter">Categories</h1>
                <p className="text-xs font-bold text-accent uppercase tracking-[0.3em] mt-2">Structure Your Catalog</p>
                </div>
                <div className="flex items-center gap-4">
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
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Sharp Entry Form */}
                <div className="lg:col-span-4">
                    <div className="bg-white border border-border p-8 sticky top-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-bold text-primary uppercase tracking-tighter">
                            {editingId ? "Modify Classification" : "New Classification"}
                            </h2>
                            {editingId && (
                            <button onClick={cancelEdit} className="text-muted-foreground hover:text-primary">
                                <X className="w-5 h-5" />
                            </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-primary block">Category Name *</Label>
                                <Input 
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-muted/20 border-border rounded-none h-12 shadow-none focus-visible:ring-accent focus-visible:border-accent"
                                    placeholder="e.g. Main Propulsion"
                                />
                            </div>

                            <Button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-primary text-white hover:bg-accent font-bold h-14 rounded-none shadow-xl transition-all uppercase tracking-widest text-[10px]"
                            >
                                {isLoading ? "Syncing..." : editingId ? "Commit Updates" : "Finalize Registration"}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Technical Table View */}
                <div className="lg:col-span-8">
                    <div className="bg-white border border-border flex flex-col shadow-xl">
                        <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
                            <button 
                                onClick={toggleSelectAll}
                                className="px-4 py-2 border border-border text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-white transition-colors flex items-center focus:outline-none"
                                >
                                <CheckSquare className="w-4 h-4 mr-2" />
                                {selectedIds.length === categories.length && categories.length > 0 ? "Deselect All" : "Select All"}
                            </button>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-4">Total: {categories.length} Records</span>
                        </div>
                        
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest">
                                        <th className="py-5 px-6 w-12 text-center">Sel</th>
                                        <th className="py-5 px-6">Classification Core</th>
                                        <th className="py-5 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {categories.map((category) => (
                                        <tr key={category._id} className={`hover:bg-muted/30 transition-colors ${selectedIds.includes(category._id) ? "bg-accent/5" : (editingId === category._id ? "bg-accent/5 border-l-4 border-l-accent" : "")}`}>
                                            <td className="py-6 px-6 text-center">
                                                <Checkbox 
                                                    checked={selectedIds.includes(category._id)} 
                                                    onCheckedChange={() => toggleSelect(category._id)}
                                                    className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                                                />
                                            </td>
                                            <td className="py-6 px-6">
                                                <h3 className="font-bold text-primary tracking-tight text-sm mb-1 uppercase">{category.name}</h3>
                                                <p className="text-[10px] text-muted-foreground uppercase font-tech tracking-widest">{category.slug}</p>
                                            </td>
                                            <td className="py-6 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        onClick={() => handleEdit(category)}
                                                        className="p-2 text-primary hover:text-accent transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {categories.length === 0 && (
                                <div className="p-20 text-center border-t border-border bg-muted/10">
                                    <Layers className="w-12 h-12 mx-auto mb-6 text-muted-foreground/30" />
                                    <p className="text-sm font-semibold text-foreground/60 uppercase tracking-widest">No Classifications Found</p>
                                    <p className="text-[10px] text-muted-foreground uppercase mt-2">Begin building your structure using the panel on the left.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminCategoriesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <CategoriesContent />
    </Suspense>
  );
}
