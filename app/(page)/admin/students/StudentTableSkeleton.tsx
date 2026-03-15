import { Skeleton } from "@/components/ui/skeleton"
export default function StudentTableSkeleton() {
    return (
        <div className="mt-5 p-5 border rounded-2xl w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <Skeleton className="h-8 w-48" />
                <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-70 rounded-xl" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                </div>
            </div>
            <div className="w-full border border-gray-100 rounded-xl overflow-hidden">
                <div className="bg-orange-100 h-12 flex items-center px-4 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 flex-1" />
                    ))}
                </div>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center px-4 gap-4 h-12 border-t border-gray-100"
                    >
                        <div className="flex flex-col gap-1 flex-1">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                        <Skeleton className="h-4 flex-1" />
                        <Skeleton className="h-4 flex-1" />
                        <Skeleton className="h-4 flex-1" />
                        <Skeleton className="h-7 w-24 rounded-2xl flex-1" />
                        <div className="flex items-center gap-2 flex-1 justify-center">
                            <Skeleton className="h-5 w-5 rounded-full" />
                            <Skeleton className="h-5 w-5 rounded-full" />
                            <Skeleton className="h-5 w-5 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}