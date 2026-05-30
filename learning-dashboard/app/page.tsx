import { Suspense } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <TopBar />
        <main className="flex-1">
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardContent />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
