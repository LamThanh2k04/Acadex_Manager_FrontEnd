import { Skeleton } from "@/components/ui/skeleton"
export default function TopStudentGPASkeleton() {
    return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-orange-100 rounded-xl shadow-sm">
                    <Skeleton className="w-7 h-7 rounded-full shrink-0" />
                    <div className="flex-1 flex flex-col gap-1.5">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-5 w-10" />
                </div>
            ))}
            <Skeleton className="h-4 w-28 mt-1" />
        </div>
    )
}