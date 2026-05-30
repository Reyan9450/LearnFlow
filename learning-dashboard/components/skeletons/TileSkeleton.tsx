import { cn } from "@/lib/utils";

interface TileSkeletonProps {
  className?: string;
}

export function TileSkeleton({ className }: TileSkeletonProps) {
  return (
    <div
      className={cn("rounded-2xl bg-[#111118] border border-white/[0.06] overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="p-5 h-full flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl skeleton-shimmer bg-white/5" />
          <div className="flex-1 space-y-2">
            <div className="h-3 rounded-full skeleton-shimmer bg-white/5 w-3/4" />
            <div className="h-2.5 rounded-full skeleton-shimmer bg-white/5 w-1/2" />
          </div>
        </div>
        <div className="space-y-2 flex-1">
          <div className="h-2.5 rounded-full skeleton-shimmer bg-white/5 w-full" />
          <div className="h-2.5 rounded-full skeleton-shimmer bg-white/5 w-5/6" />
          <div className="h-2.5 rounded-full skeleton-shimmer bg-white/5 w-4/6" />
        </div>
        <div className="h-1.5 rounded-full skeleton-shimmer bg-white/5 w-full" />
      </div>
    </div>
  );
}
