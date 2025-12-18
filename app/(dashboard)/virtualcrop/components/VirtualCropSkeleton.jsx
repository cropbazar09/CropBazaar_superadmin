"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function VirtualCropSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex justify-between rounded-xl border px-6 py-4"
        >
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-60" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-9 w-28" />
        </div>
      ))}
    </div>
  );
}
