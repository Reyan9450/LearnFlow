import { TileSkeleton } from "./TileSkeleton";

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 md:p-6">
      <TileSkeleton className="md:col-span-2 xl:col-span-2 min-h-[200px]" />
      <TileSkeleton className="min-h-[200px]" />
      {Array.from({ length: 4 }).map((_, i) => (
        <TileSkeleton key={i} className="min-h-[180px]" />
      ))}
      <TileSkeleton className="md:col-span-2 xl:col-span-2 min-h-[200px]" />
    </div>
  );
}
