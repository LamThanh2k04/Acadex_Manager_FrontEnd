import { Skeleton } from "@/components/ui/skeleton";
export default function RevenueAreaInteractiveSkeleton() {
    return (
        <div>
            <div className="flex flex-col items-start gap-4 space-y-0 border-b py-5 sm:flex-row sm:items-center">
                <Skeleton className="h-4 w-72 flex-1" />
                <Skeleton className="h-9 w-full sm:w-40 rounded-xl" />
            </div>
            <div className="pl-2 pr-2 pt-4 h-[30%] sm:px-6 sm:pt-6">
                <div className="flex gap-2 mb-2">
                    <div className="flex flex-col justify-between h-62.5 sm:h-87.5 w-16">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-3 w-12" />
                        ))}
                    </div>
                    <Skeleton className="flex-1 h-62.5 sm:h-87.5 rounded-lg" />
                </div>
                <div className="flex justify-between mt-3 pl-16">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <Skeleton key={i} className="h-3 w-5" />
                    ))}
                </div>
            </div>
        </div>
    )
}