import { Skeleton } from "@/components/ui/skeleton"

export default function ScheduleCalendarSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            <div className="border border-orange-100 rounded-xl p-3">
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                    ))}
                </div>
                {Array.from({ length: 5 }).map((_, row) => (
                    <div key={row} className="grid grid-cols-7 gap-1 mb-1">
                        {Array.from({ length: 7 }).map((_, col) => (
                            <Skeleton key={col} className="h-8 w-full rounded-md" />
                        ))}
                    </div>
                ))}
            </div>
            <Skeleton className="h-5 w-40" />
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border border-orange-100 rounded-xl p-3 flex flex-col gap-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-24" />
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                </div>
            ))}
        </div>
    )
}