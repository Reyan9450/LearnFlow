import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <div className="hidden lg:block w-[240px] h-screen bg-[#111118] border-r border-white/5 flex-shrink-0" />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-[65px] bg-[#0a0a0f]/80 border-b border-white/[0.05]" />
        <main className="flex-1">
          <DashboardSkeleton />
        </main>
      </div>
    </div>
  );
}
