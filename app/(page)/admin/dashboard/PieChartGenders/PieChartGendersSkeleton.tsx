import { Skeleton } from "@/components/ui/skeleton"

export default function PieChartGendersSkeleton() {
    return (
        <div className="bg-white border border-orange-100 rounded-xl shadow-sm p-6 w-fit">
            <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-6 w-28" />
                <div className="flex gap-2">
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-7 w-20 rounded-full" />
                </div>
            </div>
            <div className="flex justify-center my-4">
                <Skeleton className="h-55 w-55 rounded-full" />
            </div>
            <div className="flex justify-around w-full mt-6">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
        </div>
    )
}