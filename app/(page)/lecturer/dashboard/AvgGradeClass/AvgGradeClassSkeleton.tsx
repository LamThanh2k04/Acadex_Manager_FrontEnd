import { Skeleton } from "@/components/ui/skeleton";

export default function AvgGradeClassSkeleton() {
    return (
        <div className="rounded-2xl border bg-card p-4 md:p-5 space-y-4 dark:bg-gray-900">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1.5">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-64" />
                </div>
                <Skeleton className="h-8 w-30 rounded-lg shrink-0" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className={`rounded-xl bg-muted/50 p-3 ${i === 2 ? "col-span-2 md:col-span-1" : ""}`}>
                        <Skeleton className="h-2.5 w-16 mb-1" />
                        <Skeleton className="h-6 w-10 mt-1" />
                        <Skeleton className="h-2.5 w-20 mt-0.5" />
                    </div>
                ))}
            </div>
            <div className="block md:hidden space-y-2.5">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-3 w-16 shrink-0" />
                        <Skeleton className="h-3.5 flex-1 rounded-full" />
                        <Skeleton className="h-3 w-6 shrink-0" />
                    </div>
                ))}
            </div>
            <div className="hidden md:flex items-end gap-3 h-[240px] px-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                        <Skeleton
                            className="w-full rounded-t-md"
                            style={{ height: `${[60, 80, 45, 90, 70][i]}%` }}
                        />
                        <Skeleton className="h-3 w-10" />
                    </div>
                ))}
            </div>
            <div className="flex gap-3 flex-wrap pt-3 border-t">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                        <Skeleton className="w-2 h-2 rounded-sm" />
                        <Skeleton className="h-2.5 w-16" />
                    </div>
                ))}
            </div>
        </div>
    );
}