import { Skeleton } from "@/components/ui/skeleton";
export default function ScheduleLecturerSkeleton() {
    return (
        <div className="w-full">
            <div className="mb-4 flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4">
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
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-4">
                {["Lý thuyết", "Thực hành", "Trực tuyến"].map((label) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <Skeleton className="h-2.5 w-2.5 rounded-sm" />
                        <Skeleton className="h-3 w-14" />
                    </div>
                ))}
            </div>
        </div>
    );
}