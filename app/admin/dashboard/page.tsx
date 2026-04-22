import { Suspense } from "react";
import { DashboardContent } from "./dashboard-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard | Delta Impex",
  description: "Operational overview and inventory management console.",
};

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  );
}
