import { Skeleton } from "@/components/ui/skeleton";
export default function OverviewSkeleton() {
    return (
        <div>
            <Skeleton className="h-7 w-64 ml-3 mb-2" />
            <Skeleton className="h-4 w-32 ml-3" />
            <div className="w-full flex flex-col items-center mt-5 gap-5">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex justify-between items-center w-full border p-3 border-orange-100 rounded-xl shadow-sm">
                        <div className="flex flex-col gap-1.5">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-10 w-10 rounded-xl m-3" />
                    </div>
                ))}
            </div>
        </div>
    )
}