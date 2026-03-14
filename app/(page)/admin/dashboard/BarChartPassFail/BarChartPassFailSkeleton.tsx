import { Skeleton } from "@/components/ui/skeleton"

export default function BarChartPassFailSkeleton() {
    return (
        <div className="border border-orange-100 rounded-xl shadow-sm p-6">
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-56 mb-6" />
            <div className="flex flex-col gap-5">
                <div className="grid grid-cols-3 gap-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex flex-col items-center p-3 bg-gray-50 rounded-xl gap-2">
                            <Skeleton className="h-8 w-10" />
                            <Skeleton className="h-3 w-8" />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-3 w-full rounded-full" />
                </div>
            </div>
        </div>
    )
}