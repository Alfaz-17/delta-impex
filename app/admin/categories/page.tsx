import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { CategoriesContent } from "./categories-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Categories Management | Delta Impex Admin",
  description: "Organize and manage structural categories for Delta Impex inventory.",
};

export default function AdminCategoriesPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
        </div>
      }
    >
      <CategoriesContent />
    </Suspense>
  );
}
