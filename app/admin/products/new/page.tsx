import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { ProductFormContent } from "./form-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Inventory Entry | Delta Impex Admin",
  description: "Register new technical assets to the Delta Impex database.",
};

export default function AdminProductFormPage() {
  return (
    <Suspense 
      fallback={
        <div className="h-screen flex items-center justify-center bg-muted/30">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <ProductFormContent />
    </Suspense>
  );
}
