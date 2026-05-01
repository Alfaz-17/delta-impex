"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import AdminSidebar from "@/components/admin/sidebar";
import { AdminMobileHeader } from "@/components/admin/mobile-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Upload, Loader2, X, ArrowLeft, Crop, Sparkles, ShieldCheck, Wand2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import CropModal from "@/components/common/CropModal";
import { addWatermark } from "@/lib/utils/watermark";
import { removeBackgroundClient } from "@/lib/background-removal-client";
import { STATIC_CATEGORIES } from "@/lib/categories";
import { MarineLoader } from "@/components/ui/marine-loader";

type GalleryAsset = {
  id: string;
  previewUrl: string;
  file?: File;
  existingUrl?: string;
};

type CropTarget =
  | { type: "main"; imageUrl: string }
  | { type: "gallery"; imageUrl: string; assetId: string };

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export function ProductFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeDivisionId = searchParams.get("divisionId");
  const editingId = searchParams.get("id");

  const [categories, setCategories] = useState<any[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [bgTarget, setBgTarget] = useState<string | null>(null);

  const [cropTarget, setCropTarget] = useState<CropTarget | null>(null);

  const [mainFile, setMainFile] = useState<File | null>(null);
  const [mainPreviewUrl, setMainPreviewUrl] = useState("");
  const [galleryAssets, setGalleryAssets] = useState<GalleryAsset[]>([]);

  const [imageTools, setImageTools] = useState({
    autoBackgroundRemoval: false,
    applyWatermark: true,
    watermarkText: "Delta Impex",
  });

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

  // Filter static categories by selected division slug
  const filteredCategories = useMemo(() => {
    if (!formData.division) return STATIC_CATEGORIES;
    const selectedDiv = divisions.find((d: any) => d._id === formData.division);
    if (!selectedDiv) return STATIC_CATEGORIES;
    return STATIC_CATEGORIES.filter((c) => c.division === selectedDiv.slug);
  }, [formData.division, divisions]);

  const newGalleryCount = useMemo(
    () => galleryAssets.filter((asset) => !!asset.file).length,
    [galleryAssets]
  );

  const fetchDivisions = async () => {
    try {
      const res = await fetch("/api/divisions");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load divisions");
      }
      setDivisions(data);
    } catch {
      toast.error("Failed to load divisions");
    }
  };

  const fetchProduct = async (id: string) => {
    setIsLoading(true);
    try {
      console.log("Fetching product details for ID:", id);
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Error loading product");
      }

      const existingMain = data.imageUrl || "";
      const existingGallery = Array.isArray(data.images) ? data.images : [];

      // Robust category resolution
      let categoryValue = "";
      if (data.category) {
        categoryValue = data.category.slug || data.category.name || (typeof data.category === 'string' ? data.category : "");
      }

      setFormData({
        name: data.name || "",
        division: data.division?._id || data.division || "",
        category: categoryValue,
        description: data.description || "",
        price: data.price || "",
        condition: data.condition || "",
        isFeatured: data.isFeatured || false,
        imageUrl: existingMain,
        images: existingGallery,
      });

      setMainFile(null);
      setMainPreviewUrl(existingMain);
      setGalleryAssets(
        existingGallery.map((url: string) => ({
          id: createId(),
          previewUrl: url,
          existingUrl: url,
        }))
      );
      console.log("Form data pre-filled successfully:", data.name);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error(error instanceof Error ? error.message : "Error loading product");
    } finally {
      setIsLoading(false);
    }
  };

  const applyBackgroundRemovalIfNeeded = async (file: File, targetKey: string) => {
    if (!imageTools.autoBackgroundRemoval) {
      return file;
    }

    setIsRemovingBg(true);
    setBgTarget(targetKey);
    const toastId = toast.loading("AI is removing background... Please wait.");

    try {
      const blob = await removeBackgroundClient(file);
      toast.success("Background removed successfully", { id: toastId });
      return new File([blob], `bg-removed-${file.name.replace(/\.[^/.]+$/, "")}.png`, {
        type: "image/png",
      });
    } catch (error: any) {
      toast.dismiss(toastId);
      if (error?.message === "MOBILE_MEMORY_ERROR") {
        toast.error("Image too large for this device memory. Using original image.");
      } else {
        toast.error("Background removal failed. Using original image.");
      }
      return file;
    } finally {
      setIsRemovingBg(false);
      setBgTarget(null);
    }
  };

  const handleMainImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await readFileAsDataUrl(file);
    setCropTarget({ type: "main", imageUrl });
    e.target.value = "";
  };

  const handleGalleryImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      const id = createId();
      const processed = await applyBackgroundRemovalIfNeeded(file, `gallery-${id}`);
      const imageUrl = await readFileAsDataUrl(processed);
      setGalleryAssets((prev) => [...prev, { id, previewUrl: imageUrl, file: processed }]);
    }

    e.target.value = "";
  };

  const handleCropComplete = async (croppedFile: File) => {
    if (!cropTarget) return;

    if (cropTarget.type === "main") {
      const processed = await applyBackgroundRemovalIfNeeded(croppedFile, "main");
      setMainFile(processed);
      setMainPreviewUrl(URL.createObjectURL(processed));
      setFormData((prev) => ({ ...prev, imageUrl: "" }));
    }

    if (cropTarget.type === "gallery") {
      const processed = await applyBackgroundRemovalIfNeeded(croppedFile, `gallery-${cropTarget.assetId}`);
      const nextPreview = URL.createObjectURL(processed);

      setGalleryAssets((prev) =>
        prev.map((asset) =>
          asset.id === cropTarget.assetId
            ? { ...asset, file: processed, previewUrl: nextPreview, existingUrl: undefined }
            : asset
        )
      );
    }

    setCropTarget(null);
  };

  const runManualBackgroundRemoval = async (target: "main" | "gallery", assetId?: string) => {
    if (target === "main") {
      if (!mainFile) {
        toast.error("Select and crop a main image first.");
        return;
      }

      setIsRemovingBg(true);
      setBgTarget("main");
      const toastId = toast.loading("Removing background from main image...");

      try {
        const blob = await removeBackgroundClient(mainFile);
        const processed = new File([blob], `bg-removed-${mainFile.name.replace(/\.[^/.]+$/, "")}.png`, {
          type: "image/png",
        });
        setMainFile(processed);
        setMainPreviewUrl(URL.createObjectURL(processed));
        toast.success("Background removed from main image", { id: toastId });
      } catch {
        toast.error("Background removal failed for main image", { id: toastId });
      } finally {
        setIsRemovingBg(false);
        setBgTarget(null);
      }
      return;
    }

    if (!assetId) return;
    const asset = galleryAssets.find((item) => item.id === assetId);
    if (!asset?.file) {
      toast.error("Crop the gallery image first to enable processing.");
      return;
    }

    setIsRemovingBg(true);
    setBgTarget(`gallery-${assetId}`);
    const toastIdGallery = toast.loading("Removing background from gallery image...");

    try {
      const blob = await removeBackgroundClient(asset.file);
      const processed = new File([blob], `bg-removed-${asset.file.name.replace(/\.[^/.]+$/, "")}.png`, {
        type: "image/png",
      });
      setGalleryAssets((prev) =>
        prev.map((item) =>
          item.id === assetId
            ? { ...item, file: processed, previewUrl: URL.createObjectURL(processed), existingUrl: undefined }
            : item
        )
      );
      toast.success("Background removed from gallery image", { id: toastIdGallery });
    } catch {
      toast.error("Background removal failed for gallery image", { id: toastIdGallery });
    } finally {
      setIsRemovingBg(false);
      setBgTarget(null);
    }
  };

  const removeGalleryImage = (id: string) => {
    setGalleryAssets((prev) => prev.filter((item) => item.id !== id));
  };

  const uploadSingleFile = async (file: File) => {
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

    return data.url as string;
  };

  const handleAnalyzeAI = async () => {
    if (!mainFile) {
      toast.error("Please select a primary visual asset first");
      return;
    }

    setIsAnalyzing(true);
    toast.info("Analyzing image with AI...");

    try {
      const uploadData = new FormData();
      uploadData.append("file", mainFile);
      if (formData.division) {
        uploadData.append("divisionId", formData.division);
      }

      const res = await fetch("/api/admin/analyze-product", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "AI Analysis failed");
      }

      setFormData((prev) => ({
        ...prev,
        name: data.title || prev.name,
        description: data.description || prev.description,
      }));

      // If categoryName was returned, it might need to be resolved to an ID later,
      // but the instructions asked for Title and Description specifically.
      toast.success("AI Analysis complete. Form Auto-filled.");
    } catch (error: any) {
      toast.error(error.message || "Failed to analyze image");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const prepareForUpload = async (file: File) => {
    if (!imageTools.applyWatermark) return file;
    return addWatermark(file, imageTools.watermarkText || "Delta Impex");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.division || !formData.category) {
      toast.warning("Please fill in all required fields: Name, Division, and Category");
      return;
    }

    setIsLoading(true);

    try {
      setIsUploading(true);
      toast.loading("Uploading images...", { id: "product-upload" });

      let finalMainImageUrl = formData.imageUrl;
      if (mainFile) {
        const uploadFile = await prepareForUpload(mainFile);
        finalMainImageUrl = await uploadSingleFile(uploadFile);
      }

      if (!finalMainImageUrl) {
        throw new Error("Primary image is required");
      }

      const finalGalleryUrls: string[] = [];

      for (const asset of galleryAssets) {
        if (asset.file) {
          const uploadFile = await prepareForUpload(asset.file);
          const uploadedUrl = await uploadSingleFile(uploadFile);
          finalGalleryUrls.push(uploadedUrl);
        } else if (asset.existingUrl) {
          finalGalleryUrls.push(asset.existingUrl);
        }
      }

      const payload = {
        ...formData,
        imageUrl: finalMainImageUrl,
        images: finalGalleryUrls,
      };

      const url = editingId ? `/api/products/${editingId}` : "/api/products";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to save product");
      }

      toast.dismiss("product-upload");
      toast.success(editingId ? `Product "${formData.name}" updated successfully` : `Product "${formData.name}" created successfully`);
      const nextDivisionId = formData.division || activeDivisionId;
      router.push(`/admin/products${nextDivisionId ? "?divisionId=" + nextDivisionId : ""}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save product");
    } finally {
      toast.dismiss("product-upload");
      setIsUploading(false);
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

      <div className="flex min-h-screen flex-col lg:pl-72">
        <header className="sticky top-0 z-10 hidden h-16 items-center justify-between border-b border-border bg-white/80 px-8 backdrop-blur-md lg:flex">
          <div className="flex-1" />
          <a
            href="/"
            target="_blank"
            className="text-[10px] font-bold uppercase tracking-widest text-accent transition-colors hover:text-primary"
            rel="noreferrer"
          >
            View Public Site
          </a>
        </header>

        <main className="max-w-5xl flex-1 p-6 pb-32 md:p-8 lg:p-12">
          <button
            onClick={() => router.back()}
            className="mb-8 flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inventory List
          </button>

          {isLoading ? (
            <div className="flex h-96 items-center justify-center border-2 border-dashed border-border bg-muted/5">
              <MarineLoader size="lg" />
            </div>
          ) : (
            <>
              <div className="mt-4 mb-8 flex items-center justify-between border-b border-border pb-8">
                <div>
                  <h1 className="text-3xl font-bold uppercase tracking-tighter text-primary">
                    {editingId ? "Modify Record" : "Add New Record"}
                  </h1>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-accent">
                    Technical Specification Entry
                  </p>
                </div>
              </div>

          <div className="space-y-8 border border-border bg-white p-10">
            <div className="grid grid-cols-1 gap-4 border border-border/70 bg-muted/20 p-5 md:grid-cols-3">
              <div className="flex items-center justify-between rounded-md border border-border/70 bg-white px-4 py-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Auto BG Remove</p>
                </div>
                <Switch
                  checked={imageTools.autoBackgroundRemoval}
                  onCheckedChange={(checked) =>
                    setImageTools((prev) => ({ ...prev, autoBackgroundRemoval: checked }))
                  }
                  className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted border-border"
                />
              </div>

              <div className="flex items-center justify-between rounded-md border border-border/70 bg-white px-4 py-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Watermark</p>
                </div>
                <Switch
                  checked={imageTools.applyWatermark}
                  onCheckedChange={(checked) => setImageTools((prev) => ({ ...prev, applyWatermark: checked }))}
                  className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted border-border"
                />
              </div>

              <div className="space-y-2 rounded-md border border-border/70 bg-white px-4 py-3">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Watermark Text</Label>
                <Input
                  value={imageTools.watermarkText}
                  onChange={(e) => setImageTools((prev) => ({ ...prev, watermarkText: e.target.value }))}
                  className="h-9 border-border bg-muted/30 text-xs"
                  placeholder="Delta Impex"
                  disabled={!imageTools.applyWatermark}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Division Sector *</Label>
                  <select
                    value={formData.division}
                    onChange={(e) => {
                      setFormData({ ...formData, division: e.target.value, category: "" });
                    }}
                    className="w-full border border-border bg-muted/20 px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary outline-none focus:border-accent"
                  >
                    <option value="">Select Sector</option>
                    {divisions.map((div) => (
                      <option key={div._id} value={div._id}>
                        {div.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Classification *</Label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-border bg-muted/20 px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary outline-none focus:border-accent"
                    disabled={!formData.division}
                  >
                    <option value="">Select Classification</option>
                    {filteredCategories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Product Core Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 rounded-none border-border bg-muted/20 shadow-none focus-visible:border-accent focus-visible:ring-accent"
                  placeholder="e.g. Caterpillar Marine Engine 3512B"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Technical Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[160px] rounded-none border-border bg-muted/20 shadow-none focus-visible:border-accent focus-visible:ring-accent"
                  placeholder="Enter detailed technical specifications here..."
                />
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Market Value</Label>
                  <Input
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="h-12 rounded-none border-border bg-muted/20 shadow-none focus-visible:border-accent focus-visible:ring-accent"
                    placeholder="e.g. $ 45,000 / POR"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Hardware Condition</Label>
                  <Input
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="h-12 rounded-none border-border bg-muted/20 shadow-none focus-visible:border-accent focus-visible:ring-accent"
                    placeholder="e.g. Reconditioned, New, Used"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Primary Visual Asset *</Label>
                <div className="relative max-w-sm">
                  {mainPreviewUrl ? (
                    <div className="group relative aspect-video overflow-hidden border border-border bg-muted/20">
                      <Image src={mainPreviewUrl} alt="Preview" fill className="object-contain" unoptimized />
                      <div className="absolute right-2 top-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setCropTarget({ type: "main", imageUrl: mainPreviewUrl })}
                          className="bg-accent/90 p-2 text-white"
                          title="Crop"
                        >
                          <Crop className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => runManualBackgroundRemoval("main")}
                          disabled={isRemovingBg || !mainFile}
                          className="bg-primary/90 p-2 text-white disabled:opacity-50"
                          title="Remove Background"
                        >
                          {isRemovingBg && bgTarget === "main" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setMainFile(null);
                            setMainPreviewUrl("");
                            setFormData((prev) => ({ ...prev, imageUrl: "" }));
                          }}
                          className="bg-red-600/90 p-2 text-white"
                          title="Remove"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="absolute left-2 bottom-2">
                        <Button
                          type="button"
                          onClick={handleAnalyzeAI}
                          disabled={isAnalyzing}
                          className="h-8 shadow-xl hover:scale-105 transition-transform bg-blue-600 hover:bg-blue-700 text-[10px] uppercase font-bold tracking-widest gap-2"
                        >
                          {isAnalyzing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                          Analyze with AI
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <label className="group flex aspect-video cursor-pointer flex-col items-center justify-center border-2 border-dashed border-border bg-muted/20 transition-colors hover:bg-muted/40">
                      <Upload className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                      <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-primary">Upload and Crop</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleMainImageSelect} />
                    </label>
                  )}
                </div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Main image uploads on submit. {mainFile ? "New processed file ready." : "Using existing image if not replaced."}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-primary">Technical Gallery</Label>
                  <span className="text-[9px] uppercase text-muted-foreground">
                    {galleryAssets.length} total, {newGalleryCount} new pending uploads
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {galleryAssets.map((asset) => (
                    <div key={asset.id} className="group relative aspect-square overflow-hidden border border-border bg-muted/20">
                      <Image src={asset.previewUrl} alt="Gallery" fill className="object-contain" unoptimized />

                      <div className="absolute right-1 top-1 flex gap-1">
                        <button
                          type="button"
                          onClick={() => setCropTarget({ type: "gallery", imageUrl: asset.previewUrl, assetId: asset.id })}
                          className="bg-accent/90 p-1 text-white"
                          title="Crop"
                        >
                          <Crop className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => runManualBackgroundRemoval("gallery", asset.id)}
                          disabled={isRemovingBg || !asset.file}
                          className="bg-primary/90 p-1 text-white disabled:opacity-50"
                          title="Remove Background"
                        >
                          {isRemovingBg && bgTarget === `gallery-${asset.id}` ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Wand2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(asset.id)}
                          className="bg-red-600/90 p-1 text-white"
                          title="Remove"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <label className="group flex aspect-square cursor-pointer flex-col items-center justify-center border-2 border-dashed border-border bg-muted/20 transition-colors hover:bg-muted/40">
                    {isUploading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    ) : (
                      <Upload className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                    )}
                    <span className="mt-2 text-[9px] font-bold uppercase tracking-widest text-primary">Add More</span>
                    <input type="file" className="hidden" accept="image/*" multiple onChange={handleGalleryImageSelect} />
                  </label>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border border-border bg-muted/20 p-6">
                <div>
                  <Label className="block text-[10px] font-bold uppercase tracking-widest text-primary">Primary Feature Status</Label>
                  <p className="mt-1 text-[9px] uppercase text-muted-foreground">Display on main overview screens.</p>
                </div>
                <Switch
                  checked={formData.isFeatured}
                  onCheckedChange={(val) => setFormData({ ...formData, isFeatured: val })}
                  className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted border-border"
                />
              </div>

              <div className="flex gap-4 pt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="h-14 flex-1 rounded-none border-border bg-white text-[10px] font-bold uppercase tracking-widest text-primary transition-all hover:bg-muted"
                >
                  Abort Entry
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || isUploading || isRemovingBg}
                  className="h-14 flex-[2] rounded-none bg-primary text-[10px] font-bold uppercase tracking-widest text-white shadow-xl transition-all hover:bg-accent"
                >
                  {isLoading || isUploading ? "Processing..." : editingId ? "Commit Updates" : "Finalize Registration"}
                </Button>
              </div>
            </form>
          </div>
            </>
          )}
        </main>
      </div>

      {cropTarget ? (
        <CropModal image={cropTarget.imageUrl} onCropComplete={handleCropComplete} onCancel={() => setCropTarget(null)} />
      ) : null}
    </div>
  );
}
