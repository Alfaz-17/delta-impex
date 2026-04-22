import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { ProductsContent } from "./products-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Inventory Management | Delta Impex Admin",
  description: "Manage global stock and detailed technical specifications.",
};

export default function AdminProductsPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
