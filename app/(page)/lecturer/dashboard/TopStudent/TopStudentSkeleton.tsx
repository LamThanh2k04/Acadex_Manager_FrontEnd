import { Skeleton } from "@/components/ui/skeleton";

function RankOneCardSkeleton() {
    return (
        <div className="rounded-xl p-3 mb-3 flex items-center gap-3 bg-[#FAEEDA]">
            <Skeleton className="w-8 h-8 rounded-full shrink-0" />
            <Skeleton className="w-10 h-10 rounded-full shrink-0" />
            <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-20" />
            </div>
            <div className="flex flex-col items-end gap-1 sm:hidden">
                <Skeleton className="h-6 w-10" />
                <Skeleton className="h-2.5 w-6" />
            </div>
            <div className="hidden sm:block w-28 shrink-0 space-y-1">
                <div className="flex justify-between">
                    <Skeleton className="h-2.5 w-10" />
                    <Skeleton className="h-2.5 w-12" />
                </div>
                <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
        </div>
    );
}

function RankRowSkeleton() {
    return (
        <div className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
            <Skeleton className="w-6 h-6 rounded-full shrink-0" />
            <Skeleton className="w-[34px] h-[34px] rounded-full shrink-0" />
            <div className="flex-1 space-y-1">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-2.5 w-20" />
            </div>
            <Skeleton className="h-4 w-8 sm:hidden shrink-0" />
            <div className="hidden sm:block w-28 shrink-0 space-y-1">
                <div className="flex justify-end">
                    <Skeleton className="h-3 w-8" />
                </div>
                <Skeleton className="h-1 w-full rounded-full" />
            </div>
        </div>
    );
}
export default function TopStudentSkeleton() {
    return (
        <div className="rounded-2xl border bg-card p-4 md:p-5 dark:bg-gray-900">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
                <div className="space-y-1.5">
                    <Skeleton className="h-4 w-44" />
                    <Skeleton className="h-3 w-56" />
                </div>
                <Skeleton className="h-8 w-30 rounded-lg shrink-0" />
            </div>
            <RankOneCardSkeleton />
            <div>
                {Array.from({ length: 4 }).map((_, i) => (
                    <RankRowSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}