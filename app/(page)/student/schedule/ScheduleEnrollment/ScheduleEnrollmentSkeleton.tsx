import { Skeleton } from "@/components/ui/skeleton";

export default function ScheduleEnrollmentSkeleton() {
    return (
        <div className="w-full">
            <div className="mb-4 flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-4">
                <div className="mb-4 flex justify-center">
                    <Skeleton className="h-6 w-40" />
                </div>
                <div className="mb-2 grid grid-cols-7 gap-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full rounded-md" />
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 35 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-1 rounded-lg p-1">
                            <Skeleton className="h-4 w-5" />
                            {i % 5 === 0 && <Skeleton className="h-4 w-full rounded-sm" />}
                            {i % 7 === 3 && <Skeleton className="h-4 w-full rounded-sm" />}
                            {i % 9 === 0 && <Skeleton className="h-4 w-full rounded-sm bg-red-100" />}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                {[
                    { color: "#3B82F6", label: "Lý thuyết" },
                    { color: "#10B981", label: "Thực hành" },
                    { color: "#8B5CF6", label: "Trực tuyến" },
                    { color: "#EF4444", label: "Kỳ thi" },
                ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: color }} />
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}