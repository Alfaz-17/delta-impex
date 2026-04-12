"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Plus, Trash2, Layers, Edit, X, CheckSquare } from "lucide-react";

import { DivisionSwitcher } from "@/components/admin/division-switcher";
import { useSearchParams } from "next/navigation";

export default function AdminCategoriesPage() {
  const searchParams = useSearchParams();
  const activeDivisionId = searchParams.get("divisionId");
  
  const [categories, setCategories] = useState<any[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: "", division: "" });
  const [isLoading, setIsLoading] = useState(false);
  
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
    <div className="flex h-screen bg-background text-foreground">
      <AdminSidebar active="categories" />
      
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-background">
        <DivisionSwitcher />
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              {divisions.find(d => d._id === activeDivisionId)?.name || "Management"}
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Categories
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add/Edit Category Form */}
          <div className="lg:col-span-1 border-border border-r pr-8">
            <div className={`p-6 rounded-2xl border transition-all duration-300 ${editingId ? "border-primary bg-primary/5" : "border-border bg-card shadow-sm"} sticky top-8`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {editingId ? "Edit Category" : "New Category"}
                </h2>
                {editingId && (
                  <button onClick={cancelEdit} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground">Category Name</Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Main Propulsion"
                    className="bg-background border-border shadow-sm rounded-lg"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-foreground text-background font-semibold h-10 rounded-lg shadow-sm"
                >
                  {isLoading ? "Processing..." : editingId ? "Save Changes" : "Add Category"}
                </Button>
              </form>
            </div>
          </div>

          {/* Categories List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleSelectAll}
                  className="h-8 rounded-md shadow-sm border-border"
                >
                  <CheckSquare className="w-4 h-4 mr-2" />
                  {selectedIds.length === categories.length && categories.length > 0 ? "Deselect All" : "Select All"}
                </Button>
                <span className="font-medium text-foreground">{categories.length}</span> categories total
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((category) => (
                <div 
                  key={category._id} 
                  className={`group relative p-5 rounded-xl border transition-all duration-300 ${
                    selectedIds.includes(category._id) 
                      ? "border-primary bg-primary/5" 
                      : (editingId === category._id ? "border-primary/50 bg-primary/5" : "border-border bg-card hover:border-foreground/20 hover:shadow-sm")
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox 
                      checked={selectedIds.includes(category._id)} 
                      onCheckedChange={() => toggleSelect(category._id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h3 className="text-base font-medium tracking-tight text-foreground">{category.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 lowercase font-mono bg-muted px-2 py-0.5 rounded w-fit">{category.slug}</p>
                    </div>
                    <div>
                      <button 
                         onClick={() => handleEdit(category)}
                         className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors border border-transparent hover:border-border"
                         title="Edit Category"
                      >
                         <Edit className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {categories.length === 0 && (
              <div className="p-12 text-center border-2 border-dashed border-border rounded-2xl bg-muted/20">
                <Layers className="w-10 h-10 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-sm font-medium text-muted-foreground">No Categories Found</p>
                <p className="text-xs text-muted-foreground mt-1">Create one using the form on the left.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
