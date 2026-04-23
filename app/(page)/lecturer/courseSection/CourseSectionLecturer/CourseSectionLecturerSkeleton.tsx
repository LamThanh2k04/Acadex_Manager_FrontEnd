import { Skeleton } from "@/components/ui/skeleton";

export function CourseSectionLecturerSkeleton() {
    return (
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-16 rounded-full" />
                        <Skeleton className="h-4 w-24 rounded-full" />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                </div>
                <div className="shrink-0 text-right space-y-1">
                    <Skeleton className="h-7 w-8 ml-auto" />
                    <Skeleton className="h-3 w-10" />
                </div>
            </div>
        </div>
    );
}